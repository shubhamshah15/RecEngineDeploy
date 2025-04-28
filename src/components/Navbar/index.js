import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from "../login";
import Logout from "../logout";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Logo from '../../Logo1.png';


const client_id =
  "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive";

const Navbar1 = (props) => {
  const [name, setName] = useState('');

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: client_id,
        scope: scope,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/"><img src={Logo} style={{height: '70px', width: '250px'}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about" activeStyle>
              About
            </Nav.Link>
            {/* <Nav.Link href="/pastRecs" activeStyle>
              Past Recommendations{" "}
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          {name}
          {props.email !== "" ? (
            <Logout setEmail={props.setEmail} setName={setName} />
          ) : (
            <Login setEmail={props.setEmail} setName={setName} />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
