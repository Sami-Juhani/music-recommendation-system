import React from 'react';
import './RegistrationForm.css';

interface RegistrationFormComponentProps {
  formData: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegistrationForm: React.FC<RegistrationFormComponentProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="registration-form-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
