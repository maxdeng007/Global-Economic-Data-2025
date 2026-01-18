import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export function StaticFloatingActionButton() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const getThemeIcon = () => {
    return resolvedTheme === 'dark' ? 'fa-sun' : 'fa-moon';
  };

  return (
    <div 
      className={`fab-container ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => {
        console.log('FAB: mouse enter');
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        console.log('FAB: mouse leave');
        setIsExpanded(false);
      }}
    >
      <button className="fab-sub" onClick={scrollToTop} title="Back to Top">
        <i className="fas fa-arrow-up"></i>
      </button>
      <button className="fab-sub" onClick={toggleTheme} title="Toggle Theme">
        <i className={`fas ${getThemeIcon()}`}></i>
      </button>
      <button className="fab-sub" onClick={handleLanguageToggle} title="Toggle Language">
        {language === 'zh' ? 'En' : '中'}
      </button>
      <button 
        className={`fab ${isExpanded ? 'open' : ''}`} 
        onClick={() => {
          console.log('FAB: toggle click, isExpanded:', !isExpanded);
          setIsExpanded(!isExpanded);
        }}
        title="Menu"
      >
        <i className={`fas ${isExpanded ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </div>
  );
}
