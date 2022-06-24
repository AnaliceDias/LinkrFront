import { useState } from "react";

import Post from "./Post.js";
import Popup from "../components/Modal";

export default function TimelinePosts({
  posts,
  setPosts,
  loading,
  setLoading,
  refreshPage,
  textRef
}) {
  const [deletePostId, setDeletePostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [edit, setEdit] = useState({}); // save id of the post being edited
  console.log(posts)
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
              key={index}
              element={element}
              setIsOpen={setIsOpen}
              setDeletePostId={setDeletePostId}
              loading={loading}
              setLoading={setLoading}
              edit={edit}
              setEdit={setEdit}
              refresh={refreshPage}
              textRef={textRef}
            />
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
      });
    }
  }
}
