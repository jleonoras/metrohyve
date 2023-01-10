import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const LOGIN_URL = "/api/v1/login";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { email, password } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await axios.post(LOGIN_URL, JSON.stringify(body), {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      const parseRes = response.data;

      if (parseRes.token) {
        setAuth(true);
      } else {
        setAuth(false);
        console.log("Something went wrong");
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login | Metrohyve";
  }, []);

  return (
    <section>
      <div className="container d-flex align-items-center justify-content-center py-5 vh-100">
        <div className="p-4 bg-light bg-gradient rounded shadow">
          <div className="text-center text-secondary">
            <h3>Login</h3>
          </div>
          <form onSubmit={onSubmitForm}>
            <div className="form-outline">
              <label className="form-label" htmlFor="email"></label>
              <input
                className="form-control"
                placeholder="Email address"
                type="email"
                id="email"
                value={email}
                name="email"
                autoComplete="email"
                required
                autoFocus
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password"></label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className="d-grid">
              <button
                type="button submit"
                className="btn btn-warning btn-block mb-4 px-4 bg-gradient"
              >
                Submit
              </button>
            </div>
            <div className="text-secondary">
              <span>Don't have an account? </span>
              <Link to="/register">
                <strong>Register</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
