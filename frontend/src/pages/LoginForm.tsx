// LoginForm.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
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
    // Make API request to Django backend for login
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Handle response
      if (response.ok) {
        // If login successful, call onLoginSuccess callback
        onLoginSuccess();
      } else {
        // Handle login failure
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
        
        <div className="register-link">
        <p>Not registered yet?</p>
        <Link to="/registration">Register here</Link>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;