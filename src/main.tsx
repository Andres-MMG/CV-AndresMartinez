import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Inicializar AOS
AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  offset: 100,
  easing: 'ease-in-out'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
