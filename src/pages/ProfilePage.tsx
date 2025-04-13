
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProfileForm from '../components/profile/ProfileForm';
import { LogOut } from 'lucide-react';

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

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = localStorage.getItem('sanamana-user-data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  const handleProfileUpdate = (updatedData: any) => {
    if (userData) {
      const newUserData = {
        ...userData,
        ...updatedData
      };
      
      setUserData(newUserData);
      localStorage.setItem('sanamana-user-data', JSON.stringify(newUserData));
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('sanamana-user');
    toast.success('You have been logged out');
    navigate('/login');
  };
  
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-600">Loading profile data...</p>
      </div>
    );
  }
  
  return (
    <div className="pb-20">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Your Profile</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-500"
          >
            <LogOut size={18} />
            <span className="ml-1 text-sm">Logout</span>
          </button>
        </div>
        
        <ProfileForm userData={userData} onUpdate={handleProfileUpdate} />
      </div>
    </div>
  );
};

export default ProfilePage;
