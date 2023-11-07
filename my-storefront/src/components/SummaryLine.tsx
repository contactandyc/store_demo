import React from 'react';

interface SummaryLineProps {
  label?: JSX.Element;
  value?: JSX.Element;
  className?: string;
}

const SummaryLine: React.FC<SummaryLineProps> = ({ label = null, value = null, className = 'py-1' }) => (
  <div className={`flex justify-between ${className}`}>
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

export default SummaryLine;