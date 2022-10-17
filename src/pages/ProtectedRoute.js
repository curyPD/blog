import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { curUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(curUser);
    if (!curUser) return;
    curUser.uid !== "FHkXeKqFiNX6CEMoGInSoMiYelk2" && navigate("/");
  }, [curUser]);

  if (!curUser || curUser?.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2") {
    return children;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
