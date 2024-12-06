import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DishRating {
  id: number;
  dish_name: string;
  avg_rating: number;
  comments: string[];
}

const fetchDishRatings = async (): Promise<DishRating[]> => {
  const { data, error } = await supabase
    .from('dish_ratings')
    .select(`
      id,
      rating,
      comment,
      popular_dishes (
        dish_name
      )
    `)
    .not('comment', 'is', null);

  if (error) throw error;

  // Group and calculate average ratings
  const ratingsMap = data.reduce((acc: { [key: string]: DishRating }, curr) => {
    const dishName = curr.popular_dishes?.dish_name;
    if (!dishName) return acc;

    if (!acc[dishName]) {
      acc[dishName] = {
        id: curr.id,
        dish_name: dishName,
        avg_rating: curr.rating,
        comments: curr.comment ? [curr.comment] : []
      };
    } else {
      acc[dishName].avg_rating = (acc[dishName].avg_rating + curr.rating) / 2;
      if (curr.comment) acc[dishName].comments.push(curr.comment);
    }
    return acc;
  }, {});

  return Object.values(ratingsMap);
};

const ClientDashboard = () => {
  const { data: ratings, isLoading, error } = useQuery({
    queryKey: ['dishRatings'],
    queryFn: fetchDishRatings,
  });

  const handleRating = async (dishId: number, isPositive: boolean) => {
    try {
      const { error } = await supabase
        .from('dish_ratings')
        .insert({
          dish_id: dishId,
          rating: isPositive ? 5 : 1,
        });

      if (error) throw error;
      
      toast.success(
        `¡Gracias por tu ${isPositive ? "calificación positiva" : "feedback"}! Tu opinión nos ayuda a mejorar.`
      );
    } catch (err) {
      toast.error("Hubo un error al enviar tu calificación. Por favor intenta de nuevo.");
    }
  };

  if (isLoading) {
    return <div className="p-8">Cargando calificaciones...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error al cargar las calificaciones</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-primary">¡Bienvenido a Sabores Mexicanos!</h2>
      <p className="text-lg text-gray-600">Calificaciones y comentarios de nuestros platillos</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {ratings?.map((dish) => (
          <Card key={dish.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {dish.dish_name}
                <span className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  {dish.avg_rating.toFixed(1)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Comentarios recientes:</h4>
                {dish.comments.slice(0, 3).map((comment, idx) => (
                  <p key={idx} className="text-sm text-gray-600 italic">"{comment}"</p>
                ))}
              </div>
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