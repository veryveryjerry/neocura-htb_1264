import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: "primary" | "success" | "energy" | "accent";
}

const variantStyles = {
  primary: "bg-gradient-to-br from-primary to-secondary text-white border-2 border-primary/20",
  success: "bg-gradient-to-br from-success to-emerald-600 text-white border-2 border-success/20",
  energy: "bg-gradient-to-br from-energy to-orange-600 text-white border-2 border-energy/20",
  accent: "bg-gradient-to-br from-accent to-purple-600 text-white border-2 border-accent/20",
};

const StatCard = ({ title, value, icon: Icon, variant }: StatCardProps) => {
  return (
    <Card className={`p-6 shadow-stat ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/90 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon className="w-12 h-12 text-white/80" />
      </div>
    </Card>
  );
};

export default StatCard;
