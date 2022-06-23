import styled from "styled-components";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

import { CommentAvatar, Wrapper } from "./Comment.js";
import API from "../repository/API.js";

export default function AddComment({ postId, setComments }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));
  const token = data.token;
  const avatar = data.image;

  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    API.addComment(postId, { comment }, config)
      .then(() =>
        API.getComments(postId, config)
          .then(response => {
            setComments(response.data);
            setComment("");
            setIsLoading(false);
          })
          .catch(error => console.log(error))
      )
      .catch(() => console.log("deu ruim"));
  }

  return (
    <Wrapper>
      <AddCommentContainer>
        <CommentAvatar src={avatar} alt="user-avatar" />
        <CommentForm
          onSubmit={e => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        >
          <input
            disabled={isLoading}
            onChange={e => setComment(e.target.value)}
            required
            type="text"
            value={comment}
            placeholder="write a comment..."
          ></input>
          <button>
            {isLoading ? (
              <Oval
                width={16}
                height={16}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
              />
            ) : (
              <FaRegPaperPlane className="send-message-icon" />
            )}
          </button>
        </CommentForm>
      </AddCommentContainer>
    </Wrapper>
  );
}

const AddCommentContainer = styled.div`
  width: 92%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 14px;
  @media (max-width: 611px) {
    width: 100%;
    justify-content: space-evenly;
    gap:0;
`;

const CommentForm = styled.form`
  width: 510px;
  height: 39px;
  background-color: #252525;
  border-radius: 8px;
  display: flex;
  align-items: center;

  input {
    width: 93%;
    height: 100%;
    background-color: #252525;
    border: none;
    border-radius: 8px;
    outline: none;
    text-indent: 15px;
    color: #ffffff;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }

  input::placeholder {
    font-style: italic;
    color: #575757;
  }

  button {
    height: 100%;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .send-message-icon {
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
  }
  @media (max-width: 611px) {
    width: 278px;

    .send-message-icon {
      margin-right: 5px;
    }
  }
`;
