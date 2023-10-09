import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import { Button } from "../styles";
import "../styles/Login.css"

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <Logo>CompassioNet</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUp onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </div>
  );
}

const Logo = styled.h1`
  font-family: 'Roboto', sans-serif; /* Change the font family to a modern sans-serif font */
  font-size: 3rem;
  color: #FF6B6B; /* Change the color to a modern color code */
  margin: 8px 0 16px;
  font-weight: 300;

  a {
    color: inherit;
    text-decoration: none;
  }

`;


const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;