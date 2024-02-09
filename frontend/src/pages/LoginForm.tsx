import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLoginSuccess: () => void; // Add this line
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleChange, handleSubmit, onLoginSuccess }) => {
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={(e) => { handleSubmit(e); onLoginSuccess(); }}>
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
