import React from 'react';
import { CardSectionProps } from '../interfaces/Interfaces';

const CartCard: React.FC<CardSectionProps> = ({ image, info, action }) => {
  return (
    <div className="bg-white max-w-4xl mx-auto my-4 rounded-lg shadow-lg flex flex-row items-center">
      {image}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {info}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        {action}
      </div>
    </div>
  );
};

export default CartCard;
