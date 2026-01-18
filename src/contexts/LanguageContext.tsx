import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.zh;
}

const translations = {
  zh: {
    navTitle: '全球经济数据',
    heroTitle: '全球各国经济数据 2025',
    heroSubtitle: '探索全球29个主要经济体的薪资水平、家庭收入、GDP及社会发展指标',
    statCountries: '个国家/地区',
    statIndicators: '项经济指标',
    statYear: '最新数据',
    searchPlaceholder: '搜索国家名称...',
    filterRegion: '地区:',
    filterEconomy: '经济类型:',
    filterResults: '{count} 国家',
    regionAll: '全部地区',
    regionAsiaPacific: '亚太地区',
    regionEurope: '欧洲',
    regionAmericas: '美洲',
    regionMiddleEast: '中东及其他',
    economyAll: '全部类型',
    economyG1: '超级大国',
    economyG2: '第二大经济体',
    economyG3: '第三大经济体',
    economyG4: '第四大经济体',
    economyG5: '第五大经济体',
    economyG7: 'G7成员国',
    economyG20: 'G20成员国',
    economyDeveloped: '发达国家',
    economyEmerging: '新兴市场',
    economyDeveloping: '发展中国家',
    favoritesTitle: '我的收藏',
    recentTitle: '最近访问',
    compareTitle: '对比',
    clearCompare: '清除',
    showCompare: '显示对比',
    comparisonTitle: '经济数据对比',
    footerTitle: '全球经济数据平台',
    footerDesc: '汇聚全球29个主要经济体的核心经济指标，包括薪资水平、家庭收入、GDP增长、贫困率等重要数据，为您提供全面、准确的经济参考。',
    copyright: '© 2025 经济数据报告 | 数据仅供参考',
    addToCompare: '添加到对比',
    removeFromCompare: '从对比移除',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏移除',
    salary: '中位数薪资',
    household: '家庭收入',
    gdpPerCapita: '人均GDP',
    gdpGrowth: 'GDP增长',
    currency: '货币',
    population: '人口',
    best: '最佳',
    vizTitle: '经济数据可视化',
    vizSubtitle: '全球主要经济体关键指标对比',
    gdpRankingTitle: '人均GDP 排名 (USD)',
    regionSummaryTitle: '区域概览',
    salaryComparisonTitle: '薪资水平对比 (USD)',
    majorEconomiesTitle: '主要经济体对比',
  },
  en: {
    navTitle: 'Global Economic Data',
    heroTitle: 'Global Economic Data 2025',
    heroSubtitle: 'Explore salary levels, household income, GDP, and social development indicators of 29 major economies worldwide',
    statCountries: 'Countries/Regions',
    statIndicators: 'Economic Indicators',
    statYear: 'Latest Data',
    searchPlaceholder: 'Search country name...',
    filterRegion: 'Region:',
    filterEconomy: 'Economy Type:',
    filterResults: '{count} Countries',
    regionAll: 'All Regions',
    regionAsiaPacific: 'Asia Pacific',
    regionEurope: 'Europe',
    regionAmericas: 'Americas',
    regionMiddleEast: 'Middle East & Others',
    economyAll: 'All Types',
    economyG1: 'Superpower',
    economyG2: '2nd Largest Economy',
    economyG3: '3rd Largest Economy',
    economyG4: '4th Largest Economy',
    economyG5: '5th Largest Economy',
    economyG7: 'G7 Member',
    economyG20: 'G20 Member',
    economyDeveloped: 'Developed',
    economyEmerging: 'Emerging Market',
    economyDeveloping: 'Developing',
    favoritesTitle: 'My Favorites',
    recentTitle: 'Recently Visited',
    compareTitle: 'Compare',
    clearCompare: 'Clear',
    showCompare: 'Show Comparison',
    comparisonTitle: 'Economic Data Comparison',
    footerTitle: 'Global Economic Data Platform',
    footerDesc: 'Gathering core economic indicators from 29 major global economies, including salary levels, household income, GDP growth, poverty rates, and more, providing you with comprehensive and accurate economic references.',
    copyright: '© 2025 Economic Data Report | For reference only',
    addToCompare: 'Add to compare',
    removeFromCompare: 'Remove from compare',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    salary: 'Median Salary',
    household: 'Household Income',
    gdpPerCapita: 'GDP per Capita',
    gdpGrowth: 'GDP Growth',
    currency: 'Currency',
    population: 'Population',
    best: 'Best',
    vizTitle: 'Economic Data Visualization',
    vizSubtitle: 'Key Indicators Comparison of Major Global Economies',
    gdpRankingTitle: 'GDP per Capita Ranking (USD)',
    regionSummaryTitle: 'Regional Overview',
    salaryComparisonTitle: 'Salary Level Comparison (USD)',
    majorEconomiesTitle: 'Major Economies Comparison',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return (saved === 'en' ? 'en' : 'zh') as Language;
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { translations };
