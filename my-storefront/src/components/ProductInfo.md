Component: `ProductInfo`

### What it is:
`ProductInfo` is a React functional component that displays information about a product, including its name, description, and price. It uses a utility function `highlightText` to highlight the occurrences of a `searchTerm` within the name and description.

### How to use it:

1. **Import the component** where you want to display the product information:
   ```tsx
   import ProductInfo from './components/ProductInfo';
   ```

2. **Use the `<ProductInfo>` component** within your JSX, providing a `product` object and an optional `searchTerm`:
   ```tsx
   <ProductInfo product={yourProductObject} searchTerm="searchText" />
   ```

### Props:

- `product`: An object containing the product's details like `name`, `description`, and `price`.
- `searchTerm`: A string that, if present, will be highlighted in the product's name and description.

### Internal Logic:

- Uses the `highlightText` function to wrap the `searchTerm` found in `product.name` and `product.description` with highlighted markup.

### Styling:

- The `name` is styled with `font-bold` to make it stand out as the product title.
- The `description` uses `text-sm` and `text-gray-600` for a subtler, smaller styled text.
- The `price` is styled with `mt-2`, `text-lg`, and `font-semibold` to emphasize the product's cost.

### Accessibility:

- The component uses semantic HTML elements like `<h3>` for the product name, which can aid in accessibility, but it doesn't include any specific ARIA attributes.
- Care should be taken to ensure that the `highlightText` utility function does not disrupt screen reader interpretation of the text.

### User Interaction:

- `ProductInfo` is primarily a display component with no inherent user interaction handlers.

### Rendering:

- Renders a `<div>` container with three child elements: a `<h3>` for the product name, a `<p>` for the description, and another `<p>` for the price, each potentially containing highlighted text if there is a `searchTerm` match.
