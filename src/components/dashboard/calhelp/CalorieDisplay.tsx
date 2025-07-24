import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalorieDisplayProps {
  foodName: string;
  calories: number;
}

export default function CalorieDisplay({
  foodName,
  calories,
}: CalorieDisplayProps) {
  if (!foodName || calories === 0) {
    return (
      <Card className="w-full max-w-3xl mt-4">
        <CardHeader>
          <CardTitle>Calorie Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="">No food entry found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>Calorie Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          <span className="font-semibold">{foodName}:</span> {calories} calories
        </p>
      </CardContent>
    </Card>
  );
}
