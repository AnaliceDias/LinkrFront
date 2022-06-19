// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"

import API from "../repository/API";
import Header from "./header/Header";
import Publish from "./Publish";
import Popup from "./Modal";
import Like from "./Like";
import styled from "styled-components";


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
          <DeletePost onClick={() => {
            setIsOpen(true);
            setDeletePostId(postId);
          }}>
            {userId === tokenUserId ? <FaTrash /> : ""}
          </DeletePost>
          <Name>
            <h1>{propName}</h1>
          </Name>
          <Coment>
            <h2>{propComent}</h2>
          </Coment>
          <Link
            className="link"
            onClick={() => {
              window.location.href = {propLink};
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
const DeletePost = styled.h1`
  font-size: 14px;
  position: absolute;
  top: 22px;
  right: 22px;
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