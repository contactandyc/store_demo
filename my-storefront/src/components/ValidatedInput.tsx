import React, { useState } from 'react';

interface ValidatedInputProps {
  id: string;
  name: string; // add name to props
  type?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  value: string; // value will be passed from the parent component
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // add onChange to props
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  name, // include name in the component function
  type = 'text',
  placeholder,
  label,
  required = false,
  errorMessage = 'This field is required',
  value, // now using value from props
  onChange, // using onChange from props
}) => {
  const [touched, setTouched] = useState(false);

  // Check if the input is valid (not empty if required)
  const isValid = !required || (required && value.trim() !== '');

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
        name={name} // set the name of the input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value} // value from props
        onChange={onChange} // use onChange prop
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
