import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">🧩 WordleTEC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Wordle 5</NavLink>
            <NavLink className="nav-link" to="/wordle6">Wordle 6</NavLink>
            <NavLink className="nav-link" to="/wordle7">Wordle 7</NavLink>
            <NavLink className="nav-link" to="/registro">Registro</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
