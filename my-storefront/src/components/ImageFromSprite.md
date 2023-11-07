Component: `ImageFromSprite`

### What it is:
`ImageFromSprite` is a React functional component that renders an image segment from a sprite sheet.

### How to use it:

1. **Import the component** where you want to display an image from a sprite:
   ```tsx
   import ImageFromSprite from './components/ImageFromSprite';
   ```

2. **Use the `<ImageFromSprite>` component** within your JSX:
   ```tsx
   <ImageFromSprite
     src="path_to_sprite_sheet.png"
     position={0}
     scale={2}
   />
   ```

### Props:

- `src`: The URL or path to the sprite sheet image.
- `position`: The index of the image segment in the sprite sheet.
- `scale`: An optional scaling factor for the image size.

### Internal Logic:

- Defines the original size of each image segment within the sprite.
- Scales the segment size and calculates its background position.
- Positions array dictates the background positions for different segments.
- Inline styles are used to set the width, height, background image URL, and position of the segment.

### Styling:

- Styling is dynamically generated using inline CSS based on the `scale` and `position` props.
- The background size is set to fit the entire sprite sheet, while the background position targets the specific image segment.

### Accessibility:

- This component creates a visual element without any semantic HTML or ARIA attributes, which might not be accessible to screen readers. Consider adding `role` and `aria-label` if the context requires it.

### User Interaction:

- This component does not inherently handle user interactions. If interaction is needed (like clicking on the image), additional props and logic would be required.

### Rendering:

- A `div` element is returned with the inline style defining the segment of the sprite to display based on the provided `position` and `scale`.
