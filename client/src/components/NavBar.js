import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">CompassioNet</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/all">
          All Kindnesses
        </Button>
        <Button as={Link} to="/new">
          New Kindness
        </Button>
        <Button onClick={handleLogoutClick}>
          Sign Out
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

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

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;