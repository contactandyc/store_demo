Context: `CartContext`

### What it is:
`CartContext` is a React context designed to handle shopping cart functionality within an application. It includes a provider component (`CartProvider`) that wraps the application or a part of it to provide access to cart-related state and functions.

### How to use it:

1. **Wrap your component hierarchy** with `CartProvider` to provide cart state to all components:
   ```tsx
   import { CartProvider } from './context/CartContext';
   
   function App() {
     return (
       <CartProvider>
         {/* rest of your app */}
       </CartProvider>
     );
   }
   ```

2. **Access cart state and functions** in any component using the `useCart` hook:
   ```tsx
   const { carts, addToCart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
   ```

### Core Functionality:

- **State Management**: Manages a state of `carts`, which is an object mapping merchant IDs to an array of `CartItem` objects (products and their quantities).
- **Persistent State**: Loads and saves the cart state to cookies to persist between sessions using `Cookies` from `js-cookie`.
- **Add to Cart**: Adds items to the cart or increments quantity if the item already exists.
- **Remove from Cart**: Removes items from the cart.
- **Increment/Decrement Quantity**: Manages the quantity of individual cart items.

### Cart Operations:

- `addToCart(merchantId: string, product: Product)`: Adds a product to the cart under the specified merchant's ID.
- `removeFromCart(merchantId: string, productId: string)`: Removes a product from the cart.
- `incrementQuantity(merchantId: string, productId: string)`: Increments the quantity of a specific cart item.
- `decrementQuantity(merchantId: string, productId: string)`: Decrements the quantity of a specific cart item.

### Notes:
- This context is a critical part of the shopping cart functionality and should be placed at a high level in your application so that all components that need access to the cart can do so.
- The context assumes that the cart data is specific to each merchant, which allows for a multi-merchant setup within the same application.
- Cookies are used for persistence, ensuring cart data remains across page refreshes or when the browser is closed and reopened, with a default expiry of 7 days.
- The `useEffect` hooks are used to initialize the cart state from cookies on component mount and to save the cart state to cookies whenever it changes.
