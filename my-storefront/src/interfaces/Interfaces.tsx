import React from 'react';

export interface Product {
  id: number;
  image: string;
  image_id: number;
  name: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  carts: { [merchantId: string]: CartItem[] };
  addToCart: (merchantId: string, product: Product) => void;
  removeFromCart: (merchantId: string, productId: string) => void;
  incrementQuantity: (merchantId: string, productId: string) => void;
  decrementQuantity: (merchantId: string, productId: string) => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface CardSectionProps {
  image: JSX.Element;
  info: JSX.Element;
  action: JSX.Element;
}

export interface AddToCartButtonProps {
  merchantId: number;
  product: Product;
}

export interface ProductInfoProps {
  product: Product;
  searchTerm: string;
}

interface AddressFormState {
  firstName: string;
  lastName: string;
  streetAddress: string;
  zipCode: string;
  cityState: string;
}

interface FileContents {
  file: File;
  contents: string;
}
