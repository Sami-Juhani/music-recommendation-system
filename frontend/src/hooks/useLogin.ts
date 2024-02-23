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
        credentials: 'include', // Include browser cookies
      });
      const data = await response.json();

      if (response.ok) {
        // Login successful
        //console.log('Login successful:', data);

        // Check if the user is authenticated after successful login
        const isAuthenticatedResponse = await fetch(`${BASE_URL}/api/spotify/is-authenticated/`, {
          credentials: 'include', // Include browser cookies
        });
        const isAuthenticatedData = await isAuthenticatedResponse.json();

        //console.log('Is authenticated response:', isAuthenticatedResponse);
        //console.log('Is authenticated:', isAuthenticatedData);

        if (isAuthenticatedResponse.ok) {
          setIsAuthenticated(isAuthenticatedData.status);
          if (isAuthenticatedData.status) {
            // User is authenticated, redirect to home page
            navigate(PathConstants.HOME);
          } else {
            // User is not authenticated, redirect to Spotify authentication
            window.location.href = `${BASE_URL}/api/spotify/auth/`; // Redirect using window.location.href
          }
        }
      } else {
        // Handle login error or missing access token
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      // Handle network error
      console.error('Error:', error);
    }
  };

  return { formData, handleChange, handleSubmit, isAuthenticated };
};

export default useLogin;
