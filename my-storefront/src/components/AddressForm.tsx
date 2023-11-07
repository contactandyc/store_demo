import React, { useState } from 'react';
import ValidatedInput from './ValidatedInput';
import Button from './Button';

// Types for the address form state
interface AddressFormState {
  firstName: string;
  lastName: string;
  streetAddress: string;
  zipCode: string;
  cityState: string;
}

interface AddressFormProps {
  onSubmit: (formState: AddressFormState) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<AddressFormState>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    zipCode: '',
    cityState: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  const handleClick = () => {
    onSubmit(formState);
  };

  return (
    <div className="space-y-4">
      {/* Using ValidatedInput for simplicity, replace with actual validated input fields */}
      <ValidatedInput
        id="first-name"
        name="firstName"
        placeholder="First Name"
        required={true}
        errorMessage="Please enter a first name."
        value={formState.firstName}
        onChange={handleInputChange}
      />
      <ValidatedInput
        id="last-name"
        name="lastName"
        placeholder="Last Name"
        required={true}
        errorMessage="Please enter a last name."
        value={formState.lastName}
        onChange={handleInputChange}
      />
      <ValidatedInput
        id="street-address"
        name="streetAddress"
        placeholder="Street Address"
        required={true}
        errorMessage="Please enter a street address."
        value={formState.streetAddress}
        onChange={handleInputChange}
      />
      <ValidatedInput
        id="zip-code"
        name="zipCode"
        placeholder="Zip Code"
        required={true}
        errorMessage="Please enter a zip code."
        value={formState.zipCode}
        onChange={handleInputChange}
      />
      <ValidatedInput
        id="city-state"
        name="cityState"
        placeholder="City, State"
        required={true}
        errorMessage="Please enter a valid city and state."
        value={formState.cityState}
        onChange={handleInputChange}
      />
      <Button type="button" onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white">
        Continue to Payment
      </Button>
    </div>
  );
};

export default AddressForm;
