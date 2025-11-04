import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface WorkoutFormProps {
  onSubmit: (workout: { exercise: string; duration: number; calories: number; date: string }) => void;
  initialData?: { id: string; exercise: string; duration: number; calories: number; date: string } | null;
  onCancel?: () => void;
}

const WorkoutForm = ({ onSubmit, initialData, onCancel }: WorkoutFormProps) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setExercise(initialData.exercise);
      setDuration(initialData.duration.toString());
      setCalories(initialData.calories.toString());
      setDate(initialData.date);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      exercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date,
    });
    if (!initialData) {
      setExercise("");
      setDuration("");
      setCalories("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "✏️ Edit Workout" : "➕ Add New Workout"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="exercise">Exercise</Label>
            <Input
              id="exercise"
              type="text"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
              placeholder="Running, Yoga, Cycling..."
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes) 🕐</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="1"
              placeholder="30"
            />
          </div>

          <div>
            <Label htmlFor="calories">Calories 🔥</Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              min="1"
              placeholder="200"
            />
          </div>

          <div>
            <Label htmlFor="date">Date 📅</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="bg-gradient-primary">
            {initialData ? "Update Workout" : "Add Workout"}
          </Button>
          {initialData && onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default WorkoutForm;
