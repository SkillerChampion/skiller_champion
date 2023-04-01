import React from 'react';

const GrayCard = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-900 py-6 px-6 rounded-xl border-2 border-indigo-600">
      {children}
    </div>
  );
};

export default GrayCard;
