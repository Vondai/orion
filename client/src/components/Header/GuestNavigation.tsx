import { FC, useState } from 'react';
import AuthModal from '../AuthModal';

const GuestNavigation: FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  return (
    <>
      <button
        className='btn-auth-cta'
        onClick={() => setAuthModalOpen(true)}
      >
        Sign in
      </button>
      <button
        className='btn-auth-cta'
        onClick={() => setAuthModalOpen(false)}
      >
        Sign Up
      </button>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setAuthModalOpen={setAuthModalOpen}
      />
    </>
  );
};

export default GuestNavigation;
