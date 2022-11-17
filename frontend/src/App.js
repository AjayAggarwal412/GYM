import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import LandingPage from "./LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyClients from "./MyClients/MyClients";
import Login from "./Login/Login";
import Register from "./Register/Register";
import CreateClient from "./CreateClient/CreateClient";
import SingleClient from "./SingleClient.js/SingleClient";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/myclients" element={<MyClients />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateClient />} />
          <Route path="/newclients/:id" element={<SingleClient />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
