import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedRoute = () => {
  const isAuthentication = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();
  if (isAuthentication) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default UnAuthenticatedRoute;
