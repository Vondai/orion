import { FC, useState, useEffect } from 'react';
import AuthModal from '../AuthModal';

const GuestNavigation: FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  useEffect(() => {
    return () => setAuthModalOpen(false);
  }, []);
  return (
    <>
      <button
        className='btn-auth-cta'
        onClick={() => setAuthModalOpen(true)}
      >
        Sign in / Sign up
      </button>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setAuthModalOpen={setAuthModalOpen}
      />
    </>
  );
};

export default GuestNavigation;
