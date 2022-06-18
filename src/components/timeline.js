// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import API from "../repository/API";
import Header from "./header/Header";
import authComponents from "./authStyle";
import Publish from "./Publish";
import Popup from "./Modal";
import Like from "./Like";
const { Right, Left, AllPosts, OnePost } = authComponents;

export default function Timeline() {
  const data = JSON.parse(localStorage.getItem("data"));
  const tokenUserId = data.userId;

  const [posts, setPosts] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //   const navigate = useNavigate();

  useEffect(() => {
    const promise = API.getPosts();
    promise
      .then(answer => {
        setPosts(answer.data);
      })
      .catch(err => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  function TimelinePosts() {
    if (posts === null) {
      return <h4>Loading...</h4>;
    } else {
      if (posts.length === 0) {
        return <h4>There are no posts yet</h4>;
      } else {
        return posts.map((element, index) => {
          return (
            <>
              <PutOnePost
                postId={element.id}
                userId={element.userId}
                key={index}
                propPicture={element.picture}
                propName={element.name}
                propComent={element.coment}
                propLink={element.link}
                linkImage={element.image}
                linkTitle={element.title}
                linkDescription={element.description}
              />
            </>
          );
        });
      }
    }
  }

  function PutOnePost({
    postId,
    userId,
    propName,
    propPicture,
    propComent,
    propLink,
    linkImage,
    linkTitle,
    linkDescription
  }) {
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
            <h1>{propName}</h1>
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

  return (
    <>
      <Header />
      <Publish setPosts={setPosts} />
      <AllPosts>
        <TimelinePosts />
      </AllPosts>
      <Popup
        setPosts={setPosts}
        deletePostId={deletePostId}
        setDeletePostId={setDeletePostId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </>
  );
}
