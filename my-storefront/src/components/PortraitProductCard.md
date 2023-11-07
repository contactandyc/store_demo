Component: `PortraitProductCard`

### What it is:
A React functional component that assembles a `PortraitCard` containing an image, info, and action sections for a given product.

### How to use it:

1. **Import the component** where you want to display a product card in portrait layout:
   ```tsx
   import PortraitProductCard from './components/PortraitProductCard';
   ```

2. **Place the `<PortraitProductCard>` component** in your component tree, providing the necessary props:
   ```tsx
   <PortraitProductCard
     merchantId={123} // the ID of the merchant/vendor
     product={productData} // the product data object
     searchTerm="apple" // optional, used for highlighting text
   />
   ```

### Props:
- `merchantId`: The identifier for the merchant to which the product belongs.
- `product`: The product data, including details such as name, description, price, etc.
- `searchTerm`: Optional. A string to be highlighted in the product information, if present.

### Internal Logic:
- Uses child components (`ProductImage`, `ProductInfo`, `QuantityControls`) to render different parts of the product card.
- The `searchTerm` is passed to `ProductInfo` to optionally highlight matching text.

### Styling:
- Relies on the styling of `PortraitCard` and child components.
- Add styles for `PortraitCard` to ensure it displays correctly.

### Accessibility:
- Ensure child components are accessible (e.g., images have alt text, buttons are focusable).

### User Interaction:
- The `QuantityControls` provides interaction to change product quantity in the cart.

### Rendering:
- The component renders a `PortraitCard` with a product image, information, and quantity controls.
- If `searchTerm` is provided, matching text in the product's name and description is highlighted.
- The `showTotal` prop for `QuantityControls` is set to `false`, meaning it will not show the total price next to quantity buttons.
