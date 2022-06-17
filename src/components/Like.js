import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiLoaderLine } from "react-icons/ri";


import API from "../repository/API";

export default function Like({postId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");
    
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    useEffect(() => {
        const promise = API.checkLikePost(postId, config);        
        promise
          .then(answer => {
            setIsLiked(answer.data.isLiked);
          })
          .catch(err => {
            console.error(err);
            alert(
              "An error occured while trying to fetch the posts' likes, please refresh the page"
            );
          });
      }, []);
    
    function likePost(){
      setIsLoading(true);
        API.likePost({ postId, isLiked}, config)
      .then(() => {
        setIsLiked(!isLiked);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {        
        console.log("Houve um erro ao dar like no post");
        setTimeout(() => setIsLoading(false), 300);          
      });
    }

    function getLikeButton(){
        return isLoading ?  <RiLoaderLine/> : !isLiked ? <FaRegHeart onClick={likePost}/> : <FaHeart className="liked" onClick={likePost}/>
    }

    const likeButton = getLikeButton();

    return (
    <LikeComponent>
        {likeButton}
    </LikeComponent>);
}

const LikeComponent = styled.div`
    
    margin-top: 19px;
    color: white;
    font-size: 20px;    

    .liked{
      color: #AC0000;
    }
`