import styled from "styled-components";
import { useState } from "react";

import API from "../repository/API";

export default function Publish() {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    text: "",
    link: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    // API.publishPost(post).then(console.log("Sucesso")).catch("Falha");
    console.log("Lidando com submit");
  }

  return (
    <Wrapper>
      <ContentContainer isLoading={isLoading}>
        <h3>What are you going to share today?</h3>
        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading}
            placeholder="http://..."
            onChange={e => setPost({ ...post, link: e.target.value })}
            value={post.link}
          ></input>
          <textarea
            disabled={isLoading}
            placeholder="Awesome article about #javascript"
            onChange={e => setPost({ ...post, text: e.target.value })}
            value={post.text}
          ></textarea>
          <button onClick={() => setIsLoading(true)}>Publish</button>
        </form>
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 165px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 90%;

  h3 {
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color: #707070;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 6px;
  }

  input,
  textarea {
    background-color: #efefef;
    border-radius: 5px;
    border: none;
    color: #949494;
    font-weight: 300;
    font-size: 13px;
    text-indent: 6px;
  }

  input {
    width: 100%;
    height: 30px;
  }

  textarea {
    width: 100%;
    height: 47px;
    padding-top: 10px;
  }

  button {
    pointer-events: ${props => (props.isLoading ? "none" : "all")};
    width: 112px;
    height: 22px;
    background-color: #1877f2;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
  }
`;
