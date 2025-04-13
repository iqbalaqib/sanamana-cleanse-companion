
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="sanamana-container bg-sanamana-offwhite">
      <Toaster position="top-center" />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Layout;
