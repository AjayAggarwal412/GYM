import React from "react";
import "./LandingPage.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../Login/Login";

const LandingPage = () => {
  return (
    <div className="landing">
      <Container>
        <Row>
          <img src={require("../images/logo.PNG")} className="main" />
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Iron Champs Gym</h1>
              <p className="subtitle">WORK SWEAT ACHEIVE</p>
            </div>

            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  SignUp
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
