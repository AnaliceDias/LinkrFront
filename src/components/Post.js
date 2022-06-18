import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authComponents from "./authStyle";
import Like from "./Like";
const { Right, Left, OnePost } = authComponents;

export default function Post({
    postId,
    userId,
    propName,
    propPicture,
    propComent,
    propLink,
    linkImage,
    linkTitle,
    linkDescription,
    setIsOpen,
    setDeletePostId
  }) {
    const data = JSON.parse(localStorage.getItem("data"));
    const tokenUserId = data.userId;

    const navigate = useNavigate();

    function redirect(id){
      console.log("redirect" + id)
      navigate(`/users/${id}`)
    }
    
    return (
      <OnePost>
        <Left>
          <img src={propPicture} alt="profile" />
          <Like postId={postId} />
        </Left>
        <Right>
          <h1
            onClick={() => {
              setIsOpen(true);
              setDeletePostId(postId);
            }}
          >
            {userId === tokenUserId ? "Deletar" : ""}
          </h1>
          <div className="name">
            <h1 onClick={() =>redirect(userId)}>{propName}</h1>
          </div>
          <div className="coment">
            <h2>{propComent}</h2>
          </div>
          <div
            className="link"
            onClick={() => {
              window.location.href = "https//google.com";
            }}
          >
            <h2>{linkTitle}</h2>
            <h3>{linkDescription}</h3>
            <p>{propLink}</p>
            <img src={linkImage} alt="link_image" />
          </div>
        </Right>
      </OnePost>
    );
  }