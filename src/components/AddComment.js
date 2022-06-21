import styled from "styled-components";
import { FaRegPaperPlane } from "react-icons/fa";

import { CommentAvatar, Wrapper } from "./Comment.js";

export default function AddComment() {
  return (
    <Wrapper>
      <AddCommentContainer>
        <CommentAvatar />
        <CommentForm>
          <input placeholder="write a comment..."></input>
          <button>
            <FaRegPaperPlane className="send-message-icon" />
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
