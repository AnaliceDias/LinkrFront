import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiLoaderLine } from "react-icons/ri";
import ReactTooltip from 'react-tooltip';

import API from "../repository/API";

export default function Like({postId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usersLiked, setUsersLiked] = useState([]);
    const [username, setUsername] = useState("");

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
            setUsername(answer.data.username);
            setIsLiked(answer.data.isLiked);
          })
          .catch(err => {
            console.error(err);
          });

      }, []);

      useEffect(() => {
          getUsersLiked();

      }, [isLiked]);     

    function getUsersLiked(){
      const promise = API.getPostLikes(postId);        
      promise
        .then(answer => {
          
          if(isLiked){            
            const arrayFiltered = answer.data.usersLiked.filter((value, index, arr) => {return (value !== username)});
            
            arrayFiltered.unshift("Você");
            setUsersLiked([...arrayFiltered]);
          }
          else {
            const arrayFiltered = answer.data.usersLiked.filter((value, index, arr) => {return (value !== "Você")});
            setUsersLiked([...arrayFiltered]);    
          }
          
        })
        .catch(err => {
          console.error(err);
        });
    }
    
    function likePost(){
      setIsLoading(true);
        API.likePost({ postId, isLiked}, config)
      .then(() => {
        setIsLiked(!isLiked);
        setTimeout(() => setIsLoading(false), 300);        
      })
      .catch(() => {        
        alert("Houve um erro ao dar like no post");
        setTimeout(() => setIsLoading(false), 300);          
      });
    }

    function getLikeButton(){
        return isLoading ?  <RiLoaderLine/> : !isLiked ? <FaRegHeart onClick={likePost}/> : <FaHeart className="liked" onClick={likePost}/>
    }

    function getTotalLikes(){
        return usersLiked.length>0 ? (
        <>
          <p data-tip data-for={'likes' + postId}>{usersLiked.length} likes</p>          
          <ReactTooltip id={'likes' + postId} place="bottom" type="light" getContent={getTooltipText}/>          
        </>
        ) : <></>;      
    }

    function getTooltipText(){
      const usersLength = usersLiked.length;    
      return usersLength>3 ? (       
          <p>{`${usersLiked[0].name}, ${usersLiked[1].name} e outras ${(usersLength-2)} pessoas curtiram`}</p>
        ) :  usersLength > 1 ? ( 
          <p>{`${usersLiked.join(', ')} curtiram`}</p>
        ) : (
          <p>{`${usersLiked[0]} curtiu`}</p>
        )       
    }

    const likeButton = getLikeButton();
    const totalLikes = getTotalLikes();
    const tooltipText = getTooltipText();

    return (
    <LikeComponent>
        {likeButton}
        {totalLikes}        
    </LikeComponent>);
}

const LikeComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 19px;
    color: white;
    font-size: 20px;    

    .liked{
      color: #AC0000;
    }

    p{
      font-size: 11px;
      margin-top: 5px;
    }
`