import {  useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

import API from "../repository/API";
import Header from "../components/header/Header";
import timelineComponents from "../styles/timelineStyle";
import organizingBoxes from "../components/organizingBoxes";

import ScrollLoading from "../components/ScrollLoading";
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({}); // loading axios request
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(true); // are there more posts to show on the screen?
  const [isLoading, setIsLoading] = useState(false); // infinite scroll request is loading?

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      navigate("/");
    }
    else{
      setHaveToken(true);
    }
    console.log("Passei aqui")
    refreshPage();
  }, [params]);

  function refreshPage() {
    setLoadingRefresh(true);
    const promise = API.getHashtagPosts(config , params.hashtag);  

    promise
      .then(answer => {
        setPosts(answer.data);
        setLoading({}); 
        setLoadingRefresh(false);
      })
      .catch(err => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        setLoadingRefresh(true);
      });
  }

    // handle infinite scroll loading
    function handleFetch(offset) {
      if (!isLoading) {
        setIsLoading(true);
        const promise = API.getHashtagPosts(config, params.hashtag, offset);
        promise.then((response) => {
          if (response.data.length < 5) {
            setHasMore(false);
          }
  
          setPosts([...posts, ...response.data]);
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
        <TimelineHead>           
          <h1># {params.hashtag}</h1>        
        </TimelineHead>

          <AllPosts>
          {loadingRefresh ? (
          <ScrollLoading pageLoad={true}></ScrollLoading>
        ) : (
          <>
            <InfiniteScroll
                pageStart={0}
                loadMore={() => handleFetch(posts.length)}
                hasMore={hasMore}
                loader={<ScrollLoading></ScrollLoading>}
              >

                <PostsContainer 
                  posts={posts}
                  setPosts = {setPosts}
                  loading={loading}
                  setLoading={setLoading}
                  refreshPage={refreshPage}
                  textRef={textRef}/>
              </InfiniteScroll>
              </>
              )}
          </AllPosts>

        </BoxPosts>
            <HashtagSidebar />
        </Container>
      
      </BoxPage>
            
    </>
  ) : <></>;
}
