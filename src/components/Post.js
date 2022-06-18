import API from "../repository/API";

import authComponents from "./authStyle";
import Like from "./Like";
const { Right, Left, OnePost } = authComponents;

export default function Post({
  element,
  setIsOpen,
  setDeletePostId,
  loading,
  setLoading,
  edit,
  setEdit,
  refresh,
  setRefresh,
  textRef,
}) {
  const data = JSON.parse(localStorage.getItem("data"));
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const tokenUserId = data.userId;

  const {
    id: postId,
    userId,
    picture: propPicture,
    name: propName,
    text: propComent,
    link: propLink,
    image: linkImage,
    title: linkTitle,
    description: linkDescription,
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
