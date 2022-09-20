import { Link, useNavigate } from 'react-router-dom';
import { FC, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useClickAway } from 'react-use';

import './SignedInNavigation.css';

const SignedInNavigation: FC<{ username: string }> = ({ username }) => {
  const navigate = useNavigate();
  const { clearUserData } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useClickAway(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  function dropDownMenuHadler() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function signOutHandler() {
    clearUserData!();
    navigate('/');
  }

  return (
    <div className='profile-dropdown'>
      <button
        className='profile-dropbtn'
        onClick={dropDownMenuHadler}
      >
        <svg
          viewBox='0 0 90 90'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='30'
        >
          <mask
            id='mask__ring'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='90'
            height='90'
          >
            <rect
              width='90'
              height='90'
              rx='180'
              fill='white'
            ></rect>
          </mask>
          <g mask='url(#mask__ring)'>
            <path
              d='M0 0h90v45H0z'
              fill='#00dffc'
            ></path>
            <path
              d='M0 45h90v45H0z'
              fill='#343838'
            ></path>
            <path
              d='M83 45a38 38 0 00-76 0h76z'
              fill='#343838'
            ></path>
            <path
              d='M83 45a38 38 0 01-76 0h76z'
              fill='#005f6b'
            ></path>
            <path
              d='M77 45a32 32 0 10-64 0h64z'
              fill='#005f6b'
            ></path>
            <path
              d='M77 45a32 32 0 11-64 0h64z'
              fill='#008c9e'
            ></path>
            <path
              d='M71 45a26 26 0 00-52 0h52z'
              fill='#008c9e'
            ></path>
            <path
              d='M71 45a26 26 0 01-52 0h52z'
              fill='#00dffc'
            ></path>
            <circle
              cx='45'
              cy='45'
              r='23'
              fill='#00b4cc'
            ></circle>
          </g>
        </svg>
      </button>
      <div
        className='profile-dropdown-content'
        ref={dropdownRef}
        style={isDropdownOpen ? { display: 'block' } : { display: 'none' }}
      >
        <span className='profile-details'>Signed in as {username}</span>
        <Link to='/lorem'>My Communities</Link>
        <Link to='/lorem'>My Posts</Link>
        <Link to='/community/create'>Create a community</Link>
        <button
          className='cta-signout'
          onClick={signOutHandler}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignedInNavigation;
