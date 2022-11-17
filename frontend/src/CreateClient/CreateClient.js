import React, { useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createClientAction } from "../actions/clientActions";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";

function CreateClient() {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientCreate = useSelector((state) => state.clientCreate);
  const { loading, error, client } = clientCreate;

  //   console.log(note);

  const resetHandler = () => {
    setClientId("");
    setName("");
    setPhone("");
    setJoiningDate("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createClientAction(clientId, name, phone, joiningDate));

    if (!clientId || !name || !phone || !joiningDate) return;

    // if (id) {
    //   //res.status(400);
    //   throw new Error("Client Id already exists!!!");
    // } else {
    //   dispatch(createClientAction(id, name, phone, joiningDate));
    //   resetHandler();

    //   navigate("/myclients");
    // }

    // if (client.clientId) {
    //   alert("Client already exists");
    //   resetHandler();
    //   return;
    // }

    resetHandler();

    navigate("/myclients");
  };

  return (
    <MainScreen title="Add a Client">
      <Card>
        <Card.Header>Add a new Client</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group>
              <Form.Label>Client Id</Form.Label>
              <Form.Control
                type="number"
                value={clientId}
                placeholder="Enter the Client Id"
                onChange={(e) => setClientId(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the name"
                rows={4}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label style={{ marginTop: "20px" }}>Phone</Form.Label>
              <Form.Control
                type="content"
                value={phone}
                placeholder="Enter the phone"
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label style={{ marginTop: "20px" }}>
                Joining Date
              </Form.Label>
              <Form.Control
                type="date"
                value={joiningDate}
                placeholder="Enter the Joining Date"
                style={{ marginBottom: "40px" }}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Button type="submit" variant="primary">
              Add Client
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        {/* <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer> */}
      </Card>
    </MainScreen>
  );
}

export default CreateClient;
