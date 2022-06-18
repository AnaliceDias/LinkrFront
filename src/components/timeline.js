// import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "./header/Header";
import authComponents from "./authStyle";
import Publish from "./Publish";
import Popup from "./Modal";
import Like from "./Like";
const { Right, Left, AllPosts, OnePost } = authComponents;

export default function Timeline() {
  const data = JSON.parse(localStorage.getItem("data"));
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const tokenUserId = data.userId;
  const textRef = useRef(null);

  const [posts, setPosts] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [edit, setEdit] = useState({}); // save id of the post being edited
  const [loading, setLoading] = useState({}); // loading axios request
  const [refresh, setRefresh] = useState(true); // refresh get posts

  //   const navigate = useNavigate();

  useEffect(() => {
    const promise = API.getPosts();
    promise
      .then((answer) => {
        setPosts(answer.data);
        setLoading({});
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, [refresh]);

  function TimelinePosts() {
    if (posts === null) {
      return <h4>Loading...</h4>;
    } else {
      if (posts.length === 0) {
        return <h4>There are no posts yet</h4>;
      } else {
        return posts.map((element, index) => {
          return (
            <PutOnePost
              postId={element.id}
              userId={element.userId}
              key={index}
              propPicture={element.picture}
              propName={element.name}
              propComent={element.text}
              propLink={element.link}
              linkImage={element.image}
              linkTitle={element.title}
              linkDescription={element.description}
            />
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
    linkDescription,
  }) {
    return (
      <OnePost>
        <Left>
          <img src={propPicture} alt="profile" />
          <Like postId={postId} />
        </Left>
        <Right>
          {/* FIXME - TROCAR POR BOTÕES */}
          <h1
            onClick={() => {
              setIsOpen(true);
              setDeletePostId(postId);
            }}
          >
            {userId === tokenUserId ? "Deletar" : ""}
          </h1>

          <h1 onClick={() => (loading.id === postId ? "" : focus(postId))}>
            {userId === tokenUserId ? "Editar" : ""}
          </h1>
          {/* FIXME - TROCAR POR BOTÕES */}

          <div className="name">
            <h1>{propName}</h1>
          </div>
          <div className="coment">
            {edit.id === postId ? (
              <textarea
                rows={2}
                defaultValue={propComent}
                ref={textRef}
                onKeyDown={(e) => editPost(e, postId, config)}
              ></textarea>
            ) : (
              <h2>{loading.id === postId ? "Loading..." : propComent}</h2>
            )}
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

  function focus(postId) {
    if (edit.id !== postId) {
      setEdit({ id: postId });

      setTimeout(() => {
        // focus end of the text
        let end = textRef.current.value.length;

        textRef.current.setSelectionRange(end, end);
        textRef.current.focus();
      }, 10);
    } else {
      setEdit({});
    }
  }

  function editPost(e, postId, config) {
    // leave textarea with ESC || send axios request with ENTER
    if (e.keyCode === 27) {
      setEdit({});
    } else if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      setLoading({ id: postId });

      const body = { text: e.target.value };

      const promise = API.updatePost(body, postId, config);
      promise.then((response) => {
        setEdit({});
        setRefresh(!refresh);
      });
      promise.catch((e) => {
        setEdit({});
        setLoading({});
        alert("Failed to update post...");
      });
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
