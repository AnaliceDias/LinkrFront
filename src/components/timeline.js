import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "./header/Header";
import authComponents from "./authStyle";
import Publish from "./Publish";
import Popup from "./Modal";
import Post from "./Post";
const { AllPosts, TimelineHead, UserHead } = authComponents;

export default function Timeline() {
  const userId = useParams().id;
  const textRef = useRef(null);

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
  }, [userId]);

  function refreshPage(){
    setPosts(null);

    let promise;
    if(!userId){
      setIsTimeline(true);
      promise = API.getPosts();
    }
    else{
      setIsTimeline(false);
      promise = API.getUserPosts(userId);
    }    

    promise.then((answer) => {
      
      setPosts(answer.data.newPosts);
      setUserPage(answer.data.user);
      setLoading({});
    })
    .catch((err) => {
      console.log(err);
      alert("An error occured while trying to fetch the posts, please refresh the page");
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
  
  return (
    <>
      <Header />
      
      <AllPosts>       
        <TimelineHead>
          {isTimeline ? 
          <>
            <h1>timeline</h1>
            <Publish setPosts={setPosts} refresh={refreshPage}/> 
          </>
          : userPage ?
          <UserHead>
            <img src={userPage.picture} alt="user_image" />
            <h1>{`${userPage.name}'s Posts`}</h1>
          </UserHead> : <></>
          }
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
  );
}
