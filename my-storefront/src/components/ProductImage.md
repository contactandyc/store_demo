Component: `ProductImage`

### What it is:
`ProductImage` is a React functional component that renders a product image using the `ImageFromSprite` component to display a specific segment from a sprite sheet based on the product's details.

### How to use it:

1. **Import the component** where you want to display a product image:
   ```tsx
   import ProductImage from './components/ProductImage';
   ```

2. **Use the `<ProductImage>` component** within your JSX, passing the `product` object:
   ```tsx
   <ProductImage product={yourProductObject} />
   ```

### Props:

- `product`: The product object which includes `image` (filename of the sprite) and `image_id` (position in the sprite).
- `scale`: An optional scaling factor for the image size. Default is `0.6`.

### Internal Logic:

- Utilizes the `ImageFromSprite` component to render the product's image.
- Passes down the `src`, `position`, and `scale` props to `ImageFromSprite`.

### Styling:

- The `scale` prop affects the size of the image. It's set by default to `0.6` but can be overridden by passing a different `scale` value when using `ProductImage`.

### Accessibility:

- Since `ProductImage` relies on `ImageFromSprite`, it inherits the same accessibility considerations. There are no intrinsic ARIA or semantic HTML elements used, so additional attributes may be necessary for screen reader accessibility.

### User Interaction:

- `ProductImage` is a presentational component and does not handle user interactions itself.

### Rendering:

- Renders an `ImageFromSprite` component with the `src` set to the path of the product's image file, the `position` to the product's `image_id`, and `scale` to the provided scale prop.
