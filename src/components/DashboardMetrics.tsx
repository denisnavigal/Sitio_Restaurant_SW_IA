import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, DollarSign, ShoppingCart, Users } from "lucide-react";

const metrics = [
  {
    title: "Ventas del Día",
    value: "$1,234",
    icon: DollarSign,
    description: "+20.1% desde ayer",
  },
  {
    title: "Clientes Activos",
    value: "42",
    icon: Users,
    description: "+5 nuevos hoy",
  },
  {
    title: "Inventario Bajo",
    value: "3",
    icon: Database,
    description: "Productos por reabastecer",
  },
  {
    title: "Órdenes Pendientes",
    value: "12",
    icon: ShoppingCart,
    description: "4 en preparación",
  },
];

const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;