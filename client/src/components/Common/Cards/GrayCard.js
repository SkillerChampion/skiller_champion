import React from 'react';

const GrayCard = ({ children, className }) => {
  return (
    <div
      className={`w-full h-full bg-gray-900 py-6 px-6 rounded-xl border-2 border-indigo-600 ${className}`}>
      {children}
    </div>
  );
};

export default GrayCard;
