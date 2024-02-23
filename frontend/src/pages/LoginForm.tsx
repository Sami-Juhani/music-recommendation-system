// LoginForm.tsx

import React from "react";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import { useLogin } from '../hooks/useLogin'
import '../styles/LoginForm.css';

const LoginForm = () => {
  const { formData, handleChange, handleSubmit } = useLogin();

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>

        <div className="register-link">
          <p>Not registered yet?</p>
          <Link to={PathConstants.REGISTER}>Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
