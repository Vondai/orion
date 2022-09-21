import { Link, useNavigate } from 'react-router-dom';
import { FC, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useClickAway } from 'react-use';

const SignedInNavigation: FC<{ username: string }> = ({ username }) => {
  const navigate = useNavigate();
  const { clearUserData } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useClickAway(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  function dropDownMenuHadler() {
    setIsDropdownOpen((prev) => !prev);
  }

  function signOutHandler() {
    clearUserData!();
    navigate('/');
  }

  return (
    <div
      className='dropdown dropdown-end'
      ref={dropdownRef}
    >
      <label tabIndex={0}>
        <img
          src={'/avatars/avatar1.svg'}
          alt='avatar-icon'
          className='cursor-pointer'
          onClick={dropDownMenuHadler}
        />
      </label>
      <ul
        style={
          isDropdownOpen ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
        tabIndex={0}
        className='dropdown-content menu p-2 shadow mt-2 bg-base-100 rounded-box w-52'
      >
        <span className='text-center text-lg'>
          Signed in as <span className='font-bold'>{username}</span>
        </span>
        <li className='text-accent hover:bg-accent-focus hover:text-primary-content rounded-lg'>
          <Link to='/lorem'>My Communities</Link>
        </li>
        <li className='text-accent hover:bg-accent-focus hover:text-primary-content rounded-lg'>
          <Link to='/lorem'>My Posts</Link>
        </li>
        <li className='text-accent hover:bg-accent-focus hover:text-primary-content rounded-lg'>
          <Link to='/community/create'>Create a community</Link>
        </li>
        <li className='hover:bg-error hover:text-white'>
          <button onClick={signOutHandler}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
};

export default SignedInNavigation;
