import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { IoIosSync } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroller";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import Publish from "../components/Publish";
import ScrollLoading from "../components/ScrollLoading";

import PostsContainer from "../components/PostsContainer";
import FollowingContext from "../contexts/followingContext";
import organizingBoxes from "../styles/organizingBoxes";
import HashtagSidebar from "../components/HashtagSidebar";
const { AllPosts, TimelineHead, NewPostButton } = timelineComponents;
const {BoxPage , BoxPosts , Container} = organizingBoxes;

export default function Timeline() {
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shadowPosts, setShadowPosts] = useState([]); // another array of posts to compare with "posts"
  const [newPosts, setNewPosts] = useState([]); // array of new posts that aren't in the screen
  const [following, setFollowing] = useState(0);
  const [loading, setLoading] = useState({}); // loading axios request for a specific post
  const { setFollowingArr } = useContext(FollowingContext);
  const [loadingRefresh, setLoadingRefresh] = useState(false); // loading refresh request
  const [hasMore, setHasMore] = useState(true); // are there more posts to show on the screen?
  const [isLoading, setIsLoading] = useState(false); // infinite scroll request is loading?

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("data"));
  const token = data.token;

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      console.log("entrei no if");
      navigate("/");
    } else {
      setHaveToken(true);
    }
    refreshPage();
  }, []);

  function refreshPage() {
    setLoadingRefresh(true);
    const promise = API.getPosts(config);
    promise
      .then((answer) => {
        setLoadingRefresh(false);
        setPosts(answer.data.newPosts);
        setNewPosts([]);
        setShadowPosts([]);
        setFollowing(answer.data.following);
        setLoading({});
        setIsLoading(false);
        setHasMore(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadingRefresh(false);
        alert("An error occured while trying to fetch the posts, please refresh the page");
      });
    API.getFollowsByUserId(config)
      .then((response) => {
        setFollowingArr(response.data);
      })
      .catch((error) => console.log(error));
  }

  // setInterval to get new posts
  useEffect(() => {
    setInterval(shadowGetPosts, 15000);
  }, []);

  async function shadowGetPosts() {
    try {
      const { data } = await API.getPosts(config);
      setShadowPosts(data.newPosts);
    } catch (e) {
      console.log(e);
      alert("An error occured while trying to fetch the posts, please refresh the page");
    }
  }

  // check if new posts are different that the ones on the screen
  useEffect(() => {
    if (shadowPosts.length > 0) {
      const array = shadowPosts.filter((post) => {
        if (posts.filter(({ id }) => id === post.id).length === 0) {
          return true;
        }
      });

      if (array.length > 0) {
        setNewPosts(array);
      }
    }
  }, [shadowPosts]);

  // handle infinite scroll loading
  function handleFetch(offset) {
    if (!isLoading) {
      setIsLoading(true);
      const promise = API.getPosts(config, offset);
      promise.then((response) => {
        if (response.data.newPosts.length < 5) {
          setHasMore(false);
        }

        setPosts([...posts, ...response.data.newPosts]);
        setIsLoading(false);
      });
      promise.catch((e) => {
        console.log(e.response);
        alert("Failed to load new posts");
        setIsLoading(false);
      });
    }
  }

  return haveToken ? (
    <>
      <Header />
      <BoxPage>
        <Container>
          <BoxPosts>
          <AllPosts>
        <TimelineHead>
          <h1>timeline</h1>
          <Publish setPosts={setPosts} refresh={refreshPage} />
        </TimelineHead>

        {loadingRefresh ? (
          <ScrollLoading pageLoad={true}></ScrollLoading>
        ) : following === 0 ? (
          <h4>You don't follow anyone yet. Search for new friends!</h4>
        ) : posts.length === 0 ? (
          <h4>No posts found from your friends</h4>
        ) : (
          <>
            {newPosts.length > 0 ? (
              <NewPostButton
                onClick={refreshPage}
                style={loadingRefresh ? { opacity: 0.7, cursor: "auto" } : {}}
                disabled={loadingRefresh ? true : false}
              >
                {newPosts.length} new posts, load more! <IoIosSync className="reload-icon" />{" "}
              </NewPostButton>
            ) : (
              <></>
            )}
            <InfiniteScroll
              pageStart={0}
              loadMore={() => handleFetch(posts.length)}
              hasMore={hasMore}
              loader={<ScrollLoading></ScrollLoading>}
            >
              <PostsContainer
                posts={posts}
                setPosts={setPosts}
                loading={loading}
                setLoading={setLoading}
                refreshPage={refreshPage}
                textRef={textRef}
                isUserPage = {false}
              />
            </InfiniteScroll>
          </>
        )}
      </AllPosts>
          </BoxPosts>
          <HashtagSidebar/>
        </Container>
      
      </BoxPage>
    </>
  ) : (
    <></>
  );
}
