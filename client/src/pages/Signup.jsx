import React, { useState } from "react";
import "./css/Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  let navigate = useNavigate();
  const [regUser, setRegUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    city: "",
  });

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

  let validRegEx = [
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    /[0-9]/,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  ];
  let checkValidation = () => {
    const { name, email, number, password, city } = regUser;

    if (name.length < 3) {
      toast.error("Username should be greater than 3", tostOption);
    } else if (email.length == 0) {
      toast.error("Email required", tostOption);
    } else if (!validRegEx[0].test(email)) {
      toast.error("Invalid Email Format ", tostOption);
    } else if (number.length == 0) {
      toast.error("Number required", tostOption);
    } else if (!validRegEx[1].test(number)) {
      toast.error("Invalid Number Format", tostOption);
    } else if (password.length == 0) {
      toast.error("Password Required", tostOption);
    } else if (!validRegEx[2].test(password)) {
      toast.error(
        `Password should contain at least one upper case,
        one lower case,
        one digit,one special character,
        Minimum eight in length`,
        tostOption
      );
    } else if (city.length == 0) {
      toast.error("City Required", tostOption);
    } else {
      regusteruser();
    }
  };
  let regusteruser = async () => {
    let { data } = await axios.post(
      "http://localhost:5000/register-user",
      regUser
    );
    console.log(data);
    if (data.status == true) {
      toast.success("User Register Successfully", tostOption);
      setTimeout(() => {
        setRegUser({
          name: "",
          email: "",
          number: "",
          password: "",
          city: "",
        });
        navigate("/login");
      }, 2000);
    }
    if (data.status == false) {
      toast.error(data.mes, tostOption);
    }
  };
  return (
    <>
      <div className="signup">
        <div className="inner">
          <h1>Register User</h1>
          <div className="inputwrapper">
            <p>User Name:</p>
            <input
              placeholder="Enter username "
              value={regUser.name}
              name="name"
              onChange={(e) => {
                setval(e);
              }}
            />
          </div>
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
            <p>Number:</p>
            <input
              placeholder="Enter number "
              value={regUser.number}
              name="number"
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
          <div className="inputwrapper">
            <p>City:</p>
            <input
              placeholder="Enter City"
              value={regUser.city}
              name="city"
              onChange={(e) => {
                setval(e);
              }}
            />
          </div>
          <button className="btn" onClick={checkValidation}>
            Register User
          </button>
          <span>
            <p>
              I already have Account <Link to={"/login"}> Login? </Link>
            </p>
          </span>
        </div>
      </div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer />
    </>
  );
}
export default Signup;
