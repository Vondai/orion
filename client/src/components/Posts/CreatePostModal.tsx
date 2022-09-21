import React, { FC, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { useClickAway } from 'react-use';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../../services/postService';
import { useAuth } from '../../contexts/AuthContext';

type TNewPostResponse = {
  postId: string;
};

interface IFormInput {
  title: string;
  content: string;
}

const CreatePostModal: FC<{
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isCreatePostModalOpen, setIsCreatePostModalOpen }) => {
  const createPostMutation = useMutation(createPost<TNewPostResponse>, {
    onSuccess: (data) => {
      navigate(`/community/${communityName}/comments/${data.postId}`);
    },
    onError: () => {
      setError('title', { message: 'Something went wrong. Try again later.' });
    }
  });
  const {
    register,
    reset,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>();
  const modalRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { communityName } = useParams();

  const handleCreatePostModalClose = (e: any) => {
    e.stopPropagation();
    if (e.type === 'keydown' && e.code !== 'Escape') return;
    reset();
    setIsCreatePostModalOpen(false);
    document.body.classList.remove('body-overflow');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('body-overflow');
    };
  }, []);

  const submitCreatePostForm: SubmitHandler<IFormInput> = async ({
    title,
    content
  }) => {
    if (!communityName) return;
    const token = currentUser.token;
    const newPost = {
      title,
      content,
      token,
      communityName
    };
    createPostMutation.mutateAsync(newPost);
  };

  useClickAway(modalRef, handleCreatePostModalClose);
  if (!isCreatePostModalOpen) return null;
  if (isCreatePostModalOpen) document.body.classList.add('body-overflow');

  return (
    <div
      className='fixed z-40 inset-0 bg-gray-700 bg-opacity-80 flex items-center justify-center'
      onKeyDown={(e) => handleCreatePostModalClose(e)}
    >
      <FocusTrap>
        <section
          className='z-50 w-3/4 h-4/5 bg-base-300 rounded-xl px-6 py-0'
          ref={modalRef}
        >
          <div className='flex flex-col w-full h-full'>
            <div
              className='mt-2 w-6 h-6 self-end flex cursor-pointer'
              onClick={(e) => handleCreatePostModalClose(e)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 320 512'
              >
                <path
                  fill='#AAA'
                  d='M294.6 166.6L317.3 144 272 98.7l-22.6 22.6L160 210.7 70.6 121.4 48 98.7 2.7 144l22.6 22.6L114.7 256 25.4 345.4 2.7 368 48 413.3l22.6-22.6L160 301.3l89.4 89.4L272 413.3 317.3 368l-22.6-22.6L205.3 256l89.4-89.4z'
                />
              </svg>
            </div>
            <form
              className='form-control text-lg'
              onSubmit={handleSubmit(submitCreatePostForm)}
            >
              <label className='label justify-center'>
                <span className='label-text text-lg'>Your Post Title</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Title</span>
                <input
                  {...register('title', {
                    required: 'Title is required.',
                    minLength: {
                      value: 5,
                      message: 'Title must be atleast 5 characters.'
                    },
                    maxLength: {
                      value: 40,
                      message: "Title shouldn't be more than 40 characters."
                    }
                  })}
                  type='text'
                  placeholder='My title'
                  className='w-3/4 input input-bordered input-primary text-lg'
                  autoFocus={true}
                />
              </label>
              <span className='text-error text-center'>
                {errors.title?.message}
              </span>
              <label className='label justify-center'>
                <span className='label-text text-lg'>Your Post Content</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Content</span>
                <textarea
                  placeholder='Some text here.'
                  className='textarea textarea-primary textarea-bordered resize-none w-3/4 h-60 text-lg'
                  {...register('content', {
                    required: 'Content is required.',
                    minLength: {
                      value: 5,
                      message: 'Content must be atleast 5 characters.'
                    },
                    maxLength: {
                      value: 200,
                      message: "Content shouldn't be more tham 200 characters."
                    }
                  })}
                />
              </label>
              <span className='text-error text-center'>
                {errors.content?.message}
              </span>
              <button
                type='submit'
                className='btn-auth-cta mt-4 w-1/2 self-center'
                disabled={createPostMutation.isLoading}
              >
                Publish my post!
              </button>
            </form>
          </div>
        </section>
      </FocusTrap>
    </div>
  );
};

export default CreatePostModal;
