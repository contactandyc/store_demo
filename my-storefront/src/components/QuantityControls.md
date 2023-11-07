Component: `QuantityControls`

### What it is:
`QuantityControls` is a React functional component that allows users to adjust the quantity of a product in their shopping cart. It also optionally displays the total price for the current quantity of the item.

### How to use it:

1. **Import the component** in the file where you want to have quantity controls:
   ```tsx
   import QuantityControls from './components/QuantityControls';
   ```

2. **Use the `<QuantityControls>` component** within your JSX, providing the necessary props:
   ```tsx
   <QuantityControls
     merchantId={123}
     product={currentProduct}
     showTotal={true}
   />
   ```

### Props:

- `merchantId`: A number representing the ID of the merchant.
- `product`: An object containing details about the product.
- `showTotal`: (Optional) A boolean that determines whether to show the total price for the quantity. Defaults to `false`.

### Internal Logic:

- Uses the `useCart` hook to interact with the cart context, allowing to add, remove, increment, and decrement product quantities in the cart.
- Finds the cart item corresponding to the product to determine its current quantity in the cart.
- Handles UI changes based on whether the product is in the cart. If so, it shows increment and decrement buttons; if not, it shows an "Add to Cart" button.

### Styling:

- Displays the total price with basic styling when `showTotal` is `true`.
- Uses conditional rendering to switch between "Add to Cart" and quantity adjustment controls.
- The increment and decrement buttons have distinctive red and green backgrounds, respectively.
- The remove button is yellow, providing a visual cue for a different action.
- Buttons have hover states for better user interaction.

### Accessibility:

- Each button has a `focus:ring` class to highlight focus for keyboard-only users, improving accessibility.
- Buttons have `focus:outline-none` to maintain the custom focus ring style.

### User Interaction:

- Clicking the increment (`+`) button will increase the quantity of the item in the cart for the specified merchant.
- Clicking the decrement (`-`) button will decrease the quantity, and possibly remove the item if the quantity reaches zero.
- Clicking the "Remove" button will remove the item from the cart.
- Clicking the "Add to Cart" button will add the item to the cart with a default quantity (usually one).
