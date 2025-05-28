import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Provider/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth() ?? { user: null, loading: false };

  if (loading) return <LoadingSpinner />;
  if (user?.role === "admin") return <>{children}</>;
  setTimeout(()=>{
    return!loading && <Navigate to="/login" state={{ from: location }} replace />
  },1500)
};

export default AdminRoute;
