import React, { useEffect, useState } from "react";
import MainScreen from "../MainScreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateClientAction } from "../actions/clientActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";

function SingleClient() {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const clientUpdate = useSelector((state) => state.clientUpdate);
  const { loading, error } = clientUpdate;

  //   const noteDelete = useSelector((state) => state.noteDelete);
  //   const { loading: loadingDelete, error: errorDelete } = noteDelete;

  //   const deleteHandler = (id) => {
  //     if (window.confirm("Are you sure?")) {
  //       dispatch(deleteNoteAction(id));
  //     }
  //     navigate("/mynotes");
  //   };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/newClients/${id}`
      );

      setClientId(data.clientId);
      setName(data.name);
      setPhone(data.phone);
      setJoiningDate(data.joiningDate);
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
    dispatch(updateClientAction(id, clientId, name, phone, joiningDate));
    if (!clientId || !name || !phone || !joiningDate) return;

    resetHandler();
    navigate("/myclients");
  };

  return (
    <MainScreen title="Edit Client">
      <Card>
        <Card.Header>Edit your Client</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {/* {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )} */}

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
              <Form.Label>Name</Form.Label>
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
                style={{ marginBottom: "40px" }}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Button variant="primary" type="submit">
              Update Client
            </Button>

            <Button
              className="mx-2"
              variant="danger"
              //   onClick={() => deleteHandler(id)}
            >
              Delete Note
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
