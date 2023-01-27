import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listClients, notifyClient } from "../actions/clientActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import MainScreen from "../MainScreen/MainScreen";
import "./Home.css";
import dayjs from "dayjs";

const Home = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientList = useSelector((state) => state.clientList);

  const { loading, clients, error } = clientList;

  //console.log(clients);

  // const name = clients?.map((x) => x.name);
  // console.log(name);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    // dispatch(messageClientAction(number));

    // fetch("http://localhost:5000/api/messages", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(),
    // })
    //   .then((res) => res.json(to))
    //   .then(() => {
    //     setTo("9818230709");
    //   });
  };

  return (
    <MainScreen title={`Membership expired`}>
      {/* <Link to="/create">
        <Button className="add" size="lg">
          Add Clients
        </Button>
      </Link> */}

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
                {/* <th></th> */}
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
                .filter((item) => {
                  const c = dayjs();
                  const d = dayjs(item.joiningDate);
                  const x = c.diff(d, "days");

                  // console.log(x);

                  if (x >= 30 && x >= 31) {
                    return item;
                  } else {
                    return null;
                  }
                })
                .sort((a, b) => (a.clientId > b.clientId ? 1 : -1))
                .map((data) => (
                  <tr key={data._id} style={{ backgroundColor: "" }}>
                    <td>{data.clientId}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.joiningDate.replace("T00:00:00.000Z", "")}</td>
                    <td>{data.plan}</td>
                    {/* <td width="160">
                      <Button
                        href="/notify"
                        variant="success"
                        onClick={onSubmit}
                      >
                        Notify
                      </Button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </>
        </Table>
      </div>
    </MainScreen>
  );
};

export default Home;
