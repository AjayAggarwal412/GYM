import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import "./MyClients.css";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { listClients } from "../actions/clientActions";

const MyClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientList = useSelector((state) => state.clientList);

  const { loading, clients, error } = clientList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const clientCreate = useSelector((state) => state.clientCreate);
  const { success: successCreate } = clientCreate;

  const clientUpdate = useSelector((state) => state.clientUpdate);
  const { success: successUpdate } = clientUpdate;

  useEffect(() => {
    dispatch(listClients());

    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, successCreate, successUpdate, userInfo]);

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete the client?")) {
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name}...`}>
      <Link to="/create">
        <Button className="add" size="lg">
          Add Clients
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <div style={{ padding: "10px" }}>
        <Table striped bordered hover>
          <>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Joining Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients?.reverse().map((data) => (
                <tr key={data._id}>
                  <td>{data.clientId}</td>
                  <td>{data.name}</td>
                  <td>{data.phone}</td>
                  <td>{data.joiningDate}</td>
                  <td width="160">
                    <Button href={`/newClients/${data._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler()}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </Table>
      </div>
    </MainScreen>
  );
};

export default MyClients;
