import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../components/timelineStyle";
import Publish from "../components/Publish";
import Popup from "../components/Modal";
import Post from "../components/Post";

const { AllPosts, TimelineHead, UserHead } = timelineComponents;

export default function Timeline() {
  const userId = useParams().id;
  const hashtagName = useParams().hashtag;
  const textRef = useRef(null);

  const navigate = useNavigate();
  
  if (!localStorage.getItem("data")) {
    console.log("entrei no if");
    navigate("/");
  }

  const [haveToken, setHaveToken] = useState(false);
  const [userPage, setUserPage] = useState(null);
  const [posts, setPosts] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTimeline, setIsTimeline] = useState(true);

  const [edit, setEdit] = useState({}); // save id of the post being edited
  const [loading, setLoading] = useState({}); // loading axios request

  //   const navigate = useNavigate();

  

  useEffect(() => {
    refreshPage();
  }, [userId, hashtagName]);

  function refreshPage() {
    setPosts(null);

    let promise;
    if (!userId && !hashtagName) {
      setIsTimeline(true);
      promise = API.getPosts();
    } else if(userId){
      setIsTimeline(false);
      promise = API.getUserPosts(userId);
    } else if(hashtagName){
      setIsTimeline(false);
      promise = API.getHashtagPage(hashtagName);
    }

    promise
      .then(answer => {
        if(!hashtagName) setPosts(answer.data.newPosts);
        if(userId) setUserPage(answer.data.user);
        if(hashtagName) setPosts(answer.data.posts);
        setLoading({});
      })
      .catch(err => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  function TimelinePosts() {
    if (posts === null) {
      return <h4>Loading...</h4>;
    } else {
      if (posts.length === 0) {
        return <h4>There are no posts yet</h4>;
      } else {
        return posts.map((element, index) => {
          return (
            <Post
              key={index}
              element={element}
              setIsOpen={setIsOpen}
              setDeletePostId={setDeletePostId}
              loading={loading}
              setLoading={setLoading}
              edit={edit}
              setEdit={setEdit}
              refresh={refreshPage}
              textRef={textRef}
            />
          );
        });
      }
    }
  }

  return haveToken ? (
    <>
      <Header />

      <AllPosts>
        <TimelineHead>
          {isTimeline ? (
            <>
              <h1>timeline</h1>
              <Publish setPosts={setPosts} refresh={refreshPage} />
            </>
          ) : userPage ? (
            <UserHead>
              <img src={userPage.picture} alt="user_image" />
              <h1>{`${userPage.name}'s Posts`}</h1>
            </UserHead>
          ) : hashtagName ? <h1>{`#${hashtagName}`}</h1> : (
            <></>
          )}
        </TimelineHead>
        <TimelinePosts />
      </AllPosts>
      <Popup
        setPosts={setPosts}
        deletePostId={deletePostId}
        setDeletePostId={setDeletePostId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </>
  ) : <></>;
}
