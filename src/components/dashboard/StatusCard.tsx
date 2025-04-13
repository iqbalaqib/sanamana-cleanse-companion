
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StatusCardProps {
  phase: 'detox' | 'stabilization';
  currentDayNumber: number;
  phaseDuration: number;
  onPhaseChange: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  phase,
  currentDayNumber,
  phaseDuration,
  onPhaseChange,
}) => {
  const progress = (currentDayNumber / phaseDuration) * 100;
  
  return (
    <div className="sanamana-card mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className={`sanamana-progress-pill ${
          phase === 'detox' 
            ? 'bg-sanamana-green-light text-sanamana-green' 
            : 'bg-sanamana-peach text-amber-700'
        }`}>
          {phase === 'detox' ? 'Detox Phase' : 'Stabilization Phase'}
        </span>
        <button 
          onClick={onPhaseChange}
          className="text-sm text-sanamana-green font-medium flex items-center"
        >
          Switch Phase
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      <h3 className="text-xl font-medium mt-3">Day {currentDayNumber}</h3>
      
      <div className="mt-3 mb-1">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${phase === 'detox' ? 'bg-sanamana-green' : 'bg-amber-400'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Day 1</span>
        <span>Day {phaseDuration}</span>
      </div>
    </div>
  );
};

export default StatusCard;
