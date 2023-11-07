Component: `SummaryGroup`

### What it is:
`SummaryGroup` is a React functional component that acts as a container for a group of related summary lines or elements, typically used in displaying a summary or total section in a checkout or details page.

### How to use it:

1. **Import the component** in the file where you want to group summary lines:
   ```tsx
   import SummaryGroup from './components/SummaryGroup';
   ```

2. **Use the `<SummaryGroup>` component** to wrap multiple `SummaryLine` components or any other elements you want to include in the group:
   ```tsx
   <SummaryGroup className="custom-class">
     {/* Child components or elements go here */}
   </SummaryGroup>
   ```

### Props:

- `children`: `React.ReactNode` representing the content within the `SummaryGroup`.
- `className`: A string for additional CSS classes to apply to the container for custom styling (optional, default is `'max-w-md'` which sets the maximum width).

### Styling:

- By default, the component has a set of styling applied: `w-full` for full width, a default `max-width` of `md` size which can be overridden by the `className` prop, `mx-auto` to center it within its parent, `bg-white` for a white background, `p-4` for padding, and `shadow-md` for a medium box shadow.
