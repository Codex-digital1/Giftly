import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Provider/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, isSpinLoading } = useAuth() ?? {};
  const location = useLocation();

  if (isSpinLoading) {
    return <LoadingSpinner smallHeight={false} card={false} large={true} />;
  }
   if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
