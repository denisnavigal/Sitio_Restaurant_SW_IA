import DashboardMetrics from "@/components/DashboardMetrics";
import ClientDashboard from "@/components/ClientDashboard";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole");

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