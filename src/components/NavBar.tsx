
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Calendar, UserCircle } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          <NavItem to="/" icon={<Home size={24} />} label="Home" />
          <NavItem to="/progress" icon={<BarChart2 size={24} />} label="Progress" />
          <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" />
          <NavItem to="/profile" icon={<UserCircle size={24} />} label="Profile" />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center p-2 transition-colors ${
          isActive ? 'text-sanamana-green' : 'text-gray-500'
        }`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default NavBar;
