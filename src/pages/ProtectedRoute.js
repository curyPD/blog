import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { curUser } = useAuth();
  const navigate = useNavigate();
  if (curUser?.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2") {
    return children;
  } else return navigate("/");
}

export default ProtectedRoute;
