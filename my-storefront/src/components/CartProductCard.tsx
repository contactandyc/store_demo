import React from 'react';
import { Product } from '../interfaces/Interfaces';
import CartCard from './CartCard';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import QuantityControls from './QuantityControls';

interface CardProps {
  merchantId: number;
  product: Product;
  searchTerm?: string;
}

const CartProductCard: React.FC<CardProps> = ({ merchantId, product, searchTerm = "" }) => {
  return (
    <CartCard
      image={<ProductImage product={product} scale={0.35} />}
      info={<ProductInfo product={product} searchTerm={searchTerm} />}
      action={<QuantityControls merchantId={merchantId} product={product} showTotal={true} />}
    />
  );
};

export default CartProductCard;

