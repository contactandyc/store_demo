To use Tailwind CSS with your `ProductCard` component in a Next.js project, you'll first need to ensure that Tailwind CSS is installed and configured in your project. Once you have Tailwind set up, you can apply utility classes to your JSX elements to style them accordingly.

Here is an example of how you could update your `ProductCard` component to use Tailwind CSS for styling:

```tsx
import React from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  // Find the item in the cart (if it exists)
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
      <img 
        src={`/images/${product.image}.jpg`} 
        alt={product.title} 
        className="w-56 h-56 object-cover object-center rounded-lg"
      />
      <h3 className="mt-2 font-bold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 text-lg font-semibold">${Number(product.price).toFixed(2)}</p>
      <div className="mt-4">
        {cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => decrementQuantity(product.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring"
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button 
              onClick={() => incrementQuantity(product.id)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring"
            >
              +
            </button>
            <button 
              onClick={() => removeFromCart(product.id)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring"
            >
              Remove
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
```

In the example above:

- `rounded-lg` gives the element rounded corners.
- `shadow-lg` applies a large drop shadow.
- `p-4` applies padding around the content inside the `div`.
- `flex flex-col items-center` creates a flex container, with a vertical column direction, and centers items along the cross axis.
- The `object-cover` and `object-center` classes are used to control how the image is resized and positioned.
- The `mt-`, `text-`, `bg-`, `px-`, `py-`, and `hover:bg-` classes are utilities to control margins, text formatting, background colors, padding, and hover states respectively.

The classes used for the buttons provide them with background colors, padding, rounded corners, and hover effects.

Make sure you've included the Tailwind CSS file in your project to apply these styles. If you're setting up Tailwind CSS for the first time, follow the [installation guide](https://tailwindcss.com/docs/guides/nextjs) on the official Tailwind CSS documentation.
