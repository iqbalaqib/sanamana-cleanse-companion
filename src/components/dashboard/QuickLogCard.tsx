
import React, { useState } from 'react';
import { toast } from 'sonner';

interface QuickLogCardProps {
  currentWeight: number;
  currentWaist: number;
  onLogSubmit: (weight: number, waist: number) => void;
}

const QuickLogCard: React.FC<QuickLogCardProps> = ({ currentWeight, currentWaist, onLogSubmit }) => {
  const [weight, setWeight] = useState(currentWeight);
  const [waist, setWaist] = useState(currentWaist);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogSubmit(weight, waist);
    toast.success('Progress logged successfully!');
  };

  return (
    <div className="sanamana-card mb-5">
      <h3 className="text-lg font-medium mb-4">Log Today's Progress</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              className="sanamana-input"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
              min={30}
              max={300}
              step="0.1"
            />
          </div>
          
          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
              Waist (cm)
            </label>
            <input
              id="waist"
              type="number"
              className="sanamana-input"
              value={waist || ''}
              onChange={(e) => setWaist(Number(e.target.value))}
              required
              min={40}
              max={200}
              step="0.1"
            />
          </div>
          
          <button 
            type="submit"
            className="sanamana-btn sanamana-btn-primary"
          >
            Save Progress
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickLogCard;
