import React from 'react'
import ReactDOM from 'react-dom/client'
import { QarzdaftarApp } from './App.jsx'
import { LanguageProvider } from './utils/LanguageContext.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <LanguageProvider>
          <QarzdaftarApp />
        </LanguageProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)