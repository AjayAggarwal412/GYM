import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientAction,
  updateClientAction,
} from "../actions/clientActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

function SingleClient() {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [plan, setPlan] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const clientUpdate = useSelector((state) => state.clientUpdate);
  const { loading, error } = clientUpdate;

  const clientDelete = useSelector((state) => state.clientDelete);
  const { loading: loadingDelete, error: errorDelete } = clientDelete;

  const options = [
    { label: "Monthly (Rs.1200)", value: "Monthly (Rs.1200)" },
    { label: "Quaterly (Rs.3300)", value: "Quaterly (Rs.3300)" },
    { label: "Half-yearly (Rs.4800)", value: "Half-yearly (Rs.4800)" },
    { label: "Yearly (Rs.9600)", value: "Yearly (Rs.9600)" },
  ];

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteClientAction(id));
    }
    navigate("/myclients");
  };

  const handleChange = (e) => {
    setPlan(e.value);
    //console.log(e.value);
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/newClients/${id}`
      );

      setClientId(data.clientId);
      setName(data.name);
      setPhone(data.phone);
      setJoiningDate(data.joiningDate);
      setPlan(data.plan);
    };

    fetching();
  }, [id]);

  const resetHandler = () => {
    setClientId("");
    setName("");
    setPhone("");
    setJoiningDate("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateClientAction(id, clientId, name, phone, joiningDate, plan));
    if (!clientId || !name || !phone || !joiningDate || !plan) return;

    resetHandler();
    navigate("/myclients");
  };

  return (
    <MainScreen title="Edit Client">
      <Card>
        <Card.Header>Edit your Client</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            <Form.Group>
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                disabled
                type="number"
                placeholder="Enter the client Id"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ marginTop: "20px" }}>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the phone number"
                value={phone}
                maxLength="10"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ marginTop: "20px" }}>
                Joining Date
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the joining date"
                value={joiningDate}
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

            <Button variant="primary" type="submit">
              Update Client
            </Button>

            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Client
            </Button>
          </Form>
        </Card.Body>

        {/* <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer> */}
      </Card>
    </MainScreen>
  );
}

export default SingleClient;
