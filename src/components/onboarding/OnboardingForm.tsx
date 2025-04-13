
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '../Logo';

interface UserData {
  name: string;
  age: number;
  height: number;
  currentWeight: number;
  waistMeasurement: number;
  goalWeight: number;
  phase: 'detox' | 'stabilization';
}

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 0,
    height: 0,
    currentWeight: 0,
    waistMeasurement: 0,
    goalWeight: 0,
    phase: 'detox',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === 'name' ? value : Number(value),
    });
  };

  const handlePhaseChange = (phase: 'detox' | 'stabilization') => {
    setUserData({
      ...userData,
      phase,
    });
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to localStorage
    localStorage.setItem('sanamana-user-data', JSON.stringify({
      ...userData,
      startDate: new Date().toISOString(),
      logs: [
        {
          date: new Date().toISOString(),
          weight: userData.currentWeight,
          waist: userData.waistMeasurement
        }
      ]
    }));
    
    toast.success('Profile created successfully!');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <Logo className="mb-8" />
      
      <div className="sanamana-card w-full max-w-md mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">
            {step === 1 && 'Personal Details'}
            {step === 2 && 'Body Measurements'}
            {step === 3 && 'Select Your Phase'}
          </h2>
          <span className="text-sm text-gray-500">Step {step}/3</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="sanamana-input"
                  value={userData.name}
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
                  value={userData.age || ''}
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
                  value={userData.height || ''}
                  onChange={handleChange}
                  required
                  min={100}
                  max={250}
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  className="sanamana-btn sanamana-btn-primary w-full"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Weight (kg)
                </label>
                <input
                  id="currentWeight"
                  name="currentWeight"
                  type="number"
                  className="sanamana-input"
                  value={userData.currentWeight || ''}
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
                  value={userData.waistMeasurement || ''}
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
                  value={userData.goalWeight || ''}
                  onChange={handleChange}
                  required
                  min={30}
                  max={200}
                  step="0.1"
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="sanamana-btn bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="sanamana-btn sanamana-btn-primary"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <p className="text-gray-600">
                Choose which phase of the Sanamana cleanse you're currently in:
              </p>
              
              <div className="space-y-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    userData.phase === 'detox' 
                      ? 'border-sanamana-green bg-sanamana-green-light/30' 
                      : 'border-gray-200 hover:border-sanamana-green/30'
                  }`}
                  onClick={() => handlePhaseChange('detox')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      userData.phase === 'detox' ? 'border-sanamana-green' : 'border-gray-300'
                    }`}>
                      {userData.phase === 'detox' && (
                        <div className="w-3 h-3 bg-sanamana-green rounded-full"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-medium ml-3">Detox Phase</h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 pl-8">
                    The initial phase focusing on cleansing your liver with our signature shake.
                  </p>
                </div>
                
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    userData.phase === 'stabilization' 
                      ? 'border-sanamana-green bg-sanamana-green-light/30' 
                      : 'border-gray-200 hover:border-sanamana-green/30'
                  }`}
                  onClick={() => handlePhaseChange('stabilization')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      userData.phase === 'stabilization' ? 'border-sanamana-green' : 'border-gray-300'
                    }`}>
                      {userData.phase === 'stabilization' && (
                        <div className="w-3 h-3 bg-sanamana-green rounded-full"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-medium ml-3">Stabilization Phase</h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 pl-8">
                    The follow-up phase that consolidates your results and prepares you for long-term success.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="sanamana-btn bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="sanamana-btn sanamana-btn-primary"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
