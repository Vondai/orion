import React, { FC, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { useClickAway } from 'react-use';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn, signUp } from '../services/authService';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
interface IFormInput {
  username: string;
  password: string;
  repeatPassword?: string;
}

type TSignInUser = {
  username: string;
  token: string;
};

const AuthModal: FC<{
  isAuthModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isAuthModalOpen, setAuthModalOpen }) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const signInMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      signIn<TSignInUser>(username, password),
    {
      onSuccess: (data) => {
        persistUserData!(data);
        navigate(location.pathname);
      },
      onError: () => {
        setError('username', { message: 'Wrong username or password.' });
      }
    }
  );
  const signUpMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      signUp<TSignInUser>(username, password),
    {
      onSuccess: (data) => {
        persistUserData!(data);
        navigate(location.pathname);
      },
      onError: () => {
        setError('username', { message: 'User already exists.' });
      }
    }
  );
  const {
    register,
    watch,
    reset,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>();
  const modalRef = useRef<HTMLElement>(null);
  const { persistUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleAuthModalClose = (e: any) => {
    e.stopPropagation();
    if (e.type === 'keydown' && e.code !== 'Escape') return;
    reset();
    setAuthModalOpen(false);
    document.body.classList.remove('body-overflow');
  };

  const handleAuthFormChange = () => {
    reset();
    setShowSignupForm(!showSignupForm);
  };

  const submitForm: SubmitHandler<IFormInput> = async ({
    username,
    password,
    repeatPassword
  }) => {
    try {
      if (repeatPassword) {
        await signUpMutation.mutateAsync({
          username,
          password
        });
      } else {
        await signInMutation.mutateAsync({
          username,
          password
        });
      }
    } catch (error) {}
  };

  useClickAway(modalRef, handleAuthModalClose);
  if (!isAuthModalOpen) return null;
  if (isAuthModalOpen) document.body.classList.add('body-overflow');

  return (
    <div
      className='fixed z-40 inset-0 bg-gray-700 bg-opacity-80 flex items-center justify-center'
      onKeyDown={(e) => handleAuthModalClose(e)}
    >
      <FocusTrap>
        <section
          className='z-50 bg-base-300 rounded-xl p-6'
          ref={modalRef}
        >
          <div className='flex flex-col items-center'>
            <div
              className='w-6 h-6 self-end flex cursor-pointer'
              onClick={(e) => handleAuthModalClose(e)}
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
              onSubmit={handleSubmit(submitForm)}
            >
              <label className='label'>
                <span className='label-text'>Your Username</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Username</span>
                <input
                  {...register('username', {
                    required: 'Username is required.',
                    minLength: {
                      value: 5,
                      message: 'Username must be atleast 5 characters.'
                    },
                    maxLength: {
                      value: 20,
                      message: "Username shouldn't be more tham 20 characters."
                    }
                  })}
                  type='text'
                  placeholder='john320'
                  className='input input-bordered'
                  autoFocus={true}
                />
              </label>
              <span className='text-error'>{errors.username?.message}</span>
              <label className='label'>
                <span className='label-text'>Your Password</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Password</span>
                <input
                  {...register('password', {
                    required: 'Password is required.',
                    minLength: {
                      value: 6,
                      message: 'Password must be atleast 6 characters.'
                    },
                    maxLength: {
                      value: 20,
                      message: "Password shouldn't be more tham 20 characters."
                    }
                  })}
                  type='password'
                  placeholder='xxxxxx'
                  className='input input-bordered'
                />
              </label>
              <span className='text-error'>{errors.password?.message}</span>
              {showSignupForm && (
                <>
                  <label className='label'>
                    <span className='label-text'>Repeat Password</span>
                  </label>
                  <label className='input-group'>
                    <span className='w-28 leading-5'>Repeat Password</span>
                    <input
                      {...register('repeatPassword', {
                        required: true,
                        validate: (value) => {
                          if (watch('password') !== value) {
                            return 'Your passwords do no match';
                          }
                        }
                      })}
                      type='password'
                      placeholder='xxxxxx'
                      className='input input-bordered'
                    />
                  </label>
                  <span className='text-error'>
                    {errors.repeatPassword?.message}
                  </span>
                </>
              )}
              {showSignupForm ? (
                <button
                  type='submit'
                  className='btn-auth-cta mt-4'
                  disabled={signInMutation.isLoading}
                >
                  Sign up
                </button>
              ) : (
                <button
                  type='submit'
                  className='btn-auth-cta mt-4'
                  disabled={signInMutation.isLoading}
                >
                  Sign in
                </button>
              )}
            </form>
            {showSignupForm ? (
              <span>
                Already a member?{' '}
                <span
                  className='font-bold underline cursor-pointer hover:text-accent'
                  onClick={handleAuthFormChange}
                >
                  Sign In
                </span>
              </span>
            ) : (
              <span>
                New to Orion?{' '}
                <span
                  className='font-bold underline cursor-pointer hover:text-accent'
                  onClick={handleAuthFormChange}
                >
                  Sign Up
                </span>
              </span>
            )}
          </div>
        </section>
      </FocusTrap>
    </div>
  );
};

export default AuthModal;
