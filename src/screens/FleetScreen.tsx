import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import TopNavBar from '@components/TopNavBar';
import FooterSection from '@components/FooterSection';

import amgGle from '@assets/vehicles-images/amg_gle_53_63.png';
import audiQ7 from '@assets/vehicles-images/audi_q7.png';
import bmwX5X6 from '@assets/vehicles-images/bmw_x5_x6.png';
import cadillacEscalade from '@assets/vehicles-images/cadillac_escalade_gmc_yukon_denali.png';
import chevSuburban from '@assets/vehicles-images/chevrolet_suburban.png';
import fordExplorer from '@assets/vehicles-images/ford_explorer_expedition.png';
import hondaPilot from '@assets/vehicles-images/honda_pilot.png';
import lexusGx from '@assets/vehicles-images/lexus_gx_460_gx_470_gx_450.png';
import lexusLx from '@assets/vehicles-images/lexus_lx_570_lx_600.png';
import lexusRx from '@assets/vehicles-images/lexus_rx_350_rx_450h.png';
import mercedesG63 from '@assets/vehicles-images/mercedes-benz_g63_(g-wagon).png';
import mercedesGle from '@assets/vehicles-images/mercedes-benz_gle_350_450.png';
import nissanPatrol from '@assets/vehicles-images/nissan_patrol_armada.png';
import rangeRover from '@assets/vehicles-images/range_rover_autobiograph_sport.png';
import toyotaHighlander from '@assets/vehicles-images/toyota_highlander.png';
import toyotaHilux from '@assets/vehicles-images/toyota_hilux_2020_2024_models.png';
import toyotaLandCruiser from '@assets/vehicles-images/toyota_land_cruiser_vxr__300_series.png';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'saferides-theme';

type Vehicle = {
  name: string;
  descriptor: string;
  specLeft: string;
  specRight: string;
  imageUrl: string;
};

const VEHICLES: Vehicle[] = [
  {
    name: 'Toyota Land Cruiser VXR / 300 Series',
    descriptor: 'Class 4 Armored SUV',
    specLeft: 'B6 Ballistic Rating',
    specRight: 'V8 Biturbo',
    imageUrl: toyotaLandCruiser,
  },
  {
    name: 'Nissan Patrol / Armada',
    descriptor: 'Armored Full-Size SUV',
    specLeft: 'Run-Flat Tyres',
    specRight: 'Twin-Turbo V6',
    imageUrl: nissanPatrol,
  },
  {
    name: 'Lexus LX 570 / LX 600',
    descriptor: 'Flagship Armored Platform',
    specLeft: 'Night Vision',
    specRight: 'Twin-Turbo V6',
    imageUrl: lexusLx,
  },
  {
    name: 'Cadillac Escalade / GMC Yukon Denali',
    descriptor: 'Presidential Convoy Setups',
    specLeft: 'Acoustic Glass',
    specRight: 'Chauffeur Drive',
    imageUrl: cadillacEscalade,
  },
  {
    name: 'Range Rover Autobiography / Sport',
    descriptor: 'Ultra-Luxury British SUV',
    specLeft: 'Air Suspension',
    specRight: 'Executive Chase',
    imageUrl: rangeRover,
  },
  {
    name: 'Mercedes-Benz G63 (G-Wagon)',
    descriptor: 'Icon Off-Road Luxury',
    specLeft: 'AMG Performance',
    specRight: '577 BHP Engine',
    imageUrl: mercedesG63,
  },
  {
    name: 'Mercedes-AMG GLE 53 / GLE 63',
    descriptor: 'Performance Luxury SUV',
    specLeft: 'AMG Line Trim',
    specRight: 'Chauffeur Drive',
    imageUrl: amgGle,
  },
  {
    name: 'Audi Q7',
    descriptor: 'Executive Luxury SUV',
    specLeft: 'Air Suspension',
    specRight: 'Executive Hire',
    imageUrl: audiQ7,
  },
  {
    name: 'BMW X5 / X6',
    descriptor: 'Sport Luxury SUV',
    specLeft: 'M Sport Package',
    specRight: 'xDrive AWD',
    imageUrl: bmwX5X6,
  },
  {
    name: 'Mercedes-Benz GLE 350 / 450',
    descriptor: 'Executive SUV',
    specLeft: 'Panoramic Roof',
    specRight: 'Chauffeur Drive',
    imageUrl: mercedesGle,
  },
  {
    name: 'Lexus RX 350 / RX 450h',
    descriptor: 'Smooth Ride, Locally Popular',
    specLeft: 'Satellite Uplink',
    specRight: 'Seats 4',
    imageUrl: lexusRx,
  },
  {
    name: 'Lexus GX 460 / GX 470 / GX 450',
    descriptor: 'Rugged Luxury SUV',
    specLeft: 'Off-Road Rated',
    specRight: 'V8 Engine',
    imageUrl: lexusGx,
  },
  {
    name: 'Chevrolet Suburban',
    descriptor: 'Full-Size Family SUV',
    specLeft: 'Extended Cabin',
    specRight: 'Seats 7',
    imageUrl: chevSuburban,
  },
  {
    name: 'Ford Explorer / Expedition',
    descriptor: 'Full-Size SUV',
    specLeft: 'Fleet Ready',
    specRight: 'Group Transfer',
    imageUrl: fordExplorer,
  },
  {
    name: 'Toyota Highlander',
    descriptor: 'Family Mid-Size SUV',
    specLeft: 'Family Comfort',
    specRight: 'Seats 5',
    imageUrl: toyotaHighlander,
  },
  {
    name: 'Honda Pilot',
    descriptor: 'Reliable Family Crossover',
    specLeft: '3-Row Seating',
    specRight: 'Safe Drop Ready',
    imageUrl: hondaPilot,
  },
  {
    name: 'Toyota Hilux (2020–2024)',
    descriptor: 'Tactical Terrain Pickup',
    specLeft: 'Tactical Config',
    specRight: '4WD Off-Road',
    imageUrl: toyotaHilux,
  },
];

