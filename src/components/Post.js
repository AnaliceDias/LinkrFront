import { useNavigate } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

import API from "../repository/API";
import authComponents from "./authStyle";
import Like from "./Like";
import Hashtag from "./Hashtag";

const {
  Right,
  Left,
  OnePost,
  EditPost,
  DeletePost,
  Name,
  Coment,
  PostLink,
  NameContainer,
  ActionsContainer
} = authComponents;

export default function Post({
  element,
  setIsOpen,
  setDeletePostId,
  loading,
  setLoading,
  edit,
  setEdit,
  refresh,
  textRef
}) {
  const data = JSON.parse(localStorage.getItem("data"));
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const tokenUserId = data.userId;
  const navigate = useNavigate();

  const {
    id: postId,
    userId,
    picture: propPicture,
    name: propName,
    text: propComent,
    link: propLink,
    image: linkImage,
    title: linkTitle,
    description: linkDescription
  } = element;

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
      promise.then(response => {
        setEdit({});
        setLoading({});
        refresh();
      });
      promise.catch(e => {
        setEdit({});
        setLoading({});
        alert("Failed to update post...");
      });
    }
  }

  function redirect(id) {
    navigate(`/users/${id}`);
    
  }

  function getComentHashtags(){
    let coment = propComent.split(' ');
    let comentWithHashtags = "";

    coment.map(t => {
      if(t.length !== 1 && t[0] === "#"){
        comentWithHashtags += `${<Hashtag>t</Hashtag>}`;
      }
      else comentWithHashtags += t;
      comentWithHashtags += ' ';
    });
    console.log(comentWithHashtags)
    return comentWithHashtags;
  }

  return (
    <OnePost>
      <Left>
        <img src={propPicture} alt="profile" />
        <Like postId={postId} />
      </Left>
      <Right>
        <NameContainer>
          <Name onClick={() => redirect(userId)}>{propName}</Name>
          <ActionsContainer>
            <EditPost
              onClick={() => (loading.id === postId ? "" : focus(postId))}
            >
              {userId === tokenUserId ? <FaPencilAlt /> : ""}
            </EditPost>
            <DeletePost
              onClick={() => {
                setIsOpen(true);
                setDeletePostId(postId);
              }}
            >
              {userId === tokenUserId ? <FaTrash /> : ""}
            </DeletePost>
          </ActionsContainer>
        </NameContainer>
        <Coment>
          {edit.id === postId ? (
            <textarea
              rows={2}
              defaultValue={propComent}
              ref={textRef}
              onKeyDown={e => editPost(e, postId, config)}
            ></textarea>
          ) : (
            <h2>{loading.id === postId ? "Loading..." : getComentHashtags()}</h2>
          )}
        </Coment>
        <PostLink
          onClick={() => {
            window.location.href = "https//google.com";
          }}
        >
          <h2>{linkTitle}</h2>
          <h3>{linkDescription}</h3>
          <p>{propLink}</p>
          <img src={linkImage} alt="link_image" />
        </PostLink>
      </Right>
    </OnePost>
  );
}
