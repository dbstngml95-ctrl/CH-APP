import { Navigate } from "react-router-dom";
import { useStudentAuth } from "../lib/auth";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { student, loading } = useStudentAuth();

  if (loading) return null;
  if (!student) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
