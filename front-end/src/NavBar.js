import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (localStorage.getItem("token") != null) {
    return (
      <>
      <Navbar bg="dark" variant="dark" collapseOnSelect fixed='top' expand='sm'>
        <Container>
          <Link className="nav-link" to="/"><Navbar.Brand>Recipe Wizard</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="me-auto">
              <Nav.Link><Link className="nav-link" to="/about">About</Link></Nav.Link>
              <Nav.Link><Link className="nav-link" to="/user/:id">Users</Link></Nav.Link>
              <Nav.Link><Link className="nav-link" onClick={logout} to="/login">Logout</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    );
  } else {
    return (
      <>
      <Navbar bg="dark" variant="dark" collapseOnSelect fixed='top' expand='sm'>
        <Container>
          <Link className="nav-link" to="/"><Navbar.Brand>Recipe Wizard</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="me-auto">
              <Nav.Link><Link className="nav-link" to="/about">About</Link></Nav.Link>
              <Nav.Link><Link className="nav-link" to="/login">Login</Link></Nav.Link>
              <Nav.Link><Link className="nav-link" to="/register">Register</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    );
  }
};
export default NavBar;
