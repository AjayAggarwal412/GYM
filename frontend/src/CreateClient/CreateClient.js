import React, { useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createClientAction } from "../actions/clientActions";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CreateClient() {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [plan, setPlan] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientCreate = useSelector((state) => state.clientCreate);
  const { loading, error, client } = clientCreate;

  const options = [
    { label: "Monthly     (Rs.1200)", value: "Monthly     (Rs.1200)" },
    { label: "Quaterly    (Rs.3300)", value: "Quaterly    (Rs.3300)" },
    { label: "Half-yearly (Rs.4800)", value: "Half-yearly (Rs.4800)" },
    { label: "Yearly      (Rs.9600)", value: "Yearly      (Rs.9600)" },
  ];

  //   console.log(note);

  const resetHandler = () => {
    setClientId("");
    setName("");
    setPhone("");
    setJoiningDate("");
    setPlan(null);
  };

  const handleChange = (e) => {
    setPlan(e.value);
    //console.log(e.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createClientAction(clientId, name, phone, joiningDate, plan));

    if (!clientId || !name || !phone || !joiningDate || !plan) return;

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
                style={{ marginBottom: "20px" }}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </Form.Group>

            <Form.Label>Plan</Form.Label>
            <div style={{ marginBottom: "20px" }}>
              <Select
                placeholder="Select Plan"
                value={options.find((obj) => obj.value === plan)}
                onChange={handleChange}
                options={options}
              />
            </div>

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
