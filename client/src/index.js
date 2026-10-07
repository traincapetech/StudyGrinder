import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";

import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { setUserFromLocalStorage } from "./slices/userSlice";
import API_BASE_URL from "./config/api";

// Create a web worker for performance monitoring
const isProduction = process.env.NODE_ENV === 'production';

// Function to load the app with performance optimization
const renderApp = () => {
  // Hydrate redux user state from localStorage on boot
  try {
    store.dispatch(setUserFromLocalStorage());
  } catch (_) { }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>

          <App />

        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  );
};

// Implement main thread unblocking for faster initial render
if (isProduction) {
  // In production, delay non-critical operations
  // This technique helps with LCP (Largest Contentful Paint)
  window.addEventListener('load', () => {
    setTimeout(() => {
      reportWebVitals();
    }, 2000); // Delay web vitals reporting
  });

  // Render immediately in production
  renderApp();
} else {
  // In development, do normal rendering and immediate reporting
  renderApp();
  reportWebVitals();
}

// Preconnect domains are now managed natively in public/index.html to start TLS handshakes earlier.

// Configure axios defaults to optimize API calls
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 15000; // 15 seconds timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add response interceptor for consistent error handling
axios.interceptors.response.use(
  response => response,
  error => {
    const fallbackValue = { success: false, message: 'An error occurred during the request.' };
    return Promise.reject(error.response?.data || fallbackValue);
  }
);

// Attach Authorization header automatically for authenticated requests
axios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`
      };
    }
  } catch (_) { }
  return config;
});

