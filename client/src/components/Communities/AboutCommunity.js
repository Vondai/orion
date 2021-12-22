import './AboutCommunity.css';

function AboutCommunity({ community, createPostHandler }) {

    const joinBtn = (
        <div>
            <button type='button' className='community-cta join-cta'>
                Join
            </button>
        </div>
    );
    const creatorBtns = (
        <>
            <div>
                <button type='button' className='community-cta edit-cta'>
                    Edit
                </button>
            </div>
            <div>
                <button type='button' className='community-cta delete-cta'>
                    Delete
                </button>
            </div>
        </>
    );
    const createPostBtn = (
        <div>
            <button type='button' className='community-cta create-post-cta' onClick={createPostHandler}>
                Create a post
            </button>
        </div>
    );


    return (
        <aside className='community-info'>
            <section className='info-header-wrapper'>
                <p className='info-header-text'>
                    About {community.name}
                </p>
            </section>
            <section className='info-content-wrapper'>
                <p className='info-content-text'>
                    {community.description}
                </p>
            </section>
            <section className='additional-info-section'>
                <div>
                    {community.members} member/s
                </div>
                <div>
                    Created {community.createdOn}
                </div>
            </section>
            <section className='community-cta-section'>
                {community.isMember ? createPostBtn : joinBtn}
                {community.isCreator && creatorBtns}
            </section>
        </aside>
    );
}

export default AboutCommunity;