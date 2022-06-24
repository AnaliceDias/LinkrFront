import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import PostsContainer from "../components/PostsContainer";
import Follow from "../components/Follow";
import ScrollLoading from "../components/ScrollLoading";
import FollowingContext from "../contexts/followingContext";
import organizingBoxes from "../styles/organizingBoxes";
import HashtagSidebar from "../components/HashtagSidebar";

const { AllPosts, TimelineHead, UserHead } = timelineComponents;
const {BoxPage , BoxPosts , Container} = organizingBoxes;

export default function UserPage() {
  const userId = useParams().id;
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [userPage, setUserPage] = useState({ picture: "", name: "" });
  const [posts, setPosts] = useState([]);
  const [postsEdit, setPostsEdit] = useState([]); // posts array on the edit function
  const [loading, setLoading] = useState({}); // loading axios request for specific post
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(true); // are there more posts to show on the screen?
  const [hasMoreEdit, setHasMoreEdit] = useState(true); // are there more posts to show on the screen? (on the edit function)
  const [isLoading, setIsLoading] = useState(false); // infinite scroll request is loading?
  const [isLoadingEdit, setIsLoadingEdit] = useState({});
  const { setFollowingArr } = useContext(FollowingContext);

  const data = JSON.parse(localStorage.getItem("data"));
  const token = data.token;

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

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
    setLoadingRefresh(true);
    const promise = API.getUserPosts(userId);

    promise
      .then((answer) => {
        setPosts(answer.data.newPosts);
        setUserPage(answer.data.user);
        setLoading({});
        setLoadingRefresh(false);
        setHasMore(true);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured while trying to fetch the posts, please refresh the page");
        setLoadingRefresh(false);
      });

    API.getFollowsByUserId(config)
      .then((response) => {
        setFollowingArr(response.data);
      })
      .catch((error) => console.log(error));
  }

  function refreshEdit(id) {
    setHasMoreEdit(true);
    setIsLoadingEdit({ id: id });
    const promise = API.getUserPosts(userId);

    promise
      .then((answer) => {
        setPostsEdit(answer.data.newPosts);
        setLoading({});
        setHasMore(true);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured while trying to fetch the posts, please refresh the page");
      });

    API.getFollowsByUserId(config)
      .then((response) => {
        setFollowingArr(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(handleFetchEdit, [postsEdit]);

  function handleFetchEdit() {
    if (!isLoading && postsEdit.length > 0 && postsEdit.length < posts.length && hasMoreEdit) {
      setIsLoading(true);
      let offset = postsEdit.length;

      const promise = API.getUserPosts(userId, offset);
      promise.then((response) => {
        if (postsEdit.length + response.data.newPosts.length >= posts.length) {
          setHasMoreEdit(false);
        }

        setPostsEdit([...postsEdit, ...response.data.newPosts]);
        setIsLoading(false);
      });
      promise.catch((e) => {
        console.log(e.response);
        alert("Failed to load new posts");
        setIsLoading(false);
      });
    } else if (postsEdit.length >= posts.length) {
      setPosts([...postsEdit]);
      setIsLoadingEdit({})
    }
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
      <BoxPage>
        <Container>
          <BoxPosts>
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
                refreshEdit={refreshEdit}
                isLoadingEdit={isLoadingEdit}
                textRef={textRef}
                isUserPage = {true}
              />
            </InfiniteScroll>
          </>
        )}
      </AllPosts>
          </BoxPosts>
          <HashtagSidebar />
        </Container>
      </BoxPage>
    </>
  ) : (
    <></>
  );
}
