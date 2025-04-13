
import React from 'react';
import { TrendingDown } from 'lucide-react';

interface StatsCardProps {
  initialWeight: number;
  currentWeight: number;
  initialWaist: number;
  currentWaist: number;
  goalWeight: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  initialWeight,
  currentWeight,
  initialWaist,
  currentWaist,
  goalWeight,
}) => {
  const weightLoss = initialWeight - currentWeight;
  const weightLossPercentage = (weightLoss / initialWeight) * 100;
  
  const waistLoss = initialWaist - currentWaist;
  const waistLossPercentage = (waistLoss / initialWaist) * 100;
  
  const goalProgress = Math.min(100, (weightLoss / (initialWeight - goalWeight)) * 100);
  
  return (
    <div className="sanamana-card">
      <h3 className="text-lg font-medium mb-2">Your Progress</h3>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-sanamana-green-light rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Weight Loss</div>
          <div className="flex items-baseline">
            <span className="text-xl font-medium">{weightLoss.toFixed(1)}</span>
            <span className="text-sm ml-1">kg</span>
          </div>
          <div className="flex items-center mt-1 text-sanamana-green text-xs">
            <TrendingDown size={14} />
            <span className="ml-1">{weightLossPercentage.toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="bg-sanamana-peach rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Waist Reduction</div>
          <div className="flex items-baseline">
            <span className="text-xl font-medium">{waistLoss.toFixed(1)}</span>
            <span className="text-sm ml-1">cm</span>
          </div>
          <div className="flex items-center mt-1 text-amber-700 text-xs">
            <TrendingDown size={14} />
            <span className="ml-1">{waistLossPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Goal Progress</span>
          <span>{goalProgress.toFixed(0)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sanamana-green"
            style={{ width: `${goalProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{initialWeight.toFixed(1)} kg</span>
          <span>{goalWeight.toFixed(1)} kg</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
