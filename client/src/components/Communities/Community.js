import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AboutCommunity from "./AboutCommunity";
import PostsListingNavigation from "../Posts/PostsListingNavigation";
import PostListing from "../Posts/PostListing";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound";
import NotificationModal from "../Notifications/NotficationModal";
import { useAuth } from "../../contexts/AuthContext";
import CreateModal from "../Posts/CreateModal";
import * as communityService from "../../services/communityService";
import * as postService from "../../services/postService";
import "./Community.css";

function Community() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { communityName } = useParams();
  const [communityDetails, setCommunityDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [errorPage, setErrorPage] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [postError, setPostError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = currentUser.token;

  useEffect(() => {
    communityService
      .getCommunityDetails(communityName, token)
      .then((data) => {
        if (data.status !== "Not Found") {
          setCommunityDetails(data);
        } else {
          setErrorPage(true);
        }
      })
      .catch((err) => console.log(err));
  }, [communityName, token]);

  useEffect(() => {
    communityService
      .getCommunityPosts(communityName)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, [communityName]);

  function createPostHandler() {
    setPostError("");
    setIsOpen(true);
  }

  function createPostSubmitHandler(e) {
    e.preventDefault();
    const { title, content } = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    if (title.length < 5) {
      return setPostError("Title must be atleast five characters.");
    }
    if (content.length < 10) {
      return setPostError("Content must be atleast ten characters.");
    }
    setLoading(true);
    postService
      .create(title, content, communityName, token)
      .then((data) => {
        navigate(`/community/${communityName}/comments/${data.message}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function joinHandler() {
    if (!isAuthenticated) {
      return navigate("/login");
    }
    communityService
      .joinCommunity(communityName, token)
      .then((data) => {
        setCommunityDetails((oldDetails) => ({
          ...oldDetails,
          userIsMember: true,
					members: oldDetails.members + 1,
        }));
				setNotificationMessage(data.message);
      })
      .catch((err) => {
				setNotificationMessage(err.message);
			});
  }

  if (errorPage) return <PageNotFound />;

  return (
    <>
			<NotificationModal message={notificationMessage}/>
      <main className="site-content-wrapper">
        <div className="main-content">
          <PostsListingNavigation />
          <section className="post-content-wrapper">
            {posts.map((post) => (
              <PostListing key={post.id} post={post} />
            ))}
          </section>
        </div>
        <div className="side-wrapper">
          <AboutCommunity
            communityDetails={communityDetails}
            createPostHandler={createPostHandler}
            joinHandler={joinHandler}
            loading={loading}
          />
          <Footer />
        </div>
        <CreateModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          createPostSubmitHandler={createPostSubmitHandler}
          postError={postError}
          loading={loading}
        ></CreateModal>
      </main>
    </>
  );
}

export default Community;
