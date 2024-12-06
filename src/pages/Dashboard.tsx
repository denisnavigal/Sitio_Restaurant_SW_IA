import { useEffect } from "react";
import DashboardMetrics from "@/components/DashboardMetrics";
import ClientDashboard from "@/components/ClientDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect customers trying to access /inventory to dashboard
    if (userRole === "client" && window.location.pathname === "/inventory") {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  if (userRole === "client") {
    return <ClientDashboard />;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
      </div>
      <DashboardMetrics />
    </div>
  );
};

export default Dashboard;