import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
// import EmployerProtectedRoute from "./EmployerProtectedRoute";

const EmployerProtectedRoute = ({ children }) => {
  const { user, role } = useContext(AuthContext);
  if (!user) return <Navigate to="/log-in" />;
  if (role !== "employer") return <Navigate to="/jobs" />;
  return children;
};

export default EmployerProtectedRoute;

// {/* <Route
//   path="/add-job"
//   element={
//     <EmployerProtectedRoute>
//       <AddJob addjobs={addjobs} />
//     </EmployerProtectedRoute>
//   }
// />; */}