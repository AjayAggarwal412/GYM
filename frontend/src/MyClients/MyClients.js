import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import "./MyClients.css";
import axios from "axios";

const MyClients = () => {
  const [clients, setClients] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/myclients");

    setClients(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete the client?")) {
    }
  };

  return (
    <MainScreen title="Welcome Back Ajay Aggarwal...">
      <Link to="/addclient">
        <Button className="add" size="lg">
          Add Clients
        </Button>
      </Link>

      {clients?.map((data) => (
        <Card style={{ margin: 10 }} key={data._id}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              {data.name}
            </span>

            <div>
              <Button href={`/client/${data._id}`}>Edit</Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(data._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>

          {/* <Card.Body>
            <h4>
              <Badge bg="success" text="light">
                Monthly Plan
              </Badge>
            </h4>
            <blockquote className="blockquote mb-0">
              <p>Plan ends in 3 days</p>
              <footer style={{ float: "right" }} className="blockquote-footer">
                Joined on 10/5/2022
                <cite title="Source Title"></cite>
              </footer>
            </blockquote>
          </Card.Body> */}
        </Card>
      ))}
    </MainScreen>
  );
};

export default MyClients;
