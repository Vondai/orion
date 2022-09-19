import React, { FC, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { useClickAway } from 'react-use';

const AuthModal: FC<{
  isAuthModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isAuthModalOpen, setAuthModalOpen }) => {
  const modalRef = useRef<HTMLElement>(null);

  const handleAuthModalClose = (e: any) => {
    e.stopPropagation();
    if (e.type === 'keydown' && e.code !== 'Escape') return;
    setAuthModalOpen(false);
    document.body.classList.remove('body-overflow');
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
            <form className='form-control text-lg'>
              <label className='label'>
                <span className='label-text'>Your Email</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Email</span>
                <input
                  type='text'
                  placeholder='info@site.com'
                  className='input input-bordered'
                  autoFocus={true}
                />
              </label>
              <label className='label'>
                <span className='label-text'>Your Password</span>
              </label>
              <label className='input-group'>
                <span className='w-28'>Password</span>
                <input
                  type='password'
                  placeholder='xxxxxx'
                  className='input input-bordered'
                />
              </label>
              <label className='label'>
                <span className='label-text'>Repeat Password</span>
              </label>
              <label className='input-group'>
                <span className='w-28 leading-5'>Repeat Password</span>
                <input
                  type='password'
                  placeholder='xxxxxx'
                  className='input input-bordered'
                />
              </label>
              <button className='btn-auth-cta mt-4'>Sign in</button>
            </form>
            <span>
              New to Orion? <span>Sign Up</span>
            </span>
            <span>
              Already a member? <span>Sign In</span>
            </span>
          </div>
        </section>
      </FocusTrap>
    </div>
  );
};

export default AuthModal;
