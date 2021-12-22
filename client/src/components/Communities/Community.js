import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AboutCommunity from "./AboutCommunity";
import PostsListingNavigation from "../Posts/PostsListingNavigation";
import PostListing from "../Posts/PostListing";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound";
import { useAuth } from "../../contexts/AuthContext";
import CreateModal from "../Posts/CreateModal";
import * as communityService from '../../services/communityService';
import * as postService from '../../services/postService';
import './Community.css';

function Community() {

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { communityName } = useParams();
    const [community, setCommunity] = useState({posts: []});
    const [errorPage, setErrorPage] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [postError, setPostError] = useState('');

    const token = currentUser.token;

    useEffect(() => {
        communityService.get(communityName, token)
        .then(data => {
            if (data.status !== "Not Found") {
                setCommunity(data)
            } else {
                setErrorPage(true)
            }
        })
        .catch(err => console.log(err))
    }, [communityName, token]);

    function createPostHandler() {
        setPostError('');
        setIsOpen(true);
    }

    function createPostSubmitHandler(e) {
        e.preventDefault();
        const { title, content } = Object.fromEntries(new FormData(e.currentTarget));
        if (title.length < 5) {
            return setPostError('Title must be atleast five characters.');
        }
        if (content.length < 10) {
            return setPostError('Content must be atleast ten characters.');
        }
        postService.create(title, content, communityName, token)
        .then(navigate('/'))
        .catch(err => console.log(err));
    }


    return (
        <>
            {errorPage ? 
                <PageNotFound /> : 
                <main className='site-content-wrapper'>
                    <div className='main-content'>
                        <PostsListingNavigation />
                        <section className='post-content-wrapper'>
                            {community.posts.map(post => <PostListing key={post.id} post={post}/>)}
                        </section>
                    </div>
                    <div className='side-wrapper'>
                        <AboutCommunity community={community} createPostHandler={createPostHandler} />
                        <Footer />
                    </div>
                    <CreateModal open={isOpen}
                     onClose={() => setIsOpen(false)} 
                     createPostSubmitHandler={createPostSubmitHandler}
                     postError={postError}>

                    </CreateModal>
                </main>}
        </>
    );
}

export default Community;