import React, { ReactNode } from 'react';

type BoxProps = {
  children: ReactNode;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={`relative border border-gray-300 rounded-lg p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Box;
