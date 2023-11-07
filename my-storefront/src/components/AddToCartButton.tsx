import React from 'react';
import { Product } from '../interfaces/Interfaces';

interface AddToCartButtonProps {
  merchantId: number;
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ merchantId, product }) => {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(merchantId, product)}>
      Add to Cart
    </button>
  );
};
