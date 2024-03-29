import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

const UPDATE_USER_URL = "/api/v1/user/update";
const USER_DATA_URL = "api/v1/profile";

const UpdateProfile = ({ setAuth }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Update Profile | Metrohyve";

    const fetchData = async () => {
      try {
        const response = await axios.get(USER_DATA_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = response.data;

        setFirstname(parseRes.fname);
        setLastname(parseRes.lname);
        setEmail(parseRes.email);
      } catch (error) {
        if (error.response.data === "jwt expired") {
          setAuth(false);

          console.log("Session expired!");
        }
      }
    };
    fetchData();
  }, [setAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      fname: firstname,
      lname: lastname,
      email,
    };

    try {
      const updateProfile = await axios.put(UPDATE_USER_URL, body, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      if (updateProfile.status === 200 && updateProfile.statusText === "OK") {
        alert(
          `Your profile ${firstname} ${lastname} has been updated successfully!`
        );
        window.location.reload();
      }
      <Navigate to="/dashboard" />;
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section>
      <div className="container d-flex align-items-center justify-content-center py-5 vh-100">
        <div className="p-4 bg-gradient bg-light shadow rounded">
          <div className="text-center text-secondary shadow-sm rounded py-2">
            <h3>Update Profile</h3>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-outline mb-2">
              <label
                className="form-label text-secondary pt-2"
                htmlFor="firstname"
              >
                First name:
              </label>
              <input
                className="form-control"
                name="firstname"
                value={firstname}
                type="text"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label text-secondary" htmlFor="lastname">
                Last name:
              </label>
              <input
                className="form-control"
                name="lastname"
                value={lastname}
                type="text"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label text-secondary" htmlFor="email">
                Email address:
              </label>
              <input
                className="form-control"
                name="email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="d-grid">
              <button
                className="btn btn-warning btn-block mb-2 px-4 bg-gradient shadow-sm rounded"
                type="submit button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
