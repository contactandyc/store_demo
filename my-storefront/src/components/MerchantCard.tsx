import Link from 'next/link';
import React from 'react';
import ImageFromSprite from './ImageFromSprite';

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

const MerchantCard: React.FC<{ merchant: Merchant }> = ({ merchant }) => {
  return (
    <Link href={`/merchants/${merchant.id}`} passHref>
      <div className="flex flex-col p-4 border-b hover:bg-gray-100">
        <h2 className="text-lg font-bold">{merchant.name}</h2>
        <div className="flex overflow-x-auto space-x-4 mt-3" style={{ scrollbarWidth: 'thin' }}> {/* Make images horizontally scrollable */}
          {merchant.products?.length ? (
            merchant.products.map((product, index) => (
              <div key={index} className="min-w-max"> {/* Ensure the div wraps the image without shrinking */}
                <ImageFromSprite
                  src={'/images/' + product.image + '.png'}
                  scale={0.15}
                  position={product.image_id}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MerchantCard;
