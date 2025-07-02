import React from 'react';
import { Car } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Car className="h-8 w-8 text-gold-500" />
      <span className="text-white text-xl font-bold">LuxDrive</span>
    </div>
  );
};

export default Logo;