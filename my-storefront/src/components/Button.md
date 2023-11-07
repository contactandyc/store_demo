Component: `Button`

### What it is:
This is a reusable button component written in TypeScript for a React application. It allows for customization through props.

### How to use it:

1. **Import the component** in the file where you want to use it:
   ```tsx
   import Button from './components/Button';
   ```

2. **Use the `<Button>` component** in your JSX by specifying any required props:
   ```tsx
   <Button onClick={handleClick} type="submit">
     Click Me
   </Button>
   ```

### Props:

- `onClick`: A function that will be called when the button is clicked (optional).
- `children`: The content to be displayed inside the button, usually text or icons.
- `className`: Additional CSS classes to apply for custom styling (optional).
- `type`: The type of button (`"button"`, `"submit"`, or `"reset"`). Defaults to `"button"`.

### Styling:
The button has default styling for background color, text color, padding, border, border-radius, and shadow. It changes background color on hover. These styles can be overridden or extended by providing a `className` prop.
