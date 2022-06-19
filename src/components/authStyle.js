import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;

  overflow-y: auto;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const Title = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 175px;
  padding: 0 60px;

  color: #ffffff;
  background-color: var(--theme);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Passion One", cursive;
    font-size: 76px;
  }

  p {
    font-family: "Oswald", sans-serif;
    font-size: 23px;
    text-align: center;
  }

  @media (min-width: 768px) {
    height: 100%;
    align-items: flex-start;

    padding: 0 120px;

    h1 {
      font-size: 106px;
    }

    p {
      font-size: 43px;
      text-align: left;
    }
  }
`;

const Auth = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 35px 0;
  padding: 0 25px;

  form {
    display: flex;
    flex-direction: column;

    margin-bottom: 20px;
    width: 100%;
  }

  p {
    margin-top: 25px;
    text-align: center;

    color: var(--error);
    font-size: 23px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    height: 100%;
    max-width: 37%;

    padding: 0 45px;
    margin: 0;

    justify-content: center;
  }
`;

const AuthInput = styled.input`
  height: 55px;
  border-radius: 6px;

  font-size: 22px;
  margin: 5px 0;
  padding: 0 17px;

  ::placeholder {
    font-family: "Oswald", sans-serif;
    color: #9f9f9f;
  }
`;

const AuthButton = styled.button`
  height: 55px;
  border-radius: 6px;

  font-size: 22px;
  margin: 5px 0;

  background-color: var(--button--theme);
  border: none;
  outline: none;

  font-family: "Oswald", sans-serif;
  color: #ffffff;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-align: center;
  font-size: 17px;
  color: #ffffff;
`;

<<<<<<< HEAD
=======
//TIMELINE
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

const OnePost = styled.div`
  display: flex;
  width: 611px;
  height: 276px;
  margin: 26px 0 0 16px;
  background-color: #171717;
  border-radius: 16px;
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

  .name h1 {
    font-family: "Lato";
    font-size: 20px;
    color: white;
    text-align: left;
    margin: 8px 0 0 8px;
  }
  .coment h2 {
    font-family: "Lato";
    font-size: 17px;
    color: #b7b7b7;
    text-align: left;
    margin: 8px 0 0 8px;
    padding-bottom: 8px;
    font-weight: 400;
    line-height: 20px;
  }
  .coment textarea {
    resize: none;
    font-family: "Lato";
    
    width: 100%;
    font-size: 15px;

    margin: 3px;
    padding: 5px;
    border-radius: 10px;
  }
  .link {
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 10px;
    padding-left: 20px;
    position: relative;
  }
  .link h2 {
    font-size: 16px;
    font-weight: 400;
    color: #cecece;
    font-family: "Lato";
    text-align: left;
    margin: 24px 0 8px 0;
  }
  .link h3 {
    width: 250px;
    font-size: 13px;
    font-weight: 400;
    color: #9b9595;
    font-family: "Lato";
    text-align: left;
    margin-bottom: 8px;
  }
  .link p {
    width: 250px;
    font-size: 13px;
    font-weight: 400;
    color: #cecece;
    font-family: "Lato";
    text-align: left;
  }
  .link img {
    position: absolute;
    width: 155px;
    height: 153px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: blue;
    border-radius: 0 10px 10px 0;
  }
`;
>>>>>>> b78825342324efd65350c0ffba1750aef9bcc855

// EXPORT
const authComponents = {
  Main,
  Title,
  Auth,
  AuthInput,
  AuthButton,
<<<<<<< HEAD
  StyledLink
=======
  StyledLink,
  AllPosts,
  OnePost,
  Right,
  Left,
>>>>>>> b78825342324efd65350c0ffba1750aef9bcc855
};

export default authComponents;
