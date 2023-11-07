Component: `SummaryLine`

### What it is:
`SummaryLine` is a React functional component that renders a single line of a summary, typically used to display a label and its corresponding value.

### How to use it:

1. **Import the component** in the file where you want to use the summary line:
   ```tsx
   import SummaryLine from './components/SummaryLine';
   ```

2. **Use the `<SummaryLine>` component** in your JSX, providing optional `label`, `value`, and `className` props:
   ```tsx
   <SummaryLine
     label={<span>Total</span>}
     value={<span>$100</span>}
     className="my-custom-class"
   />
   ```

### Props:

- `label`: A `JSX.Element` that will be rendered on the left side of the line. It can be text, a component, or any JSX (optional).
- `value`: A `JSX.Element` that will be rendered on the right side of the line, opposite the label (optional).
- `className`: Additional CSS classes to apply to the container for custom styling (optional, default is `'py-1'` which applies vertical padding).

### Styling:

- The component uses a `flex` container to place the `label` and `value` on opposite ends of the line.
- Default styling includes a `py-1` padding class, which can be overridden or extended by providing a `className` prop.
