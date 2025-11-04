import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dumbbell, Activity, Heart, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Dumbbell className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            NeoCura
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            Your Health-Tracking Buddy 🏃‍♂️
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Track your fitness journey with ease. Log workouts, monitor calories, 
            and achieve your health goals with NeoCura.
          </p>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate("/auth")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 text-lg px-8"
            >
              Login
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <Activity className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Track Workouts</h3>
            <p className="text-white/80">
              Log your exercises, duration, and calories burned with ease
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <Heart className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Monitor Progress</h3>
            <p className="text-white/80">
              View your fitness stats and track your health journey
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Achieve Goals</h3>
            <p className="text-white/80">
              Stay motivated with real-time insights and analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
