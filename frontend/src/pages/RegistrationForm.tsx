// RegistrationForm.tsx

import React from "react";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import '../styles/RegistrationForm.css';
import useRegistration from "../hooks/useRegistration";


const RegistrationForm = () => {
  const { formData, handleChange, handleSubmit } = useRegistration();

  return (
    <div className="registration-form-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>

        <div className="login-link">
          <p>Already registered?</p>
          <Link to={PathConstants.LOGIN}>Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
