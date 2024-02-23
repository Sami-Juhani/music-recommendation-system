import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from "../routes/PathConstants";

const BASE_URL = 'http://127.0.0.1:8000';

interface LoginFormState {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        credentials: 'include', 
      });
      const data = await response.json();

      if (response.ok) {
        
        console.log('Login successful:', data);

        const isAuthenticatedResponse = await fetch(`${BASE_URL}/api/spotify/is-authenticated/`, {
          credentials: 'include', 
        });
        const isAuthenticatedData = await isAuthenticatedResponse.json();

        console.log('Is authenticated response:', isAuthenticatedResponse);
        console.log('Is authenticated:', isAuthenticatedData);

        if (isAuthenticatedResponse.ok) {
          setIsAuthenticated(isAuthenticatedData.status);
          if (isAuthenticatedData.status) {
   
            navigate(PathConstants.HOME);
          } else {
            
            window.location.href = `${BASE_URL}/api/spotify/auth/`;
          }
        }
      } else {
        
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return { formData, handleChange, handleSubmit, isAuthenticated };
};

export default useLogin;
