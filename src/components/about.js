import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import avatar from "../avatar.jpg";
import Aagam from '../Aagam.jpg';
import Jaggy from '../Jaggy.jpg';
import Dhiraj from '../Dhiraj.jpeg';
import Shubham from '../Shubham.JPG';

const About = () => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Card style={{ width: "18rem", margin: "30px" }}>
            <Card.Img variant="center" src={Aagam} style={{ height:"286px" , width: "288px" }} />
            <Card.Body>
              <Card.Title>Aagam Sheth</Card.Title>
              <Card.Text>
                Final year Computer Science student at Shah & Anchor Kutchhi
                Engineering College.
              </Card.Text>
              <a href="">
                <Button variant="primary">LinkedIn</Button>
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={3}>
          <Card style={{ width: "18rem", margin: "30px" }}>
            <Card.Img variant="center" src={Shubham} style={{ height:"290px" , width: "100%"}} />
            <Card.Body>
              <Card.Title>Shubham Shah</Card.Title>
              <Card.Text>
                Final year Computer Science student at Shah & Anchor Kutchhi
                Engineering College.
              </Card.Text>
              <a href="">
                <Button variant="primary">LinkedIn</Button>
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={3}>
          <Card style={{ width: "18rem", margin: "30px" }}>
            <Card.Img variant="center" src={Jaggy} style={{ height:"286px" , width: "288px" }} />
            <Card.Body>
              <Card.Title>Jagjot Singh</Card.Title>
              <Card.Text>
                Final year Computer Science student at Shah & Anchor Kutchhi
                Engineering College.
              </Card.Text>
              <a href="">
                <Button variant="primary">LinkedIn</Button>
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={3}>
          <Card style={{ width: "18rem", margin: "30px" }}>
            <Card.Img variant="center" src={Dhiraj} style={{ height:"286px" , width: "288px" }} />
            <Card.Body>
              <Card.Title>Dhiraj Shetty</Card.Title>
              <Card.Text>
                Final year Computer Science student at Shah & Anchor Kutchhi
                Engineering College.
              </Card.Text>
              <a href="">
                <Button variant="primary">LinkedIn</Button>
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default About;
