import React, { useMemo } from 'react';
import SearchBox from './SearchBox';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Confirm the correct path

const ShoppingCartIcon: React.FC<{}> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

interface HeaderProps {
  merchantId: number;
  merchantName: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ merchantId, merchantName, setSearchTerm }) => {
  const { carts } = useCart();

  const merchantCart = carts[merchantId] || [];

  // useMemo will ensure these values are only recalculated when merchantCart changes
  const { itemCount, totalAmount } = useMemo(() => {
    const itemCount = merchantCart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = merchantCart.reduce((total, item) => total + item.quantity * item.price, 0);
    return { itemCount, totalAmount };
  }, [merchantCart]);


  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center border-b">
      {/* Link to Home */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center text-4xl font-bold hover:text-gray-600">
            <span>&lt; </span> {/* Less than symbol with a large font size */}
        </Link>
        <h1 className="text-xl font-bold">{merchantName}</h1>
      </div>

      <SearchBox setSearchTerm={setSearchTerm} />
      {/* Cart Link with totals */}
      <div className="flex items-center">
        <Link href={`/cart/${merchantId}`} className="flex items-center hover:text-gray-600">
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            <span>Cart ({itemCount} items - ${totalAmount.toFixed(2)})</span>
        </Link>
      </div>

    </header>
  );
};

export default Header;

/*

import React, { useMemo } from 'react';
import SearchBox from './SearchBox';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Confirm the correct path

const ShoppingCartIcon: React.FC<{}> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

interface HeaderProps {
  merchantId: number; // Assuming you need to track header per merchant
  merchantName: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ merchantId, merchantName, setSearchTerm }) => {
  const { carts } = useCart();

  const merchantCart = carts[merchantId] || [];

  // useMemo will ensure these values are only recalculated when merchantCart changes
  const { itemCount, totalAmount } = useMemo(() => {
    const itemCount = merchantCart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = merchantCart.reduce((total, item) => total + item.quantity * item.price, 0);
    return { itemCount, totalAmount };
  }, [merchantCart]);

  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">{merchantName}</h1>
      <SearchBox setSearchTerm={setSearchTerm} />
      <div className="flex items-center">
        <Link href={`/cart/${merchantId}`} className="flex items-center hover:text-gray-600">
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            <span>Cart ({itemCount} items - ${totalAmount.toFixed(2)})</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import SearchBox from './SearchBox';
import Link from 'next/link';
// import { ShoppingCartIcon } from '@heroicons/react/outline'; // Ensure you have @heroicons/react installed

const ShoppingCartIcon: React.FC<{}> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

interface HeaderProps {
  merchantName: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ merchantName, setSearchTerm }) => (
  <header className="bg-white py-4 px-8 flex justify-between items-center border-b">
    <h1 className="text-xl font-bold">{merchantName}</h1>
    <SearchBox setSearchTerm={setSearchTerm} />
    <div className="flex items-center">
      <Link href="/cart" passHref className="flex items-center hover:text-gray-600">
        <ShoppingCartIcon className="h-6 w-6 mr-2" />
        <span>Cart</span>
      </Link>
    </div>
  </header>
);

export default Header;

*/