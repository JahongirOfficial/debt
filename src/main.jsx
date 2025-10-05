import React from 'react'
import ReactDOM from 'react-dom/client'
import { QarzdaftarApp } from './App.jsx'
import { LanguageProvider } from './utils/LanguageContext.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

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