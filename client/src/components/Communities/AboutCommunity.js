import './AboutCommunity.css';

function AboutCommunity({ community }) {

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
                    {community.members} members
                </div>
                <div>
                    Created {community.createdOn}
                </div>
            </section>
        </aside>
    );
}

export default AboutCommunity;