import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

const THEME_STORAGE_KEY = 'saferides-theme';
const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
const prefersDarkMode = storedTheme !== 'light';

document.documentElement.classList.toggle('dark', prefersDarkMode);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
