import React, { useEffect } from 'react';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import AppContent from './AppContent';
import { WaitIndicatorProvider } from './context/WaitIndicatorContext';

const App = () => {

  return (
    <WaitIndicatorProvider>
        <AuthProvider>
          <AppContent />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
    </WaitIndicatorProvider>
  );
};

export default App;
