import { Navigate } from "react-router-dom";
//@ts-expect-error any props
export const ProtectedRoute = ({ children }) =>  {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signup" />;
  }

  return children;
}

