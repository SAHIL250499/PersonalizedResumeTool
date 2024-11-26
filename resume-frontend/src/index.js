import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { useEffect } from 'react';

const GlobalPing = () => {
  useEffect(() => {
    const PING_INTERVAL =  10 * 60 * 1000; // 10 minutes
    const pingBackend = async () => {
      try {
        const response = await fetch("/users/getAllDetails");
        if (!response.ok) {
          console.log("Ping attempted but received error:", response.status);
        } else {
          console.log("Backend pinged successfully!");
        }
      } catch (error) {
        console.error("Error pinging backend:", error);
      }
    };

    pingBackend(); // Initial ping
    const intervalId = setInterval(pingBackend, PING_INTERVAL);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return null; // This component doesn't render anything
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalPing/>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
