import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import PortraitProductCard from '../../components/PortraitProductCard';
import { useCart } from '../../context/CartContext';
import { GetServerSideProps } from 'next';
import { Product } from '../../interfaces/Interfaces';

const MerchantPage = ({ products, merchantName, merchantId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Filter products by searchTerm
  const filteredProducts = products.filter((product) => {
    const searchWords = searchTerm.toLowerCase().split(' ');
    return searchWords.every(word =>
      product.name.toLowerCase().includes(word) ||
      product.description.toLowerCase().includes(word)
    );
  });

  return (
    <div>
      <Header merchantId={merchantId} merchantName={merchantName} setSearchTerm={setSearchTerm} />
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <PortraitProductCard key={product.id} merchantId={merchantId} product={product} addToCart={addToCart} searchTerm={searchTerm} />
        ))}
      </div>
    </div>
  );
};


interface MerchantName {
  id: number;
  name: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { merchant_id } = context.params;
  const response = await fetch(`http://localhost:3001/api/products?merchant_id=${merchant_id}`);
  const products = await response.json();
  const response2 = await fetch(`http://localhost:3001/api/merchants/${merchant_id}`);
  const merchant = await response2.json();

  return { props: { products, merchantName: merchant.name, merchantId: merchant.id } };
};

export default MerchantPage;
