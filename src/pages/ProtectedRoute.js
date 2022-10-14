import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { curUser } = useAuth();
  if (curUser?.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2") {
    return children;
  } else return <Navigate to="/" />;
}

export default ProtectedRoute;
