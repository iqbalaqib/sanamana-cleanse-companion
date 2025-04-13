
import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-2xl font-semibold text-sanamana-green">
        Sanamana
      </div>
      <div className="text-sm text-gray-500">Cleanse Companion</div>
    </div>
  );
};

export default Logo;
