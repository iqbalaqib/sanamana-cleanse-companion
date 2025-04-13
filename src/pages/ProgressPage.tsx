
import React, { useState, useEffect } from 'react';
import ProgressCharts from '../components/progress/ProgressCharts';

interface UserData {
  logs: {
    date: string;
    weight: number;
    waist: number;
  }[];
}

const ProgressPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('sanamana-user-data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  if (!userData || userData.logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-medium mb-2">No Progress Data Yet</h2>
        <p className="text-gray-600 text-center">
          Start logging your daily progress to see your charts here.
        </p>
      </div>
    );
  }
  
  // Sort logs by date
  const sortedLogs = [...userData.logs].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  return (
    <div className="pb-20">
      <div className="py-6">
        <h1 className="text-2xl font-medium mb-6">Your Progress</h1>
        <ProgressCharts data={sortedLogs} />
      </div>
    </div>
  );
};

export default ProgressPage;
