// import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import API from "../repository/API";
import Header from "./header/Header";
import Publish from "./Publish";
import Popup from "./Modal";
import Post from "./Post";

export default function Timeline() {
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
            <Post
              key={index}
              element={element}
              setIsOpen={setIsOpen}
              setDeletePostId={setDeletePostId}
              loading={loading}
              setLoading={setLoading}
              edit={edit}
              setEdit={setEdit}
              refresh={refresh}
              setRefresh={setRefresh}
              textRef={textRef}
            />
          );
        });
      }
    }
  }

  return (
    <>
      <Header />
      <Title>Timeline</Title>
      <AllPosts>
        <Publish setPosts={setPosts} />
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

const AllPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 72px;

  h4 {
    font-size: 20px;
    color: white;
    font-family: "Lato";
    margin-top: 200px;
  }
`;

const Title = styled.h1`
  font-style: 'Oswald';
  font-size: 43px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 55px 0 55px 0;
`
