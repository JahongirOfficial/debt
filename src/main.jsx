import React from 'react'
import ReactDOM from 'react-dom/client'
import { QarzdaftarApp } from './App.jsx'
import { LanguageProvider } from './utils/LanguageContext.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { registerServiceWorker } from './utils/pwaUtils.js'

// Register Service Worker for PWA functionality
if (import.meta.env.PROD) {
  registerServiceWorker().then((registration) => {
    if (registration) {
      console.log('✅ PWA Service Worker registered successfully');
    }
  }).catch((error) => {
    console.error('❌ PWA Service Worker registration failed:', error);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <QarzdaftarApp />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)