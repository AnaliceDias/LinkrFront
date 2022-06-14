import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

import TokenContext from "../contexts/TokenContext"
import connectionURI from "../assets/connectionURI"

export default function SignIn() {
  const navigate = useNavigate()
  const [valid, setValid] = useState(true) // check if email and password are correct
  const [loading, setLoading] = useState(false) // loading axios request
  const { setToken } = useContext(TokenContext)

  function submitForm(e) {
    e.preventDefault()
    setLoading(true)

    const promise = axios.post(`${connectionURI}`, {
      email: e.target[0].value,
      password: e.target[1].value,
    })
    promise.then((response) => {
      setToken(response.data)
      navigate("/timeline")
    })
    promise.catch((e) => {
      setValid(false)
      setLoading(false)
    })
  }

  return (
    <Main>
      <Title>
        <h1>linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </Title>

      <Auth>
        <form onSubmit={(e) => submitForm(e)}>
          <input type="email" placeholder="e-mail" required></input>
          <input type="password" placeholder="password" minLength={6} required></input>
          <button type="submit" disabled={loading ? true : false} style={loading ? { opacity: "0.7" } : {}}>
            Log In
          </button>
        </form>

        <StyledLink to="/sign-up">First time? Create an account!</StyledLink>

        {!valid ? <p>Email or password incorrect...</p> : <></>}
      </Auth>
    </Main>
  )
}

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

    * {
      height: 55px;
      border-radius: 6px;

      font-size: 22px;
      margin: 5px 0;
    }

    input {
      padding: 0 17px;
    }

    input::placeholder {
      font-family: "Oswald", sans-serif;
      color: #9f9f9f;
    }

    button {
      background-color: var(--button--theme);
      border: none;
      outline: none;

      font-family: "Oswald", sans-serif;
      color: #ffffff;
      cursor: pointer;
    }
  }

  p {
    margin-top: 25px;
    text-align: center;

    color: var(--error);
    font-size: 23px;
    font-weight: 700;
  }
`

const StyledLink = styled(Link)`
  font-size: 17px;
  color: #ffffff;
`
