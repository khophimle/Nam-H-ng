
import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="container mx-auto mb-6 text-center lg:text-left">
      <div className="inline-flex items-center space-x-3">
        <CameraIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl font-bold text-white">Xưởng In Ảnh Giá Rẻ Suri Lab Yên Bái</h1>
      </div>
    </header>
  );
};
