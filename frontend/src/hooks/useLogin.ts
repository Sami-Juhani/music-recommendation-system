import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from "../routes/PathConstants";

const BASE_URL = 'http://127.0.0.1:8000';

interface LoginFormState {
  email: string;
  password: string;
}

const useLogin = (onLoginSuccess: () => void) => {
  const navigate = useNavigate();

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
  
      if (response.ok ) { // Check if access_token exists in data (&& data.access_token)
        console.log('Received access token:', data.access_token);
        localStorage.setItem('accessToken', data.access_token);
        onLoginSuccess();
        console.log('Login successful:', data);

        // Redirect to home page
        navigate(PathConstants.HOME);

      } else {
        // Handle login error or missing access token
        console.error('Login failed:', data.message || 'Access token missing');
      }
    } catch (error) {
      // Handle network error
      console.error('Error:', error);
    }
  };  

  return { formData, handleChange, handleSubmit };
};

export default useLogin;
