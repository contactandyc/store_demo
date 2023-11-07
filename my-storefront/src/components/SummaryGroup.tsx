import React from 'react';
import { ChildrenProps } from '../interfaces/Interfaces'

export interface ChildrenProps {
  children: React.ReactNode;
  className?: string;
}

const SummaryGroup: React.FC<ChildrenProps> = ({children, className='max-w-md' }) => (
  <div className={`w-full ${className} mx-auto bg-white p-4 shadow-md`}>
    {children}
  </div>
);

export default SummaryGroup;