import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AboutCommunity from "./AboutCommunity";
import PostsListing from "../Home/PostsListing";
import Footer from "../Footer/Footer";
import * as communityService from '../../services/communityService';
import './Community.css';

function Community() {

    const { name } = useParams();
    const [community, setCommunity] = useState({});
    useEffect(() => {
        communityService.get(name)
        .then(data => {
            if (data) {
                setCommunity(data)
            }
        })
        .catch(err => console.log(err))
    }, [name])


    return (
        <>
        <main className='site-content-wrapper'>
            <PostsListing />
            <div className='side-wrapper'>
                <AboutCommunity community={community}/>
                <Footer />
            </div>
        </main>
        </>
    );
}

export default Community;