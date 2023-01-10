import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const REG_URL = "/api/v1/register";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        fname: firstname,
        lname: lastname,
        email: email,
        password: password,
      };
      const response = await axios.post(REG_URL, JSON.stringify(body), {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response.data;

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
    document.title = "Register | Metrohyve";
  }, []);

  return (
    <section>
      <div className="container d-flex align-items-center justify-content-center py-5 vh-100">
        <div className="p-4 bg-light bg-gradient rounded shadow">
          <div className="text-center text-secondary">
            <h3>Register</h3>
          </div>
          <form onSubmit={onSubmitForm}>
            <div className="form-outline">
              <label className="form-label" htmlFor="firstname"></label>
              <input
                className="form-control"
                placeholder="First name"
                type="text"
                name="firstname"
                value={firstname}
                required
                autoFocus
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className="form-outline">
              <label className="form-label" htmlFor="lastname"></label>
              <input
                className="form-control"
                placeholder="Last name"
                type="text"
                name="lastname"
                value={lastname}
                required
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div className="form-outline">
              <label className="form-label" htmlFor="email"></label>
              <input
                className="form-control"
                placeholder="Email address"
                type="email"
                name="email"
                value={email}
                autoComplete="email"
                required
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
                className="btn btn-warning btn-block mb-4 px-4 bg-gradient"
                type="button submit"
              >
                Submit
              </button>
            </div>
            <div className="text-secondary">
              <span>Already have an account? </span>
              <Link to="/login">
                <strong>Login</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
