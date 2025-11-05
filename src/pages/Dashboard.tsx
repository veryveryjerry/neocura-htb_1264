import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StatCard from "@/components/StatCard";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Dumbbell, Flame, Clock, TrendingUp, LogOut } from "lucide-react";

interface Workout {
  id: string;
  exercise: string;
  duration: number;
  calories: number;
  date: string;
}

interface Profile {
  name: string;
}

const Dashboard = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchProfile();
    fetchWorkouts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
    setLoading(false);
  };

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();
      
      if (data) setProfile(data);
    }
  };

  const fetchWorkouts = async () => {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch workouts",
        variant: "destructive",
      });
    } else {
      setWorkouts(data || []);
    }
  };

  const handleAddWorkout = async (workout: { exercise: string; duration: number; calories: number; date: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingWorkout) {
      const { error } = await supabase
        .from("workouts")
        .update(workout)
        .eq("id", editingWorkout.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update workout",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success! ✅",
          description: "Workout updated successfully",
        });
        setEditingWorkout(null);
        fetchWorkouts();
      }
    } else {
      const { error } = await supabase
        .from("workouts")
        .insert([{ ...workout, user_id: user.id }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add workout",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success! 🎉",
          description: "Workout added successfully",
        });
        fetchWorkouts();
      }
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete workout",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success! 🗑️",
        description: "Workout deleted successfully",
      });
      fetchWorkouts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const avgCalories = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NeoCura Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.name || "User"}! 👋
            </p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Workouts"
            value={totalWorkouts}
            icon={Dumbbell}
            variant="accent"
          />
          <StatCard
            title="Total Calories"
            value={totalCalories}
            icon={Flame}
            variant="energy"
          />
          <StatCard
            title="Total Duration (min)"
            value={totalDuration}
            icon={Clock}
            variant="primary"
          />
          <StatCard
            title="Avg Calories/Workout"
            value={avgCalories}
            icon={TrendingUp}
            variant="success"
          />
        </div>

        {/* Workout Form */}
        <div className="mb-8">
          <WorkoutForm
            onSubmit={handleAddWorkout}
            initialData={editingWorkout}
            onCancel={() => setEditingWorkout(null)}
          />
        </div>

        {/* Workouts List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Workouts 💪</h2>
          <WorkoutList
            workouts={workouts}
            onEdit={setEditingWorkout}
            onDelete={handleDeleteWorkout}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
