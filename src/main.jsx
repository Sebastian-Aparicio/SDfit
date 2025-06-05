import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { WorkoutProvider } from "./context/WorkoutContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkoutProvider>
  </StrictMode>,
)
