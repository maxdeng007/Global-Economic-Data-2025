import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './components/HomePage';
import { CountryDetail } from './components/CountryDetail';
import { CountryComparison } from './components/CountryComparison';
import './App.css';

// Disable scroll restoration at module level
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

if (typeof window !== 'undefined') {
  const originalPushState = window.history.pushState;
  window.history.pushState = function(data: any, unused: string, url?: string | URL | null | undefined) {
    window.history.scrollRestoration = 'manual';
    return originalPushState.call(this, data, unused, url);
  };
}

function ScrollManager() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scrollToTop();
    
    const timers = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 10),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countries/:id" element={<CountryDetail />} />
            <Route path="/compare" element={<CountryComparison />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
