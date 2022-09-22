import { useState } from 'react';
import AuthModal from '../AuthModal';

const LeaveCommentGuest = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <section className='bg-base-300 rounded-lg p-4 flex items-center'>
      <span>
        <span
          className='text-accent hover:text-primary-content cursor-pointer'
          onClick={() => setIsAuthModalOpen(true)}
        >
          Sign in/Sign up
        </span>{' '}
        to leave a comment
      </span>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
    </section>
  );
};

export default LeaveCommentGuest;
