import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { curUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(curUser);
    if (curUser === "initialization") return;
    curUser?.uid !== process.env.REACT_APP_ADMIN_UID && navigate("/");
  }, [curUser, navigate]);

  if (
    curUser?.uid === process.env.REACT_APP_ADMIN_UID ||
    curUser === "initialization"
  ) {
    return children;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
