import styled from "styled-components";

const AllPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  

  h4 {
    font-size: 20px;
    color: white;
    font-family: "Lato";
    margin-top: 200px;
  }
`;

const OnePost = styled.div`
  display: flex;
  width: 611px;
  min-height: 276px;
  margin: 26px 0 16px 0;
  background-color: #171717;
  border-radius: 16px;
  justify-content: space-evenly;

  @media (max-width: 610px) {
    width: 100%;
    min-height: 232px;
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
  margin-top: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    @media (max-width: 610px) {
      width: 40px;
    }
  }

  @media (max-width: 610px) {
    width: 40px;
    height: 232px;
    margin-top: 9px;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 276px;
  position: relative;
  @media (max-width: 610px) {
    width: 288px;
    min-height: 232px;
  }
`;
const Name = styled.h1`
  font-family: "Lato";
  font-size: 20px;
  color: white;
  text-align: left;
  margin-bottom: 8px;
  margin-top: 18px;
  cursor: pointer;

  @media (max-width: 610px) {
    width: 288px;
    font-size: 17px;
    font-weight: 400;
    margin-top: 13px;
  }
`;
const Coment = styled.h2`
  h2 {
    font-family: "Lato";
    font-size: 17px;
    color: #b7b7b7;
    text-align: left;
    margin-bottom: 13px;
    font-weight: 400;
    line-height: 20px;
    word-break: keep-all;
    word-wrap: break-word;
  }
  textarea {
    resize: none;
    font-family: "Lato";

    width: 100%;
    font-size: 15px;

    margin: 3px;
    padding: 5px;
    border-radius: 10px;
  }
  @media (max-width: 610px) {
    width: 288px;

    h2 {
      font-size: 15px;
    }
  }
`;

const PostLink = styled.a`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  padding-left: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 20px;

  :link {
    text-decoration: none;
  }

  :visited {
    text-decoration: none;
  }

  h2 {
    font-size: 16px;
    font-weight: 400;
    color: #cecece;
    font-family: "Lato";
    text-align: left;
  }

  h3 {
    width: 250px;
    font-size: 13px;
    font-weight: 400;
    color: #9b9595;
    font-family: "Lato";
    text-align: left;
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
    height: 100%;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: blue;
    border-radius: 0 10px 10px 0;
  }

  @media (max-width: 610px) {
    width: 95%;
    min-height: 120px;
    padding-left: 10px;
    justify-content: space-evenly;

    h2 {
      font-size: 13px;
      width: 60%;
    }
    h3 {
      font-size: 11px;
      width: 60%;
    }
    p {
      font-size: 11px;
      width: 60%;
    }
    img {
      object-fit: cover;
      position: absolute;
      width: 35%;
      height: 120px;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: blue;
      border-radius: 0 10px 10px 0;
    }
  }

  @media (max-width: 610px) {
    width: 288px;
    height: 120px;

    h2 {
      font-size: 13px;
    }

    h2,
    h3,
    p {
      width: 60%;
    }
    img {
      width: 35%;
      height: 120px;
    }
  }
`;

const NameContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 610px) {
    width: 288px;
  } ;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DeletePost = styled.h1`
  font-size: 14px;
  color: white;
  cursor: pointer;
`;
const EditPost = styled.h1`
  font-size: 14px;
  color: white;
  cursor: pointer;
`;

const TimelineHead = styled.div`
  width: 100%;
  margin-bottom: 40px;
  h1 {
    font-family: "Oswald", sans-serif;
    font-size: 33px;
    color: white;
    margin-left: 17px;
  }

  @media (min-width: 610px) {
    width: 611px;

    h1 {
      font-size: 43px;
      margin-left: 0;
    }
  }
`;

const UserHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    font-family: "Oswald", sans-serif;
    font-size: 33px;
    color: white;
    margin-left: 18px;
    width: 100%;
  }

  img {
    display: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 18px;
  }

  @media (min-width: 610px) {
    justify-content: space-evenly;
    img {
      display: block;
    }
    h1 {
      width: 500px;
      font-size: 43px;
    }
  }
`;

const NewPostButton = styled.button`
  width: 611px;
  height: 61px;
  margin-bottom: 50px;

  border: none;
  outline: none;
  border-radius: 16px;
  background-color: var(--button--theme);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  color: #ffffff;
  font-size: 16px;

  .reload-icon {
    vertical-align: middle;
    font-size: 22px;
  }

  @media (max-width: 610px) {
    width: 100%;
  }
`;

const timelineComponents = {
  AllPosts,
  OnePost,
  Right,
  Left,
  Name,
  Coment,
  PostLink,
  DeletePost,
  EditPost,
  TimelineHead,
  UserHead,
  NameContainer,
  ActionsContainer,
  NewPostButton,
};

export default timelineComponents;
