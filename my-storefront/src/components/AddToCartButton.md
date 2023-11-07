Component: `AddToCartButton`

### What it is:
`AddToCartButton` is a functional React component that provides a button for adding products to a shopping cart.

### How to use it:

1. **Import the component** in the file where you want to use the button:
   ```tsx
   import AddToCartButton from './components/AddToCartButton';
   ```

2. **Use the `<AddToCartButton>` component** by passing the `merchantId` and `product` as props to it:
   ```tsx
   <AddToCartButton merchantId={123} product={productData} />
   ```

### Props:

- `merchantId`: A number representing the ID of the merchant whose product is being added to the cart.
- `product`: The `Product` object containing details about the product to add to the cart.

### Behavior:

- The button uses the `useCart` hook to access the `addToCart` function from the `CartContext`.
- When clicked, the button calls `addToCart` with the provided `merchantId` and `product`, which should add the product to the cart.

### Notes:

- Ensure that the `CartProvider` from `CartContext` is included up in your component hierarchy so that `useCart` can properly access the context.
- The component assumes that `addToCart` function will handle any logic required to update the cart state, such as incrementing the quantity if the product is already in the cart.
