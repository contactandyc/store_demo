import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { Product, CartContextType, ChildrenProps } from '../interfaces/Interfaces'
import { getCookiesWithPrefix } from '../utils/getCookiesWithPrefix'

interface CartItem extends Product {
  quantity: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext) as CartContextType;

export const CartProvider: React.FC = ({ children }) => {
  // The cart now holds a mapping from merchant IDs to an array of their cart items
  const [carts, setCarts] = useState<{ [merchantId: string]: CartItem[] }>({});

  // Function to save the cart to a cookie
  const saveCartToCookie = (merchantId: string, cart: CartItem[]): void => {
    Cookies.set(`cart_${merchantId}`, JSON.stringify(cart), { expires: 7 }); // Expires in 7 days
  };

  // Function to load the cart from a cookie
  const loadCartFromCookie = (merchantId: string): CartItem[] => {
    const cart = Cookies.get(`cart_${merchantId}`);
    return cart ? JSON.parse(cart) : [];
  };

  useEffect(() => {
     const cookies = getCookiesWithPrefix('cart_');
     for (const cookie of Object.keys(cookies)) {
        const match = cookie.match(/^cart_(\d+)/);
        if (match) {
          const merchantId = match[1];
          const merchantCart = loadCartFromCookie(merchantId);
          if (merchantCart.length > 0) {
            // Update the cart state with the loaded data
            setCarts((prevCarts) => ({
              ...prevCarts,
              [merchantId]: merchantCart,
            }));
          }
        }
     }
  }, []);

  // Add the cart data to cookies when the cart changes
  useEffect(() => {
    // Iterate over each merchantId and save their cart data to cookies
    const merchantIds = Object.keys(carts);
    merchantIds.forEach((merchantId) => {
      const merchantCart = carts[merchantId];
      saveCartToCookie(merchantId, merchantCart);
    });
  }, [carts]);

  // Rest of your cart logic (e.g., addToCart, removeFromCart, incrementQuantity, decrementQuantity) remains the same
  const addToCart = (merchantId: string, product: Product) => {
    setCarts((prevCarts) => {
      const merchantCart = prevCarts[merchantId] || [];
      const itemIndex = merchantCart.findIndex((item) => item.id === product.id);

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        const updatedCart = [...merchantCart];
        updatedCart[itemIndex].quantity += 1;
        return { ...prevCarts, [merchantId]: updatedCart };
      } else {
        // Product does not exist, add new item
        const updatedCart = [...merchantCart, { ...product, quantity: 1 }];
        return { ...prevCarts, [merchantId]: updatedCart };
      }
    });
  };

  const removeFromCart = (merchantId: string, productId: string) => {
    setCarts((prevCarts) => {
      const updatedCart = prevCarts[merchantId].filter((item) => item.id !== productId);
      return { ...prevCarts, [merchantId]: updatedCart };
    });
  };

    const incrementQuantity = (merchantId: string, productId: string) => {
      setCarts((prevCarts) => {
        const merchantCart = prevCarts[merchantId] || [];
        const updatedCart = merchantCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...prevCarts, [merchantId]: updatedCart };
      });
    };

    const decrementQuantity = (merchantId: string, productId: string) => {
      setCarts((prevCarts) => {
        const merchantCart = prevCarts[merchantId] || [];
        const updatedCart = merchantCart.reduce((acc, item) => {
          if (item.id === productId) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        return { ...prevCarts, [merchantId]: updatedCart };
      });
    };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
