import { useEffect, useState } from 'react';
import ExperienceSection from '@components/ExperienceSection';
import FaqSection from '@components/FaqSection';
import FinalCtaSection from '@components/FinalCtaSection';
import FleetSection from '@components/FleetSection';
import FooterSection from '@components/FooterSection';
import HeroSection from '@components/HeroSection';
import ProcessSection from '@components/ProcessSection';
import ServicesSection from '@components/ServicesSection';
import TopNavBar from '@components/TopNavBar';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'saferides-theme';

function HomeScreen() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === 'light') {
      return 'light';
    }

    return 'dark';
  });

  useEffect(() => {
    const rootNode = document.documentElement;
    const isDarkMode = themeMode === 'dark';

    rootNode.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  function handleToggleTheme() {
    setThemeMode((previousTheme) =>
      previousTheme === 'dark' ? 'light' : 'dark',
    );
  }

  return (
    <div className="bg-darkSurface font-body text-onSurface">
      <TopNavBar
        isDarkMode={themeMode === 'dark'}
        onToggleTheme={handleToggleTheme}
      />
      <main>
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <ProcessSection />
        <FleetSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default HomeScreen;
