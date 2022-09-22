type TProps = {
  author: {
    username: string;
    totalPosts: number;
  };
};
const AboutAuthor: React.FC<TProps> = ({ author }) => {
  return (
    <aside className='bg-base-200'>
      <section className='text-center text-2xl'>
        <p>
          About <span className='italic'>{author.username}</span>
        </p>
      </section>
      <section className='text-xl'>
        {/* <p>{community.description}</p> */}
      </section>
      <section className='flex justify-between text-lg mb-5'>
        <div>{author.totalPosts} total posts</div>
        <div>Member since 21-Sep-2022</div>
      </section>
      {/* <section>
        {community.userIsMember ? createPostBtn : joinBtn}
        {community.userIsCreator && creatorBtns}
      </section> */}
    </aside>
  );
};

export default AboutAuthor;
