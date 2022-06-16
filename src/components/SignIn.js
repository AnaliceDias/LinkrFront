import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import TokenContext from "../contexts/TokenContext"
import API from "../repository/API"

import authComponents from "./authStyle"
const { Main, Title, Auth, AuthInput, AuthButton, StyledLink } = authComponents

export default function SignIn() {
  const navigate = useNavigate()
  const [valid, setValid] = useState(true) // check if email and password are correct
  const [loading, setLoading] = useState(false) // loading axios request
  const { setToken } = useContext(TokenContext)

  function submitForm(e) {
    e.preventDefault()
    setLoading(true)

    const body = {
      email: e.target[0].value,
      password: e.target[1].value,
    }

    const promise = API.login(body)
    promise.then((response) => {
      //setToken(response.data) não esquecer
      localStorage.setItem("token", response.data)
      setToken(response.data)
      localStorage.setItem("image", response.data.image)
      console.log(response.data)
      console.log(response.data.image) 
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
          <AuthInput type="email" placeholder="e-mail" required></AuthInput>
          <AuthInput type="password" placeholder="password" minLength={6} required></AuthInput>
          <AuthButton
            type="submit"
            disabled={loading ? true : false}
            style={loading ? { opacity: "0.7" } : {}}
          >
            Log In
          </AuthButton>
        </form>

        <StyledLink to="/sign-up">First time? Create an account!</StyledLink>

        {!valid ? <p>Email or password incorrect...</p> : <></>}
      </Auth>
    </Main>
  )
}
