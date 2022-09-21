import React from 'react';
import { TCommunity } from '../../types/TCommunity';

const AboutCommunity: React.FC<{
  community: TCommunity;
  // handleCreatePostClick: () => void;
  // handleJoinBtnClick: () => void;
  // loading: boolean;
}> = ({ community }) => {
  const joinBtn = (
    <div>
      <button
        type='button'
        className='btn-community-cta'
        // onClick={handleJoinBtnClick}
      >
        Join now!
      </button>
    </div>
  );
  const creatorBtns = (
    <>
      <div>
        <button
          type='button'
          className='btn-community-cta'
        >
          Edit
        </button>
      </div>
      <div>
        <button
          type='button'
          className='btn-community-cta'
        >
          Delete
        </button>
      </div>
    </>
  );
  const createPostBtn = (
    <div>
      <button
        type='button'
        className='btn-community-cta'
        // onClick={handleCreatePostClick}
      >
        Publish
      </button>
    </div>
  );

  return (
    <aside>
      <section className='text-center text-2xl'>
        <p>
          About <span className='italic'>{community.name}</span>
        </p>
      </section>
      <section className='text-xl'>
        <p>{community.description}</p>
      </section>
      <section className='flex justify-between text-lg mb-5'>
        <div>{community.members} member/s</div>
        <div>Created {community.createdOn}</div>
      </section>
      <section>
        {community.userIsMember ? createPostBtn : joinBtn}
        {community.userIsCreator && creatorBtns}
      </section>
    </aside>
  );
};

export default AboutCommunity;
