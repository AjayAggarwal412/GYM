import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import "./MyClients.css";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientAction, listClients } from "../actions/clientActions";

const MyClients = ({ search }) => {
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

  const clientDelete = useSelector((state) => state.clientDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = clientDelete;

  useEffect(() => {
    dispatch(listClients());

    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    successCreate,
    successUpdate,
    successDelete,
    userInfo,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete the client?")) {
      dispatch(deleteClientAction(id));
    }
  };

  // const sortByDate = () => {
  //   let data = clients?.sort((a, b) =>
  //     b.joiningDate
  //       .split("-")
  //       .join()
  //       .localeCompare(a.joiningDate.split("-").join())
  //   );
  //   console.log(data);
  // };

  const [data, setData] = useState(clients);

  const sortByAscending = () => {
    let sortedAsceding = clients.sort((a, b) => {
      return a.clientId < b.clientId ? 1 : -1;
    });
    setData(sortedAsceding);
    //console.log(data);
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name}...`}>
      <Link to="/create">
        <Button className="add" size="lg">
          Add Clients
        </Button>
      </Link>

      {/* <Button className="add" size="lg" onClick={sortByDate}>
        Sort by joining Date
      </Button> */}
      {/* <Button onClick={sortByAscending} size="lg" className="add">
        Ascending
      </Button> */}

      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
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
                <th>Plan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients
                ?.reverse()
                .filter((filteredClients) =>
                  filteredClients.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .sort((a, b) => (a.clientId > b.clientId ? 1 : -1))
                .map((data) => (
                  <tr key={data._id}>
                    <td>{data.clientId}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.joiningDate.replace("T00:00:00.000Z", "")}</td>
                    <td>{data.plan}</td>
                    <td width="160">
                      <Button href={`/newClients/${data._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(data._id)}
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
