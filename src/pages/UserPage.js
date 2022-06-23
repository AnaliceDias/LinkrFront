import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import PostsContainer from "../components/PostsContainer";
import Follow from "../components/Follow";
import ScrollLoading from "../components/ScrollLoading";

const { AllPosts, TimelineHead, UserHead } = timelineComponents;

export default function UserPage() {
  const userId = useParams().id;
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [userPage, setUserPage] = useState({ picture: "", name: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({}); // loading axios request for specific post
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(true); // are there more posts to show on the screen?
  const [isLoading, setIsLoading] = useState(false); // infinite scroll request is loading?

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      console.log("entrei no if");
      navigate("/");
    } else {
      setHaveToken(true);
    }
    refreshPage();
  }, [userId]);

  function refreshPage() {
    setPosts([]);
    setLoadingRefresh(true);
    const promise = API.getUserPosts(userId);

    promise
      .then((answer) => {
        setPosts(answer.data.newPosts);
        setUserPage(answer.data.user);
        setLoading({});
        setLoadingRefresh(false);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured while trying to fetch the posts, please refresh the page");
        setLoadingRefresh(false);
      });
  }

  // handle infinite scroll loading
  function handleFetch(offset) {
    if (!isLoading) {
      setIsLoading(true);
      const promise = API.getUserPosts(userId, offset);
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

      <AllPosts>
        {loadingRefresh ? (
          <ScrollLoading pageLoad={true}></ScrollLoading>
        ) : (
          <>
            <TimelineHead>
              <UserHead>
                <img src={userPage.picture} alt="user_image" />
                <h1>{`${userPage.name}'s Posts`}</h1>
                <Follow userId={userId} />
              </UserHead>
            </TimelineHead>

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
              />
            </InfiniteScroll>
          </>
        )}
      </AllPosts>
    </>
  ) : (
    <></>
  );
}
