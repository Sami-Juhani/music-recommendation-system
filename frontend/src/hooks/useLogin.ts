// useLogin.ts
import React, { useState } from 'react';
const BASE_URL = 'http://127.0.0.1:8000';

interface LoginFormState {
  email: string;
  password: string;
}

const useLogin = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // Handle response data
      console.log(data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return { formData, handleChange, handleSubmit };
};

export default useLogin;
