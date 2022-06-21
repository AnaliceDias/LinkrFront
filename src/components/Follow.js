import { useState, useEffect } from "react";
import styled from "styled-components";

import API from "../repository/API";

export default function Follow({ userId }) {

    const [isUserPage, setIsUserPage] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = JSON.parse(localStorage.getItem("data"));
    const token = data.token;

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    useEffect(() => {
        checkIsFollowing();
      }, [userId]);

    function checkIsFollowing(){
        const promise = API.checkIsFollowing(userId, config);    
    
        promise
          .then(answer => {
            setIsFollowing(answer.data.isFollowing);
            setIsUserPage(answer.data.isUser);
          })
          .catch(err => {
            console.log(err);
            alert(
              "An error occured while trying to fetch the user page"
            );
          });
      }

      function followUser(){
        setIsLoading(true);
        const promise = API.followUser(userId, {isFollowing}, config);
        
        promise
          .then(answer => {            
            setTimeout(() => setIsLoading(false), 300);
            setIsFollowing(!isFollowing);
          })
          .catch(err => {
            console.log(err);
            alert(
              "An error occured while trying to follow user"
            );
          });
      }

      return isUserPage ? <></> : (
        <FollowComponent>
            {isLoading ?
            <button className="loading-button">Loading</button> : !isFollowing ? 
            <button onClick={followUser}>Follow</button> : 
            <button onClick={followUser} className="unfollow-button" >Unfollow</button>}
        </FollowComponent>
      );

}

const FollowComponent = styled.div`
    button {
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        border: none;
    }

    .unfollow-button{
        background: #FFFFFF;
        color: #1877F2;
    }

    .loading-button{
        background: #474d5b;
        color: #FFFFFF;
    }

    @media (max-width: 610px) {
        button {
        margin-left: 18px;
        margin-right: 18px;
         }
    }
`;