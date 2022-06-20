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

// EXPORT
const authComponents = {
  Main,
  Title,
  Auth,
  AuthInput,
  AuthButton,
  StyledLink
};

export default authComponents;
