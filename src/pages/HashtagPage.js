import {  useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import organizingBoxes from "../components/organizingBoxes";

import PostsContainer from "../components/PostsContainer";
import HashtagSidebar from "../components/HashtagSidebar";

const { AllPosts, TimelineHead } = timelineComponents;
const {BoxPage , BoxPosts , Container} = organizingBoxes;

export default function HashtagPage() {
  
  const data = JSON.parse(localStorage.getItem("data"));
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const params = useParams();
    
  const textRef = useRef(null);

  const [haveToken, setHaveToken] = useState(false);
  const [posts, setPosts] = useState(null);

  const [loading, setLoading] = useState({}); // loading axios request

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      navigate("/");
    }
    else{
      setHaveToken(true);
    }
    refreshPage();
  }, []);

  function refreshPage() {
    setPosts(null);
    const promise = API.getHashtagPosts(config , params.hashtag);  
    promise
      .then(answer => {
        setPosts(answer.data.newPosts);
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
      <BoxPage>        
        <Container>
        <BoxPosts>
        <TimelineHead>           
          <h1># {params.hashtag}</h1>        
        </TimelineHead>

          <AllPosts>
            <PostsContainer 
              posts={posts}
              setPosts = {setPosts}
              loading={loading}
              setLoading={setLoading}
              refreshPage={refreshPage}
              textRef={textRef}/>

          </AllPosts>

        </BoxPosts>
            <HashtagSidebar />
        </Container>
      
      </BoxPage>
            
    </>
  ) : <></>;
}
