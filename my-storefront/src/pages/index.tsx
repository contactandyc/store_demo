import React from 'react';
import MerchantCard from '../components/MerchantCard';

export async function getStaticProps() {
  // Replace the following line with your API call to fetch merchants and top 5 products
  const res = await fetch('http://localhost:3001/api/merchants-with-top-products');
  const data = await res.json();
  return {
    props: {
      merchants: data,
    },
    revalidate: 300, // Regenerate the page at most once every 5 minutes
  };
}

interface ProductDetails {
  name: string;
  image: string;
  image_id: number;
}

interface Merchant {
  id: number;
  name: string;
  products: ProductDetails[];
}

const MerchantsListPage: React.FC<{ merchants: Merchant[] }> = ({ merchants }) => {
  return (
    <div className="container mx-auto p-4">
      {merchants.map((merchant) => (
        <MerchantCard key={merchant.id} merchant={merchant} />
      ))}
    </div>
  );
};

export default MerchantsListPage;
