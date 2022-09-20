import { FC, useState, useEffect } from 'react';
import AuthModal from '../AuthModal';

const GuestNavigation: FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  useEffect(() => {
    return () => setIsAuthModalOpen(false);
  }, []);
  return (
    <>
      <button
        className='btn-auth-cta'
        onClick={() => setIsAuthModalOpen(true)}
      >
        Sign in / Sign up
      </button>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
    </>
  );
};

export default GuestNavigation;
