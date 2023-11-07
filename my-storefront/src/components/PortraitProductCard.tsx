import React from 'react';
import { Product } from '../interfaces/Interfaces';
import PortraitCard from './PortraitCard';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import QuantityControls from './QuantityControls';

interface CardProps {
  merchantId: number;
  product: Product;
  searchTerm?: string;
}

const PortraitProductCard: React.FC<CardProps> = ({ merchantId, product, searchTerm = "" }) => {
  return (
    <PortraitCard
      image={<ProductImage product={product} scale={0.6} />}
      info={<ProductInfo product={product} searchTerm={searchTerm} />}
      action={<QuantityControls merchantId={merchantId} product={product} showTotal={false} />}
    />
  );
};

export default PortraitProductCard;
