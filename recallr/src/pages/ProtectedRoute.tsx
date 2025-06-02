import { Navigate } from "react-router-dom";
//@ts-expect-error any props
export const ProtectedRoute = ({ children }) =>  {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

