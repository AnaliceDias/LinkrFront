import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FollowingContext from "../contexts/followingContext";

import API from "../repository/API";

export default function Follow({ userId }) {
  const [isUserPage, setIsUserPage] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setFollowingArr } = useContext(FollowingContext);

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

  function checkIsFollowing() {
    const promise = API.checkIsFollowing(userId, config);

    promise
      .then(answer => {
        setIsFollowing(answer.data.isFollowing);
        setIsUserPage(answer.data.isUser);
      })
      .catch(err => {
        console.log(err);
        alert("An error occured while trying to fetch the user page");
      });
  }

  function followUser() {
    setIsLoading(true);
    const promise = API.followUser(userId, { isFollowing }, config);

    promise
      .then(answer => {
        setTimeout(() => setIsLoading(false), 300);
        setIsFollowing(!isFollowing);
        API.getFollowsByUserId(config)
          .then(response => {
            setFollowingArr(response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => {
        console.log(err);
        alert("An error occured while trying to follow user");
      });
  }

  return isUserPage ? (
    <></>
  ) : (
    <FollowComponent>
      {isLoading ? (
        <button className="loading-button">Loading</button>
      ) : !isFollowing ? (
        <button onClick={followUser}>Follow</button>
      ) : (
        <button onClick={followUser} className="unfollow-button">
          Unfollow
        </button>
      )}
    </FollowComponent>
  );
}

const FollowComponent = styled.div`
  button {
    width: 112px;
    height: 31px;
    background: #1877f2;
    border-radius: 5px;
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    border: none;
  }

  .unfollow-button {
    background: #ffffff;
    color: #1877f2;
  }

  .loading-button {
    background: #474d5b;
    color: #ffffff;
  }

  @media (max-width: 610px) {
    button {
      margin-left: 18px;
      margin-right: 18px;
    }
  }
`;
