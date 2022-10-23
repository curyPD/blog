import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { curUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (curUser === "initialization") return;
    !curUser?.role?.admin && navigate("/");
  }, [curUser, navigate]);

  if (curUser?.role?.admin || curUser === "initialization") return children;
  return <Navigate to="/" />;
}

export default ProtectedRoute;
