import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App' // Make sure this exists

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Top-level router */}
      <App />
    </BrowserRouter>
  </StrictMode>
)