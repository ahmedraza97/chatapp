import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../store/slices/GetAllUserSlice";
import "./css/Chat.scss";
import image from "../assets/giphy.gif";
import avatar from "../assets/avatar.png";
import { FaShare, FaPowerOff } from "react-icons/fa";
import { setCurrentUser } from "../store/slices/UserSlice";

function Chat() {
  let allUsers = useSelector((state) => state.getAllUserSlice.users);
  let currentUser = useSelector((state) => state.userSlice.currentUser);
  let [message, setMessage] = useState("");
  let [chatWith, setChatWith] = useState("");
  let [loading, setLoading] = useState(false)
  // console.log(currentUser);
  let [activeChat, setActiveChat] = useState("");
  let dispatch = useDispatch();
  let getAllUser = async () => {
    let { data } = await axios.post("http://localhost:5000/get-user", {
      _id: currentUser?._id,
    });
    // console.log(data);
    dispatch(setAllUsers(data));
  };
  let logoutUser = () => {
    dispatch(setCurrentUser(''))
  }
  useEffect(() => {
    getAllUser();
  }, []);
  // console.log(chatWith, "chatWith");

  let sendMessage = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      let { data } = await axios.post("http://localhost:5000/addmsg", {
        from: currentUser._id,
        to: chatWith._id,
        message: message,
      });
      setMessage("");
    }
    // console.log(message, "message");
  };

  let [messageArr, setMessageArr] = useState([]);

  let getAllMessage = async () => {
    try {

      let response = await axios.post("http://localhost:5000/getmsg", {
        from: currentUser._id,
        to: chatWith._id,
      });
      setMessageArr(response.data);
      // console.log(response, "response");
    } catch (error) {

    }
  };
  useEffect(() => {
    getAllMessage();
  }, [chatWith]);
  // console.log(allUsers, "allUsers");

  useEffect(() => {
    setTimeout(() => {
      getAllMessage();
    }, 1000);
  });
  console.log(activeChat, 'activeChat')
  console.log(chatWith, 'chatWith')


  return (
    <div className="chatApp">
      <div className="users">
        <div className="logo">
          {/* <p>Chat App</p> */}
          <p>Chat App</p>
        </div>
        <div className="usersList">
          {allUsers.map((item, index) => {
            return (
              <div
                className="userwrapper"
                key={index}
                style={{
                  background:
                    activeChat == item._id ? "rgb(0, 119, 255)" : null,
                  color: activeChat == item._id ? "white" : null,
                }}
                onClick={() => {
                  setActiveChat(item._id);
                  setChatWith(item);
                  getAllMessage();
                }}
              >
                <p>Name : {item.name}</p>
                <p>Email : {item.email}</p>
              </div>
            );
          })}
        </div>
        <div className="currentuser">
          <p>{currentUser?.email}</p>
          <p className="name">{currentUser?.name}</p>
        </div>
      </div>

      <div className="chatcontainer">
        {activeChat ? (
          <div className="chatWrapper">
            <div className="header">
              <div className="user">
                <img src={avatar} alt="" />
                <p className="name">{chatWith.name}</p>
              </div>
              <div className="logout" onClick={() => logoutUser()}>
                Logout <FaPowerOff />
              </div>
            </div>

            <div className="chatWrap">
              {messageArr.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`message ${item.fromSelf == true ? "mine" : "notmine"
                      }`}
                  >
                    <p>{item.message}</p>
                  </div>
                );
              })}
            </div>

            <div className="messageArea">
              <input
                placeholder="Message ...."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  sendMessage(e);
                }}
              >
                <FaShare />
              </button>
            </div>
          </div>
        ) : (
          <div className="nochat">
            <img src={image} alt="" />
            <h1>
              Hi <span>{currentUser?.name}</span>
            </h1>
            <p>Select a chat to start Messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
