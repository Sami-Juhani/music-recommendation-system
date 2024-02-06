import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';

const App: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleProfileButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLoginSuccess = () => {
    // Handle successful login, e.g., redirect user to dashboard
    console.log('Login successful!');
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
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
        {showLoginForm && (
          <div className="login-container">
            {/* <LoginForm onLoginSuccess={handleLoginSuccess} /> */}
            <Link to="/login">Login here</Link>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
