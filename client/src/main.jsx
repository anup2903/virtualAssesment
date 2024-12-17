import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { InfoProvider } from './context/InfoContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
  </StrictMode>
);
