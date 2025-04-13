
import React, { useState, useEffect } from 'react';
import CalendarView from '../components/calendar/CalendarView';

interface UserData {
  logs: {
    date: string;
    weight: number;
    waist: number;
  }[];
}

const CalendarPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('sanamana-user-data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-600">Loading calendar data...</p>
      </div>
    );
  }
  
  return (
    <div className="pb-20">
      <div className="py-6">
        <h1 className="text-2xl font-medium mb-6">Progress Calendar</h1>
        <CalendarView logs={userData.logs} />
      </div>
    </div>
  );
};

export default CalendarPage;
