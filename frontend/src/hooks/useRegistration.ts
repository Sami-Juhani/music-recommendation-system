// useRegistration.ts
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from "../routes/PathConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface RegistrationFormState {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const useRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationFormState>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [error, setError] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
        navigate(PathConstants.LOGIN);
      } else {
        setError(data.message || 'An unexpected error occurred. Please try again.');
        console.error('Registration failed:', data.message);
      }
      
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};

export default useRegistration;
