import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Database,
  Home,
  LogOut,
  Menu as MenuIcon,
  ShoppingCart,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const getMenuItems = (userRole: string | null) => {
  const baseItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart, label: "Reportes", path: "/reports" },
    { icon: ShoppingCart, label: "Menú", path: "/menu" },
  ];

  if (userRole !== "client") {
    baseItems.splice(1, 0, { icon: Database, label: "Inventario", path: "/inventory" });
  }

  return baseItems;
};

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const menuItems = getMenuItems(userRole);

  const NavContent = () => (
    <>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Restaurante App</h2>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 z-50">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <NavContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <NavContent />
      </div>
    </div>
  );
};

export default Sidebar;