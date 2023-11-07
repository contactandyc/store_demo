Component: `ValidatedInput`

### What it is:
`ValidatedInput` is a React component that renders a text input field with built-in validation and error messaging.

### How to use it:

1. **Import the component** in the file where you want a validated input:
   ```tsx
   import ValidatedInput from './components/ValidatedInput';
   ```

2. **Use the `<ValidatedInput>` component** in your JSX, providing the necessary props:
   ```tsx
   <ValidatedInput
     id="username"
     name="username"
     label="Username"
     required={true}
     errorMessage="Username is required"
     value={username}
     onChange={(e) => setUsername(e.target.value)}
   />
   ```

### Props:

- `id`: The identifier for the input element, which must be unique.
- `name`: Name attribute for the input, usually used for form submission and handling.
- `type`: (Optional) The type of input, such as `text`, `email`, etc. Defaults to `text`.
- `placeholder`: (Optional) The placeholder text for the input field.
- `label`: The text label for the input field.
- `required`: (Optional) Specifies whether the input field is required. Defaults to `false`.
- `errorMessage`: (Optional) The message to display when the input validation fails. Defaults to "This field is required".
- `value`: The current value of the input field, managed by the parent component.
- `onChange`: The function to call when the value of the input field changes.

### Internal Logic:

- Utilizes internal state `touched` to track whether the input has been interacted with.
- Implements validation logic to determine if the input value is valid based on the `required` prop.
- Invokes `onChange` prop function provided by the parent component whenever the input value changes.
- Triggers validation message visibility when input is touched and invalid.

### Styling:

- Input styling includes shadows, rounded borders, padding, and focus states to provide a pleasant visual and interactive user experience.
- Validation error styling is applied (`border-red-500`) when the input is invalid and touched.
- Error messages are styled with a smaller italicized red font.

### Accessibility:

- The input field is associated with a label for accessibility, using the `htmlFor` attribute that matches the input's `id`.
- Form validation provides immediate feedback to the user, which can help with accessibility if managed correctly.
