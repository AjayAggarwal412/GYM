import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { Col, Container, Row } from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import Card from "react-bootstrap/Card";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { clientDashboard } from "../actions/clientActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

export const Dashboard = () => {
  const clientList = useSelector((state) => state.clientList);

  const { clients } = clientList;

  const dispatch = useDispatch();

  const clientDashboardScreen = useSelector(
    (state) => state.clientDashboardScreen
  );

  const { loading, totalClients, error } = clientDashboardScreen;

  const plan = clients?.map((x) => x.plan.split(/[!,?,.,()]/).at(2));
  var numberArray = plan?.map(Number);
  const income = numberArray?.reduce((partialSum, a) => partialSum + a, 0);

  const array = clients?.map((x) => x.joiningDate.split("-").splice(1, 1));

  const month = new Date().getMonth() + 1;
  var counter = 0;

  for (var i = 0; i < array?.length; i++) {
    if (array[i] == month) {
      counter += 1;
    }
  }

  useEffect(() => {
    dispatch(clientDashboard());
  }, [dispatch]);

  return (
    <MainScreen title={`Dashboard`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Container>
        <Row>
          {/* <Col>
            <Card className="members">
              <Card.Body>
                <Card.Title className="_title">Total Members</Card.Title>
                <Card.Text className="text">
                  {totalClients}
                  <img
                    src={require("../images/members.png")}
                    className="members_logo"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */}

          <Col>
            <Card className="members income">
              <Card.Body>
                <Card.Title className="_title">Total Income</Card.Title>
                <Card.Text className="text">
                  &#8377; {income}
                  <img
                    src={require("../images/income.png")}
                    className="income_logo"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="members month">
              <Card.Body>
                <Card.Title className="_title">Joined this month</Card.Title>
                <Card.Text className="text">
                  {counter}
                  <img
                    src={require("../images/join.png")}
                    className="join_logo"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <CChart
          type="bar"
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Joined this month",
                backgroundColor: "#f87979",
                data: [array],
              },
            ],
          }}
          labels="months"
        /> */}
      </Container>
    </MainScreen>
  );
};
