import React from 'react';
import { Product } from '../interfaces/Interfaces';
import ImageFromSprite from './ImageFromSprite';

interface ProductImageProps {
  product: Product;
  scale?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, scale = 0.6 }) =>
    <ImageFromSprite src={`/images/${product.image}.png`} position={product.image_id} scale={scale} />

export default ProductImage;