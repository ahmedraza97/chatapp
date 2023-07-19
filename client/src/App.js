import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  let navigate = useNavigate();
  let currentUser = useSelector((state) => state.userSlice.currentUser);

  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute user={currentUser}> <Chat /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
