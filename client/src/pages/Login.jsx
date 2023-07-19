import React, { useEffect, useState } from "react";
import "./css/Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
function Login() {
  let user = useSelector((state) => state.userSlice.currentUser);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [regUser, setRegUser] = useState({
    email: "",
    password: "",
  });
  // aA1@#asd 2
  let tostOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let setval = (e) => {
    setRegUser({ ...regUser, [e.target.name]: e.target.value });
  };

  let checkValidation = () => {
    const { email, password } = regUser;

    if (email.length == "") {
      toast.error("Email required", tostOption);
    } else if (password.length == "") {
      toast.error("Password required", tostOption);
    } else {
      regusteruser();
    }
  };
  let regusteruser = async () => {
    let { data } = await axios.post(
      "http://localhost:5000/login-user",
      regUser
    );
    if (data.status == true) {
      dispatch(setCurrentUser(data.user));
      toast.success("User Login Successfully", tostOption);
      setTimeout(() => {
        setRegUser({
          name: "",
          email: "",
          number: "",
          password: "",
          city: "",
        });
        navigate("/");
      }, 2000);
    }
    if (data.status == false) {
      toast.error(data.mes, tostOption);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="signup">
        <div className="inner">
          <h1>Login User</h1>

          <div className="inputwrapper">
            <p>Email:</p>
            <input
              placeholder="Enter Email "
              value={regUser.email}
              name="email"
              onChange={(e) => {
                setval(e);
              }}
            />
          </div>

          <div className="inputwrapper">
            <p>Password:</p>
            <input
              placeholder="Enter Password"
              type="password"
              value={regUser.password}
              name="password"
              onChange={(e) => {
                setval(e);
              }}
            />
          </div>

          <button className="btn" onClick={checkValidation}>
            Login User
          </button>
          <span>
            <p>
              Don't have an account <Link to={"/signup"}> Register? </Link>
            </p>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
