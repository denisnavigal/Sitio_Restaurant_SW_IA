import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

const dishes = [
  {
    id: 1,
    name: "Tacos al Pastor",
    description: "Tortillas de maíz con carne de cerdo marinada, piña y cilantro",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Enchiladas Verdes",
    description: "Tortillas rellenas de pollo, bañadas en salsa verde con crema y queso",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    rating: 4.8,
  },
];

const ClientDashboard = () => {
  const handleRating = (dishId: number, isPositive: boolean) => {
    toast.success(
      `¡Gracias por tu ${isPositive ? "calificación positiva" : "feedback"}! Tu opinión nos ayuda a mejorar.`
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-primary">¡Bienvenido a Sabores Mexicanos!</h2>
      <p className="text-lg text-gray-600">Califica nuestros platillos y ayúdanos a mejorar</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {dishes.map((dish) => (
          <Card key={dish.id} className="overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {dish.name}
                <span className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  {dish.rating}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{dish.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleRating(dish.id, true)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Me gusta
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleRating(dish.id, false)}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  No me gusta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;