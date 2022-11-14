import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./home/Home";
import Login from "./login/Login";
import Error from "./error/Error";
import "./component/nav.css";
import Register from "./register/Register";
import Navbar from "./component/StyledNavbar";
import Listing from "./listing/Listing";
import Dashboard from "./dashboard/Dashboard";
import axios from "../src/api/axios";
import AddListing from "./addlisting/AddListing";
import SingleListing from "./singleListing/SingleListing";

const VERIFY_URL = "/api/v1/verify";

function App() {
  const checkAuthenticated = async () => {
    try {
      const response = await axios.get(VERIFY_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const parseRes = await response?.data;

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/addlisting"
          element={
            isAuthenticated ? (
              <AddListing setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<SingleListing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
