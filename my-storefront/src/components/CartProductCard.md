Component: `CartProductCard`

### What it is:
`CartProductCard` is a React functional component that composes a shopping cart item card using the `CartCard`, `ProductImage`, `ProductInfo`, and `QuantityControls` components.

### How to use it:

1. **Import the component** in the file where you want to display a cart product card:
   ```tsx
   import CartProductCard from './components/CartProductCard';
   ```

2. **Use the `<CartProductCard>` component** within your JSX, providing the `merchantId`, `product`, and optionally `searchTerm`:
   ```tsx
   <CartProductCard 
     merchantId={123}
     product={yourProductObject}
     searchTerm="searchQuery"
   />
   ```

### Props:

- `merchantId`: A number representing the ID of the merchant associated with the product.
- `product`: The product object containing details to be displayed.
- `searchTerm` (optional): A string used for highlighting matching text within product information.

### Internal Logic:

- The component is primarily a layout wrapper that passes its props down to child components responsible for displaying parts of the product card.
- It does not manage any state or logic itself, serving as a composition of its child components.

### Styling:

- Inherits styling from the `CartCard` component which defines the overall layout and appearance of the card.
- The `ProductImage` component is scaled to `0.35` times its original size to fit the card layout.

### Accessibility:

- No specific accessibility considerations are included in this component, but accessibility should be ensured in the child components (`ProductImage`, `ProductInfo`, `QuantityControls`).

### User Interaction:

- User interactions are handled by the `QuantityControls` component, which allows incrementing, decrementing, and removing products from the cart.

### Rendering:

- Renders a `CartCard` component with `ProductImage`, `ProductInfo`, and `QuantityControls` as child components for the `image`, `info`, and `action` props respectively.
- `ProductInfo` and `QuantityControls` receive additional props (`searchTerm` and `merchantId` with `product`, along with `showTotal` for `QuantityControls` set to `true`).
