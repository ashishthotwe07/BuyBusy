// ErrorPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Create a separate CSS file for styling

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage after a delay (e.g., 3 seconds)
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404 - Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>Redirecting to the homepage...</p>
      </div>
    </div>
  );
};

export default ErrorPage;
