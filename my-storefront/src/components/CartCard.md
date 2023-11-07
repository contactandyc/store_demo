Component: `CartCard`

### What it is:
`CartCard` is a React functional component that creates a card layout for items typically found in a shopping cart interface.

### How to use it:

1. **Import the component** in the file where you want to use the cart card:
   ```tsx
   import CartCard from './components/CartCard';
   ```

2. **Use the `<CartCard>` component** within your JSX, passing the appropriate components for `image`, `info`, and `action`:
   ```tsx
   <CartCard 
     image={<YourImageComponent />} 
     info={<YourInfoComponent />} 
     action={<YourActionComponent />} 
   />
   ```

### Props:

- `image`: A React node, typically an image representing the cart item.
- `info`: A React node that provides information about the cart item, such as title, description, or price.
- `action`: A React node that includes interactive elements allowing the user to modify the quantity, remove items, or other actions related to the item in the cart.

### Internal Logic:

- The component is stateless and purely presentational.
- It uses the `CardSectionProps` interface from the parent `interfaces` directory to ensure proper structure for the `image`, `info`, and `action` props.

### Styling:

- The card has a white background, maximum width of `4xl`, and is styled with rounded corners and a shadow for a layered appearance.
- The layout is a row flexbox with centered items, dividing the card into sections for the image, information, and actions.

### Accessibility:

- No inherent accessibility features are included. Props like `aria-label` should be used where necessary, particularly for interactive elements within the `action` component.

### User Interaction:

- Interactions are managed through the `action` prop, which should contain buttons or other interactive elements for the user to engage with.

### Rendering:

- Renders a `<div>` with a `flex` row layout containing the `image`, followed by two `<div>` elements for `info` and `action` content, separated by padding and designed to grow to fit the available space within the card.
