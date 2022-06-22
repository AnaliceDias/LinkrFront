import {  useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import Publish from "../components/Publish";

import PostsContainer from "../components/PostsContainer";
const { AllPosts, TimelineHead } = timelineComponents;

export default function Timeline() {
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(0);
  const [loading, setLoading] = useState({}); // loading axios request

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("data"));
    const token = data.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      console.log("entrei no if");
      navigate("/");
    }
    else{
      setHaveToken(true);
    }
    refreshPage();
  }, []);

  function refreshPage() {
    setPosts(null);
    const promise = API.getPosts(config);   

    promise
      .then(answer => {
        setPosts(answer.data.newPosts);
        setFollowing(answer.data.following);
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
            <h1>timeline</h1>
            <Publish setPosts={setPosts} refresh={refreshPage} />                     
        </TimelineHead>

        {(following === 0) ?
          <h4>You don't follow anyone yet. Search for new friends!</h4> : (posts.length === 0) ? 
          <h4>No posts found from your friends</h4> :
          <PostsContainer 
          posts={posts}
          setPosts = {setPosts}
          loading={loading}
          setLoading={setLoading}
          refreshPage={refreshPage}
          textRef={textRef}/> 
        }
      </AllPosts>      
    </>
  ) : <></>;
}
