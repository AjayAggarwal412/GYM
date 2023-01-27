import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import LandingPage from "./LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyClients from "./MyClients/MyClients";
import Login from "./Login/Login";
import Register from "./Register/Register";
import CreateClient from "./CreateClient/CreateClient";
import SingleClient from "./SingleClient.js/SingleClient";
import Home from "./Home/Home";
import { useSelector } from "react-redux";
import { Dashboard } from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import AppLogout from "./AppLogout";

const App = () => {
  const [search, setSearch] = useState("");

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  return (
    <React.Fragment>
      <Router>
        {userInfo && <Header setSearch={setSearch} />}
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/home"
            element={
              <AppLogout>
                <Home search={search} />
              </AppLogout>
            }
            exact
          />
          <Route path="/myclients" element={<MyClients search={search} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateClient />} />
          <Route path="/newclients/:id" element={<SingleClient />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
