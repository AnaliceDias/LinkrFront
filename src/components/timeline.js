// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import API from "../repository/API";
import Header from "./header/Header";
import authComponents from "./authStyle";
import Publish from "./Publish";
import Popup from "./Modal";
import Post from "./Post";
const {  AllPosts } = authComponents;

export default function Timeline() {
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
              <Post
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
                setIsOpen = {setIsOpen}
                setDeletePostId ={setDeletePostId}
              />
            </>
          );
        });
      }
    }
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
