import React from 'react';
import Dashboard from './page/Dashboard';
import GlobalColorProvider from './context/Color';
import { ToastContainer } from 'react-toastify';
import './assets/styles/styles.css';

export default function App() {
  return (
    <GlobalColorProvider>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Dashboard />
        </div>
    </GlobalColorProvider>
  )
}
