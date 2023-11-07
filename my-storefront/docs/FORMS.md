To create a reusable input component in Next.js that shows an error hint when the input is empty, you can follow this TypeScript example using Tailwind for styling. I'll provide a simple component that holds the state of the input and displays an error message when the input is empty.

First, create a new file for your component, for example, `ValidatedInput.tsx`.

```tsx
import React, { useState } from 'react';

interface ValidatedInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  type = 'text',
  placeholder,
  label,
  required = false,
  errorMessage = 'This field is required',
}) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  // Check if the input is valid (not empty if required)
  const isValid = !required || (required && value.trim() !== '');

  // Handle the onChange event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // Handle the onBlur event
  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`shadow appearance-none border ${!isValid && touched ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {!isValid && touched && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default ValidatedInput;
```

In this component:

- `useState` is used to track the value of the input and whether it's been touched.
- `handleChange` updates the value as the user types.
- `handleBlur` sets the `touched` state to `true` when the input loses focus, indicating that the user has interacted with it.
- The input field has dynamic Tailwind classes that change the border color to red when the input is required, touched, and invalid (empty).
- An error message is displayed when the input is invalid and touched.

You can use this component in your Next.js pages or components like so:

```tsx
import React from 'react';
import ValidatedInput from './ValidatedInput';

const MyForm: React.FC = () => {
  return (
    <form className="w-full max-w-lg">
      <ValidatedInput
        id="last-name"
        label="Last Name"
        required={true}
        errorMessage="Please enter a last name."
      />
      {/* ... other form fields ... */}
    </form>
  );
};

export default MyForm;
```

In the `MyForm` component, you include the `ValidatedInput` component and specify the `id`, `label`, `required`, and `errorMessage` props. The component will handle displaying the error message when necessary, just as shown in the image you provided.


Certainly! In a Next.js application, you typically manage form state using local component state or a state management library. When you're ready to submit the form, instead of using the default HTML form submission, you would handle the submission with a function that can then programmatically navigate to another page using Next.js's `useRouter` hook.

Here's an example of how you might implement such a form:

```tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ValidatedInput from './ValidatedInput';

interface FormState {
  lastName: string;
}

const MyForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ lastName: '' });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submit action
    // Add your validation logic here
    if (!formState.lastName) {
      // Handle the error case
      return;
    }
    // Here you would typically send the data to a server
    // For now, let's just navigate to another page
    await router.push('/next-page');
  };

  return (
    <div className="w-full max-w-lg">
      <ValidatedInput
        id="last-name"
        label="Last Name"
        required={true}
        errorMessage="Please enter a last name."
        value={formState.lastName}
        onChange={handleInputChange}
      />
      {/* ... other form fields ... */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default MyForm;
```

In this updated `MyForm` component:

- `useState` is used to maintain the form's state locally.
- `useRouter` from Next.js is used to navigate programmatically after the form is submitted.
- `handleInputChange` is a function that updates the form state when any input field is changed.
- `handleSubmit` is the function called when the form is submitted. It prevents the default form submission, checks if the form is valid, and navigates to a new page.

Remember to update your `ValidatedInput` component to accept and use `value` and `onChange` props if you haven't done that already. This way, it can be controlled by the state of `MyForm`.

