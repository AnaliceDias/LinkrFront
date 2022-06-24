import styled from "styled-components";
import { useState } from "react";

import API from "../repository/API";

export default function Publish({ setPosts, refresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    text: "",
    link: ""
  });
  const data = JSON.parse(localStorage.getItem("data"));
  const { token, image } = data;

  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    API.publishPost(post, config)
      .then(() => {
        API.getPosts(config)
          .then(response => {
            setIsLoading(false);
            setPost({ text: "", link: "" });
            refresh();
          })
          .catch(error => console.log(error));
      })
      .catch(e => {
        alert("Houve um erro ao publicar o link");
        setIsLoading(false);
        setPost({ text: "", link: "" });
        console.log(e);
      });
  }

  return (
    <Wrapper>
      <AvatarContainer>
        <img alt="Avatar" src={image} />
      </AvatarContainer>
      <ContentContainer isLoading={isLoading}>
        <h3>What are you going to share today?</h3>
        <form
          onSubmit={e => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        >
          <input
            id="link-input"
            type="text"
            disabled={isLoading}
            placeholder="http://..."
            onChange={e => setPost({ ...post, link: e.target.value })}
            value={post.link}
            required
          />
          <textarea
            disabled={isLoading}
            placeholder="Awesome article about #javascript"
            onChange={e => setPost({ ...post, text: e.target.value })}
            value={post.text}
          />
          <button type="submit">{isLoading ? "Publishing" : "Publish"}</button>
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
  margin-top: 50px;

  @media (min-width: 610px) {
    width: 610px;
    height: 210px;
    shadow-box: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    justify-content: space-evenly;
  }
`;

const AvatarContainer = styled.div`
  height: 100%;
  display: none;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 13px;
    object-fit: cover;
  }

  @media (min-width: 610px) {
    display: flex;
    justify-content: center;
  }
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 100%;

  @media (min-width: 610px) {
    width: 80%;
  }

  h3 {
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    color: #707070;
    width: 100%;
    text-align: center;
    margin: 10px 0;
    @media (min-width: 610px) {
      font-weight: 300;
      font-size: 20px;
      text-align: start;
      margin: 18px 0 10px 0;
    }
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
    font-family: "Lato", sans-serif;

    ::placeholder {
      font-family: "Lato", sans-serif;
    }

    @media (min-width: 610px) {
      font-size: 15px;
    }
  }

  input {
    width: 100%;
    height: 30px;
  }

  textarea {
    width: 100%;
    min-height: 47px;
    padding-top: 10px;
    word-break: break;
    resize: none;
    @media (min-width: 610px) {
      height: 66px;
    }
  }

  button {
    pointer-events: ${props => (props.isLoading ? "none" : "all")};
    opacity: ${props => (props.isLoading ? 0.7 : 1)};
    width: 112px;
    height: 22px;
    background-color: #1877f2;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 610px) {
      width: 112px;
      height: 31px;
    }
  }
`;
