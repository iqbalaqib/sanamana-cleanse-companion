
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ProfileFormProps {
  userData: {
    name: string;
    age: number;
    height: number;
    currentWeight: number;
    waistMeasurement: number;
    goalWeight: number;
    phase: 'detox' | 'stabilization';
  };
  onUpdate: (userData: any) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    age: userData.age,
    height: userData.height,
    currentWeight: userData.currentWeight,
    waistMeasurement: userData.waistMeasurement,
    goalWeight: userData.goalWeight,
    phase: userData.phase,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    toast.success('Profile updated successfully!');
  };

  const handlePhaseChange = (phase: 'detox' | 'stabilization') => {
    setFormData({
      ...formData,
      phase,
    });
  };

  return (
    <div className="sanamana-card">
      <h2 className="text-xl font-medium mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="sanamana-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            className="sanamana-input"
            value={formData.age || ''}
            onChange={handleChange}
            required
            min={18}
            max={100}
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            id="height"
            name="height"
            type="number"
            className="sanamana-input"
            value={formData.height || ''}
            onChange={handleChange}
            required
            min={100}
            max={250}
          />
        </div>
        
        <div>
          <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 mb-1">
            Current Weight (kg)
          </label>
          <input
            id="currentWeight"
            name="currentWeight"
            type="number"
            className="sanamana-input"
            value={formData.currentWeight || ''}
            onChange={handleChange}
            required
            min={30}
            max={300}
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="waistMeasurement" className="block text-sm font-medium text-gray-700 mb-1">
            Waist Measurement (cm)
          </label>
          <input
            id="waistMeasurement"
            name="waistMeasurement"
            type="number"
            className="sanamana-input"
            value={formData.waistMeasurement || ''}
            onChange={handleChange}
            required
            min={40}
            max={200}
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="goalWeight" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Weight (kg)
          </label>
          <input
            id="goalWeight"
            name="goalWeight"
            type="number"
            className="sanamana-input"
            value={formData.goalWeight || ''}
            onChange={handleChange}
            required
            min={30}
            max={200}
            step="0.1"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Phase
          </label>
          <div className="space-y-2">
            <div 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                formData.phase === 'detox' 
                  ? 'border-sanamana-green bg-sanamana-green-light/30' 
                  : 'border-gray-200 hover:border-sanamana-green/30'
              }`}
              onClick={() => handlePhaseChange('detox')}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.phase === 'detox' ? 'border-sanamana-green' : 'border-gray-300'
                }`}>
                  {formData.phase === 'detox' && (
                    <div className="w-2 h-2 bg-sanamana-green rounded-full"></div>
                  )}
                </div>
                <h3 className="text-sm font-medium ml-2">Detox Phase</h3>
              </div>
            </div>
            
            <div 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                formData.phase === 'stabilization' 
                  ? 'border-sanamana-green bg-sanamana-green-light/30' 
                  : 'border-gray-200 hover:border-sanamana-green/30'
              }`}
              onClick={() => handlePhaseChange('stabilization')}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.phase === 'stabilization' ? 'border-sanamana-green' : 'border-gray-300'
                }`}>
                  {formData.phase === 'stabilization' && (
                    <div className="w-2 h-2 bg-sanamana-green rounded-full"></div>
                  )}
                </div>
                <h3 className="text-sm font-medium ml-2">Stabilization Phase</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="sanamana-btn sanamana-btn-primary w-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
