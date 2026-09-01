import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../lib/adminAuth";
import { ReactNode } from "react";

export default function AdminRouteGuard({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
