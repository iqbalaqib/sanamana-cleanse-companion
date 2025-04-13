
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import StatusCard from '../components/dashboard/StatusCard';
import QuickLogCard from '../components/dashboard/QuickLogCard';
import StatsCard from '../components/dashboard/StatsCard';
import { toast } from 'sonner';

interface UserData {
  name: string;
  age: number;
  height: number;
  currentWeight: number;
  waistMeasurement: number;
  goalWeight: number;
  phase: 'detox' | 'stabilization';
  startDate: string;
  logs: {
    date: string;
    weight: number;
    waist: number;
  }[];
}

const HomePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('sanamana-user-data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  const handlePhaseChange = () => {
    if (userData) {
      const newPhase = userData.phase === 'detox' ? 'stabilization' : 'detox';
      const updatedUserData = { ...userData, phase: newPhase };
      setUserData(updatedUserData);
      localStorage.setItem('sanamana-user-data', JSON.stringify(updatedUserData));
      toast.success(`Switched to ${newPhase === 'detox' ? 'Detox' : 'Stabilization'} Phase`);
    }
  };
  
  const handleLogSubmit = (weight: number, waist: number) => {
    if (userData) {
      const today = new Date().toISOString().split('T')[0];
      const logExists = userData.logs.findIndex(log => log.date.startsWith(today));
      
      let updatedLogs;
      
      if (logExists >= 0) {
        updatedLogs = [...userData.logs];
        updatedLogs[logExists] = {
          date: new Date().toISOString(),
          weight,
          waist
        };
      } else {
        updatedLogs = [
          ...userData.logs,
          {
            date: new Date().toISOString(),
            weight,
            waist
          }
        ];
      }
      
      const updatedUserData = {
        ...userData,
        logs: updatedLogs,
        currentWeight: weight,
        waistMeasurement: waist
      };
      
      setUserData(updatedUserData);
      localStorage.setItem('sanamana-user-data', JSON.stringify(updatedUserData));
    }
  };
  
  const getDayNumber = () => {
    if (!userData) return 1;
    
    const startDate = new Date(userData.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1;
  };
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Logo />
      </div>
    );
  }
  
  const phaseDuration = userData.phase === 'detox' ? 14 : 21;
  const dayNumber = getDayNumber();
  
  return (
    <div className="pb-20">
      <div className="py-6">
        <Logo className="mb-6" />
        <h2 className="text-2xl font-medium mb-1">Welcome back, {userData.name.split(' ')[0]}</h2>
        <p className="text-gray-600">Let's continue your cleanse journey</p>
      </div>
      
      <StatusCard 
        phase={userData.phase}
        currentDayNumber={dayNumber}
        phaseDuration={phaseDuration}
        onPhaseChange={handlePhaseChange}
      />
      
      <QuickLogCard 
        currentWeight={userData.currentWeight}
        currentWaist={userData.waistMeasurement}
        onLogSubmit={handleLogSubmit}
      />
      
      <StatsCard 
        initialWeight={userData.logs[0]?.weight || userData.currentWeight}
        currentWeight={userData.currentWeight}
        initialWaist={userData.logs[0]?.waist || userData.waistMeasurement}
        currentWaist={userData.waistMeasurement}
        goalWeight={userData.goalWeight}
      />
    </div>
  );
};

export default HomePage;
