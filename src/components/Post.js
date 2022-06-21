import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../repository/API";
import styled from "styled-components";

import Like from "./Like";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
// import timelineComponents from "./timelineStyle";
import CommentCount from "./CommentCount";
import { Comment } from "./Comment";
import AddComment from "./AddComment";

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
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState(null);

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

  useEffect(() => {
    API.getComments(postId, config).then(response => {
      setComments(response.data);
    });
  }, []);

  console.log(comments);
  return (
    <Wrapper>
      <PostContainer>
        <LeftContainer>
          <img src={propPicture} alt="profile" />
          <Like postId={postId} />
          <CommentCount
            commentCount={comments !== null ? comments.length : 0}
            setOpenComments={setOpenComments}
            openComments={openComments}
          />
        </LeftContainer>
        <RightContainer>
          <NameAndActions>
            <Name>{propName}</Name>
            <Actions>
              {userId === tokenUserId ? (
                <>
                  <FaPencilAlt
                    onClick={() => (loading.id === postId ? "" : focus(postId))}
                  />{" "}
                  <FaTrash
                    onClick={() => {
                      setIsOpen(true);
                      setDeletePostId(postId);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </Actions>
          </NameAndActions>
          <Text>
            {edit.id === postId ? (
              <textarea
                rows={2}
                defaultValue={propComent}
                ref={textRef}
                onKeyDown={e => editPost(e, postId, config)}
              ></textarea>
            ) : (
              <span>{loading.id === postId ? "Loading..." : propComent}</span>
            )}
          </Text>
          <Link>
            <LinkInfos>
              <span className="link-title">{linkTitle}</span>
              <span className="link-description">{linkDescription}</span>
              <span className="link-url">{propLink}</span>
            </LinkInfos>
            <LinkImage src={linkImage} />
          </Link>
        </RightContainer>
      </PostContainer>
      <Comments openComments={openComments}>
        {comments !== null ? (
          comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                userId={comment.userId}
                username={comment.username}
                text={comment.text}
                avatar={comment.avatar}
                tokenUserId={tokenUserId}
              />
            );
          })
        ) : (
          <></>
        )}
        <AddComment
          postId={postId}
          avatar={propPicture}
          setComments={setComments}
        />
      </Comments>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #1e1e1e;
  border-radius: 16px;

  @media (max-width: 611px) {
    width: 100%;
    min-height: 232px;
  } ;
`;

const PostContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  min-height: 232px;
  background-color: #171717;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 611px) {
    border-radius: 0px;
  } ;
`;

const LeftContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-top: 17px;
  }

  @media (max-width: 611px) {
    img {
      width: 40px;
      height: 40px;
      margin-top: 17px;
    }
  }
`;

const RightContainer = styled.div`
  height: 100%;
  width: 500px;
  display: flex;
  flex-direction: column;

  @media (max-width: 611px) {
    width: 278px;
  }
`;

const NameAndActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
`;

const Name = styled.span`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  @media (max-width: 611px) {
    font-size: 17px;
    line-height: 20px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  gap: 13px;
`;

const Text = styled.div`
  width: 100%;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  text-wrap: wrap;
  margin: 8px 0 15px 0;
  textarea {
    resize: none;
    font-family: "Lato";

    width: 100%;
    font-size: 15px;

    margin: 3px;
    padding: 5px;
    border-radius: 10px;
  }

  @media (max-width: 611px) {
    font-size: 15px;
    line-height: 18px;
  }
`;

const Link = styled.a`
  width: 100%;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 611px) {
    height: 115px;
  }
`;

const LinkInfos = styled.div`
  width: 345px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;

  .link-title,
  .link-description,
  .link-url {
    width: 90%;
  }

  .link-title {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
  }
  .link-description {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
  }
  .link-url {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }

  @media (max-width: 611px) {
    .link-title {
      font-size: 11px;
      line-height: 13px;
    }
    .link-description {
      font-size: 9px;
      line-height: 11px;
    }
    .link-url {
      font-size: 9px;
      line-height: 11px;
    }
  }

  font-size: 11px;
  line-height: 13px;
`;

const LinkImage = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 0 11px 11px 0;
  object-fit: cover;

  @media (max-width: 611px) {
    width: 95px;
    height: 100%;
  }
`;

const Comments = styled.div`
  width: 611px;
  background: #1e1e1e;
  border-radius: 16px;
  display: ${props => (props.openComments ? "block" : "none")};
  @media (max-width: 611px) {
    width: 100%;
    border-radius: 0;
  }
`;
