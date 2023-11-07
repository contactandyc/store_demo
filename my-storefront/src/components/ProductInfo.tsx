import React from 'react';
import { highlightText } from '../utils/highlightText';
import { ProductInfoProps } from '../interfaces/Interfaces';

const ProductInfo: React.FC<ProductInfoProps> = ({ product, searchTerm }) => (
  <div>
    <h3 className="font-bold">{highlightText(product.name, searchTerm)}</h3>
    <p className="text-sm text-gray-600">{highlightText(product.description, searchTerm)}</p>
    <p className="mt-2 text-lg font-semibold">${Number(product.price).toFixed(2)}</p>
  </div>
);

export default ProductInfo;