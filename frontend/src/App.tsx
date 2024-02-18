import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import useRegistration from './hooks/useRegistration';
import useLogin from './hooks/useLogin';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home';

const handleLoginSuccess = () => {
  // Redirect to Home page after successful login
  return <Navigate to="/home" />;
};

const App: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { formData: regFormData, handleChange: handleRegChange, handleSubmit: handleRegSubmit } = useRegistration();
  const { formData: loginFormData, handleChange: handleLoginChange, handleSubmit: handleLoginSubmit } = useLogin(handleLoginSuccess);

  const handleProfileButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <h1>Music recommendation system</h1>
          <button className="profile-button" onClick={handleProfileButtonClick}>
            {/* Your profile icon or logo here */}
            Profile
          </button>
        </div>
        <Routes>
          <Route path="/registration" element={<RegistrationForm formData={regFormData} handleChange={handleRegChange} handleSubmit={handleRegSubmit} />} />
          <Route path="/login" element={<LoginForm formData={loginFormData} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        {showLoginForm && (
          <div className="login-container">
            <Link to="/login">Login here</Link>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
