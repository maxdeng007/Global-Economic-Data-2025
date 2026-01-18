import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme, type Theme } from '../contexts/ThemeContext';

const themeData: Record<Theme, { icon: string; label: string }> = {
  system: { icon: 'fa-desktop', label: 'System' },
  light: { icon: 'fa-sun', label: 'Light' },
  dark: { icon: 'fa-moon', label: 'Dark' }
};

export function FloatingActionButton() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  const currentTheme = themeData[theme];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsExpanded(false);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
    setIsExpanded(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  // Close FAB when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={fabRef}
      className={`fab-container ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button 
        className="fab-sub" 
        onClick={scrollToTop}
        title="Back to Top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <div className="theme-dropdown-wrapper">
        <button 
          className="fab-sub" 
          title={currentTheme.label}
        >
          <i className={`fas ${currentTheme.icon}`}></i>
        </button>
        
        <div className="theme-dropdown-menu show">
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

      <button 
        className={`fab ${isExpanded ? 'open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        title="Menu"
      >
        <i className={`fas ${isExpanded ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </div>
  );
}
