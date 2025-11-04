import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
}

const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => {
  return (
    <Card className={`p-6 shadow-stat bg-${gradient} text-white border-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-80" />
      </div>
    </Card>
  );
};

export default StatCard;
