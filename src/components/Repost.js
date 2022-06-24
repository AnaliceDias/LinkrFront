import { BiRepost } from "react-icons/bi";
import styled from "styled-components";
import { useState, useEffect } from "react";

import API from "../repository/API";
import RepostPopup from "./RepostModal";

export default function Repost({ postId }) {

    const [repostsCount, setRepostsCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isReposting, setIsReposting] = useState(false)
  
    useEffect(() => {
        const promise = API.checkRepostCount(postId);
        promise
          .then(answer => {
            setRepostsCount(answer.data.repostsCount);            
          })
          .catch(err => {
            console.error(err);
          });
      }, []);

      
    return(
        <>
        <RepostButton>
            <BiRepost
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            <p>{`${repostsCount} re-posts`}</p>
        </RepostButton>
            <RepostPopup
                postId={postId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isReposting={isReposting}
                setIsReposting={setIsReposting}
            />
        </>        
    )
}

const RepostButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 19px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  
  p {
    font-size: 11px;
    margin-top: 5px;
  }
  `