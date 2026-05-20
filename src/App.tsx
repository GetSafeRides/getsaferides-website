import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomeScreen from '@screens/HomeScreen';
import SecurityProtocolScreen from '@screens/SecurityProtocolScreen';
import FleetScreen from '@screens/FleetScreen';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for the new page's DOM to be painted before scrolling
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/security-protocol" element={<SecurityProtocolScreen />} />
        <Route
          path="/security-protocol/:doc"
          element={<SecurityProtocolScreen />}
        />
        <Route path="/fleet" element={<FleetScreen />} />
      </Routes>
    </>
  );
}

export default App;
