import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Autoinsurance</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn && (
              <Nav className="me-auto">
                <NavDropdown title="Vehicle" id="vehicleDropDown">
                  <NavDropdown.Item href="/vehicle">Vehicle</NavDropdown.Item>
                  <NavDropdown.Item href="/vehicles">Search Vehicle</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Claim" id="claimDropDown">
                  <NavDropdown.Item href="/claim">Claim</NavDropdown.Item>
                  <NavDropdown.Item href="/claims">Search Claim</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn && (
              <>
                <Navbar.Text>
                  Signed in as: <a href="#">{authCtx.email}&nbsp;</a>
                </Navbar.Text>{" "}
                <Link to="#" onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <Navbar.Text>
                <>
                  <Link to="/auth">Login</Link>{" "}
                  <Link to="/register">Create Account</Link>
                </>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainNavigation;
