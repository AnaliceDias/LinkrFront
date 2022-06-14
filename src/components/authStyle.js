import styled from "styled-components"
import { Link } from "react-router-dom"

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;

  overflow-y: auto;
`

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
`

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
`

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
`

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
`

const StyledLink = styled(Link)`
  font-size: 17px;
  color: #ffffff;
`

// EXPORT
const authComponents = {
  Main,
  Title,
  Auth,
  AuthInput,
  AuthButton,
  StyledLink,
}

export default authComponents
