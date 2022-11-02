import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    //console.log(email, password);

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      setLoading(true);

      const data = await fetch("http://localhost:5000/api/gym/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await data.json();

      console.log(response);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="py-3">
            <Col>
              New User ?<Link to="/register">Register here</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default Login;
