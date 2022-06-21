import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import PostsContainer from "../components/PostsContainer";
import Follow from "../components/Follow";

const { AllPosts, TimelineHead, UserHead } = timelineComponents;

export default function UserPage() {
  const userId = useParams().id;
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [userPage, setUserPage] = useState({picture: "", name: ""});
  const [posts, setPosts] = useState(null);
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

  return haveToken ? (
    <>
      <Header />

      <AllPosts>

        <TimelineHead>          
            <UserHead>
              <img src={userPage.picture} alt="user_image" />
              <h1>{`${userPage.name}'s Posts`}</h1>
              <Follow userId={userId}/>
            </UserHead>          
        </TimelineHead>

        <PostsContainer 
          posts={posts}
          setPosts = {setPosts}
          loading={loading}
          setLoading={setLoading}
          refreshPage={refreshPage}
          textRef={textRef}/>

      </AllPosts>

      
    </>
  ) : <></>;
}
