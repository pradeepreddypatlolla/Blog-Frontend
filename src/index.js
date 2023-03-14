import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/context';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 // <React.StrictMode>
    <BrowserRouter>
    <AuthProvider> 
        <ErrorBoundary>
       
        <App/>

        </ErrorBoundary>

    </AuthProvider>
    </BrowserRouter>
 // </React.StrictMode>
);