function FleetScreen() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' ? 'light' : 'dark';
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  function handleToggleTheme() {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  const query = search.trim().toLowerCase();
  const filtered = query
    ? VEHICLES.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.descriptor.toLowerCase().includes(query),
      )
    : VEHICLES;

  return (
    <div className="bg-darkSurface font-body text-onSurface">
      <TopNavBar
        isDarkMode={themeMode === 'dark'}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero */}
      <section className="relative h-[260px] overflow-hidden bg-[#131313] md:h-[410px]">
        {/* Grayscale vehicle image background */}
        <div className="absolute inset-0 opacity-40">
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-saturation bg-white pointer-events-none"
          />
          <img
            src={toyotaLandCruiser}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Left gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#272727] via-[rgba(25,25,25,0.8)] via-50% to-transparent" />
        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 pb-[72px] pl-6 md:pl-[90px]">
          <p className="font-body text-base font-normal uppercase tracking-[3.2px] text-primary">
            Fleet
          </p>
          <h1 className="font-display text-[48px] font-extrabold leading-none tracking-[-2.4px] text-onSurface md:text-[64px] md:tracking-[-3.2px] lg:text-[96px] lg:tracking-[-4.8px]">
            Our <span className="text-primary">Fleet</span>
          </h1>
        </div>
      </section>

      {/* Search + Grid */}
      <div className="mx-auto w-full max-w-[1440px] px-6 py-[64px] md:px-[122px]">
        {/* Search bar */}
        <div className="mb-[48px] flex items-center gap-4 bg-[rgba(255,255,255,0.06)] px-6 py-[17px]">
          <FiSearch className="size-6 shrink-0 text-onSurface/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            className="flex-1 bg-transparent text-base text-onSurface/60 placeholder:text-onSurface/60 focus:outline-none focus:text-onSurface"
          />
        </div>

        {/* Vehicle count */}
        <p className="mb-8 text-sm text-onSurface/70">
          {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => (
            <article key={vehicle.name} className="overflow-hidden bg-card">
              {/* Image */}
              <div className="h-[256px] overflow-hidden">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 px-[26px] py-8">
                <h3 className="font-display text-[18px] font-bold leading-[28px] text-primary">
                  {vehicle.name}
                </h3>
                <p className="text-[12px] uppercase tracking-[1.2px] text-subdued">
                  {vehicle.descriptor}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[14px] text-onSurface/80">
                    {vehicle.specLeft}
                  </span>
                  <span className="text-[14px] text-primary">
                    {vehicle.specRight}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default FleetScreen;
