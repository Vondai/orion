import { useEffect } from 'react';

const AuthModal = () => {
  useEffect(() => {
    document.body.classList.add('body-overflow');

    return () => {
      document.body.classList.remove('body-overflow');
    };
  }, []);
  return <div></div>;
};

export default AuthModal;
