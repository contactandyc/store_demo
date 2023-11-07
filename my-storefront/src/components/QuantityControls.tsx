import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../interfaces/Interfaces';

export interface QuantityControlsProps {
  merchantId: number;
  product: Product;
  showTotal?: boolean;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({ merchantId, product, showTotal = false }) => {
  const { addToCart, carts, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  const merchantCart = carts[merchantId] || [];
  const cartItem = merchantCart.find((item) => item.id === product.id);

  return (
    <div>
      {cartItem && cartItem.quantity > 0 ? (
        <div className="flex items-center space-x-2 flex-col">
          {showTotal && (
            <div>Total: ${(cartItem.quantity * Number(product.price)).toFixed(2)}</div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decrementQuantity(merchantId, product.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring"
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              onClick={() => incrementQuantity(merchantId, product.id)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(merchantId, product.id)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => addToCart(merchantId, product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default QuantityControls;
