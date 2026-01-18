import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme, type Theme } from '../contexts/ThemeContext';

const themeData: Record<Theme, { icon: string; label: string }> = {
  system: { icon: 'fa-desktop', label: 'System' },
  light: { icon: 'fa-sun', label: 'Light' },
  dark: { icon: 'fa-moon', label: 'Dark' }
};

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsThemeDropdownOpen(false);
  };

  const currentTheme = themeData[theme];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} id="navbar">
      <div className="navbar-container">
        <div className="navbar-actions">
          {/* Theme Switcher */}
          <div className="theme-dropdown" ref={themeDropdownRef}>
            <button 
              className="action-btn theme-btn" 
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              title={currentTheme.label}
            >
              <i className={`fas ${currentTheme.icon}`}></i>
            </button>
            
            <div className={`theme-dropdown-menu ${isThemeDropdownOpen ? 'show' : ''}`}>
              {(Object.keys(themeData) as Theme[]).map((t) => (
                <div 
                  key={t}
                  className={`theme-dropdown-item ${theme === t ? 'active' : ''}`}
                  onClick={() => handleThemeChange(t)}
                >
                  <i className={`fas ${themeData[t].icon}`}></i>
                  <span>{themeData[t].label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <button className="action-btn lang-btn" onClick={toggleLanguage} title={language === 'zh' ? 'Switch to English' : '切换到中文'}>
            <i className={`fas ${language === 'zh' ? 'fa-globe-americas' : 'fa-globe-asia'}`}></i>
            <span>{language === 'zh' ? 'EN' : '中文'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
