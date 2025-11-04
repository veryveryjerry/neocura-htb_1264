import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Workout {
  id: string;
  exercise: string;
  duration: number;
  calories: number;
  date: string;
}

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const WorkoutList = ({ workouts, onEdit, onDelete }: WorkoutListProps) => {
  if (workouts.length === 0) {
    return (
      <Card className="p-8 text-center shadow-card">
        <p className="text-muted-foreground">No workouts yet. Add your first workout to get started! 💪</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {workouts.map((workout) => (
        <Card key={workout.id} className="p-4 shadow-card hover:shadow-stat transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{workout.exercise}</h4>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <span>🕐 {workout.duration} min</span>
                <span>🔥 {workout.calories} cal</span>
                <span>📅 {new Date(workout.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(workout)}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(workout.id)}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WorkoutList;
