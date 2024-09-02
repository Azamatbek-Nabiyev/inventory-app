import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import App from '../containers/App';

export default () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};
