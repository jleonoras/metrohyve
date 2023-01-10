import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import UserListing from "../userListing/UserListing";
import { useNavigate } from "react-router-dom";
import avatar from "../avatar.png";

const PROFILE_URL = "/api/v1/profile";
const LOGOUT_URL = "/api/v1/logout";

const Dashboard = ({ setAuth }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Account | Metrohyve";

    const fetchData = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data;
        setFName(parseRes.fname);
        setLName(parseRes.lname);
        setEmail(parseRes.email);
        setUserId(parseRes.user_id);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(LOGOUT_URL, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });
      setAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate(`/dashboard/update/${fname}/${userId}`);
  };

  return (
    <section>
      <div className="container pt-5">
        <div className="p-4 shadow rounded bg-gradient bg-light">
          <div className="d-flex position-relative">
            <div className="w-100">
              <div className="w-100 d-grid justify-content-center text-center">
                <div className="w-100">
                  <img
                    className="rounded-circle img-fluid w-25"
                    src={avatar}
                    alt="avatar"
                    loading="lazy"
                  />
                </div>
                <div className="py-2">
                  <div className="text-secondary">
                    <h5>
                      {fname} {lname}
                    </h5>
                  </div>
                  <div className="text-secondary">
                    <span>{email}</span>
                  </div>
                  <div className="pt-3">
                    <button
                      className="btn btn-warning bg-gradient btn-sm"
                      type="button"
                      onClick={(e) => handleUpdate(e)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="position-absolute top-0 end-0">
                <button
                  className="btn btn-danger bg-gradient btn-sm"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserListing />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
