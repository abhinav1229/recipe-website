import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/loading.css";
import { BASE_URL } from "../helper/ref.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // clear the user from localStorage
  localStorage.setItem("userInfo", null);

  const checkUserExist = () => {
    Axios.post(`${BASE_URL}/user/loginValidate`, {
      userName: userName,
      userPassword: userPassword,
    })
      .then((response) => {
        if (response.data === "invalid") {
          setErrorMessage("Incorrect Username/Password");
          setLoading(false);
        } else {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              userName: userName,
              userLogin: true,
            })
          );
          navigate("/");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("There is a problem on login", error);
      });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    checkUserExist();
  };

  return (
    <div className="mainLoginContainer">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="left">
            <p className="warningMessage">{errorMessage}</p>
            <form className="loginContainer" onSubmit={handleSubmit}>
              <h1> Login 🥂 </h1>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type={"password"}
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
              <div className="forgotPassword">
                <Link to={"/forgot"}>Forgot Password?</Link>
              </div>

              <button type="submit" className="firstButton">
                Login
              </button>
              <Link className="pageRouter" to={"/register"}>
                <button type="submit">Register</button>
              </Link>
            </form>
          </div>
          <div className="right">
            <img
              src="https://www.oliviascuisine.com/wp-content/uploads/2019/01/double-chocolate-chili.jpg"
              alt="img"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;