import { Navigate } from "react-router-dom";

function RequireRole({ role, children }) {
  const token = sessionStorage.getItem("ecowatchToken");
  let user;

  try {
    user = JSON.parse(sessionStorage.getItem("ecowatchUser"));
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}

export default RequireRole;