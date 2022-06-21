import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../components/timelineStyle";
import Popup from "../components/Modal";
import Post from "../components/Post";
const { AllPosts, TimelineHead, UserHead } = timelineComponents;

export default function UserPage() {
  const userId = useParams().id;
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [userPage, setUserPage] = useState({picture: "", name: ""});
  const [posts, setPosts] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [edit, setEdit] = useState({}); // save id of the post being edited
  const [loading, setLoading] = useState({}); // loading axios request

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      console.log("entrei no if");
      navigate("/");
    }
    else{
      setHaveToken(true);
    }
    refreshPage();
  }, [userId]);

  function refreshPage() {
    setPosts(null);
    const promise = API.getUserPosts(userId);    

    promise
      .then(answer => {
        setPosts(answer.data.newPosts);
        setUserPage(answer.data.user);
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
            <UserHead>
              <img src={userPage.picture} alt="user_image" />
              <h1>{`${userPage.name}'s Posts`}</h1>
            </UserHead>          
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
