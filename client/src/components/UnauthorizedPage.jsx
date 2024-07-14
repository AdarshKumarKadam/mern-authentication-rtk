// src/components/UnauthorizedPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-700 text-center">
      <h1 className="text-3xl mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <button
        className="px-4 py-2 mb-4 text-lg text-red-700 bg-red-200 border border-red-700 rounded"
        onClick={handleGoBack}
      >
        Go Back
      </button>
      <button
        className="px-4 py-2 text-lg text-red-700 bg-red-200 border border-red-700 rounded"
        onClick={handleGoHome}
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;
