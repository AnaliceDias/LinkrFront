import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../repository/API";

import authComponents from "../styles/authStyle";
const { Main, Title, Auth, AuthInput, AuthButton, StyledLink } = authComponents;

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // loading axios request
  const [valid, setValid] = useState(true); // check if email and password are correct

  function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      email: e.target[0].value,
      password: e.target[1].value,
      name: e.target[2].value,
      picture: e.target[3].value
    };

    const promise = API.createUser(body);
    promise.then(response => {
      navigate("/");
    });
    promise.catch(e => {
      setValid(false);
      setLoading(false);
    });
  }

  // array with all inputs
  const inputs = [
    { type: "email", ph: "e-mail", min: 0 },
    { type: "password", ph: "password", min: 6 },
    { type: "text", ph: "username", min: 2 },
    { type: "url", ph: "picture url", min: 0 }
  ];

  return (
    <Main>
      <Title>
        <h1>linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </Title>

      <Auth>
        <form onSubmit={e => submitForm(e)}>
          {inputs.map(i => {
            return (
              <AuthInput
                key={i.ph}
                type={i.type}
                placeholder={i.ph}
                minLength={i.min}
                required
              ></AuthInput>
            );
          })}
          <AuthButton
            type="submit"
            disabled={loading ? true : false}
            style={loading ? { opacity: "0.7" } : {}}
          >
            Sign Up
          </AuthButton>
        </form>

        <StyledLink to="/">Switch back to log in</StyledLink>

        {!valid ? <p>Email already in use...</p> : <></>}
      </Auth>
    </Main>
  );
}
