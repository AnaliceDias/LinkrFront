import { useNavigate } from "react-router-dom";
import API from "../repository/API";

import Like from "./Like";
import { FaTrash, FaPencilAlt } from "react-icons/fa"

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

  function redirect(id) {
    navigate(`/users/${id}`)
  }

  return (
    <OnePost>
      <Left>
        <img src={propPicture} alt="profile" />
        <Like postId={postId} />
      </Left>
      <Right>
        {/* FIXME - TROCAR POR BOTÕES */}
        <DeletePost onClick={() => {
          setIsOpen(true);
          setDeletePostId(postId);
        }}>
          {userId === tokenUserId ? <FaTrash /> : ""}
        </DeletePost>

        <EditPost onClick={() => (loading.id === postId ? "" : focus(postId))}>
          {userId === tokenUserId ? <FaPencilAlt /> : ""}
        </EditPost>
        {/* FIXME - TROCAR POR BOTÕES */}

        <Name>
          <h1 onClick={() => redirect(userId)}>{propName}</h1>
        </Name>
        <Coment>
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
        </Coment>
        <Link
          className="link"
          onClick={() => {
            window.location.href = { propLink };
          }}
        >
          <h2>{linkTitle}</h2>
          <h3>{linkDescription}</h3>
          <p>{propLink}</p>
          <img src={linkImage} alt="link_image" />
        </Link>
      </Right>
    </OnePost>
  );
}

const DeletePost = styled.h1`
  font-size: 14px;
  position: absolute;
  top: 22px;
  right: 22px;
  color: white;
`
const EditPost = styled.h1`
  font-size: 14px;
  position: absolute;
  top: 22px;
  right: 48px;
  color: white;
`
const OnePost = styled.div`
  display: flex;
  width: 611px;
  height: 276px;
  margin: 26px 0 16px 0;
  background-color: #171717;
  border-radius: 16px;

  @media (max-width: 610px) {
    width: 100%;
    height: 278px;
    border-radius: 0px;
    justify-content: space-evenly;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 242px;
  margin: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 242px;
  position: relative;
  `
const Name = styled.div`
  h1 {
    font-family: "Lato";
    font-size: 20px;
    color: white;
    text-align: left;
    margin: 8px 0 0 8px;
    }
`
const Coment = styled.div`
h2 {
  font-family: "Lato";
  font-size: 17px;
  color: #b7b7b7;
  text-align: left;
  margin: 8px 0 0 8px;
  padding-bottom: 8px;
  font-weight: 400;
  line-height: 20px;
}
`
const Link = styled.div`
width: 503px;
height: 155px;
border: 1px solid #4d4d4d;
border-radius: 10px;
padding-left: 20px;
position: relative;

h2 {
  width: 320px;
  font-size: 16px;
  font-weight: 400;
  color: #cecece;
  font-family: "Lato";
  text-align: left;
  margin: 24px 0 8px 0;
}
  h3 {
  width: 250px;
  font-size: 13px;
  font-weight: 400;
  color: #9b9595;
  font-family: "Lato";
  text-align: left;
  margin-bottom: 8px;
}
  p {
  width: 250px;
  font-size: 13px;
  font-weight: 400;
  color: #cecece;
  font-family: "Lato";
  text-align: left;
}
  img {
  position: absolute;
  width: 155px;
  height: 153px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: blue;
  border-radius: 0 10px 10px 0;
}

  @media (max-width: 610px) {
    width: 95%;
    height: 155px;
    justify-content: space-evenly;

    h2 {
  width: 60%;
  }
  h3 {
  width: 60%;
  }
  p {
  width: 60%
  }
  img {
  position: absolute;
  width: 35%;
  height: 153px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: blue;
  border-radius: 0 10px 10px 0;
  }
  }
  @media (max-width: 420px) {
    width: 95%;
    height: 120px;

    h2{
      font-size: 13px
    }

    h2,h3,p {
    width: 60%;
    }
    img {
    width: 35%;
    height: 120px;
  }
}
`
