import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AboutCommunity from "./AboutCommunity";
import PostsListing from "../Home/PostsListing";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound";
import * as communityService from '../../services/communityService';
import './Community.css';

function Community() {

    const { name } = useParams();
    const [community, setCommunity] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        communityService.get(name)
        .then(data => {
            if (data.status !== "Not Found") {
                setCommunity(data)
            } else {
                setError(true)
            }
        })
        .catch(err => console.log(err))
    }, [name])


    return (
        <>
            {error ? 
                <PageNotFound /> : 
                <main className='site-content-wrapper'>
                    <PostsListing />
                        <div className='side-wrapper'>
                            <AboutCommunity community={community}/>
                            <Footer />
                        </div>
                </main>}
        </>
    );
}

export default Community;