import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Provider/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isSpinLoading } = useAuth() ?? {};
  const location = useLocation();
  
  if (isSpinLoading) return <LoadingSpinner />;
   if (user?.role === "admin") {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
