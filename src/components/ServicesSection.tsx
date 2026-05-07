import { useEffect, useState } from 'react';
import serviceImage1 from '@assets/serviceImage1.png';
import serviceImage2 from '@assets/serviceImage2.png';
import planRide from '@assets/planRide.png';
import chooseRide from '@assets/chooseRide.png';
import ridePlanningEffortless from '@assets/ridePlanningEffortless.png';
import scheduleInAdvance from '@assets/scheduleInAdvance.png';

type Service = {
  title: string;
  description: string;
  imageUrl: string;
};

type SliderItem = {
  imageUrl: string;
  title: string;
  emphasis: string;
  headingClassName: string;
};

const SLIDER_IMAGE_CLASS_NAME = 'h-[450px] w-auto max-w-none';

const SLIDER_ITEMS: SliderItem[] = [
  {
    imageUrl: planRide,
    title: 'Plan, Ride, and',
    emphasis: 'Stay Secure',
    headingClassName: 'max-w-[320px] text-[24px] md:text-[36px]',
  },
  {
    imageUrl: chooseRide,
    title: 'Choose Your Ride,',
    emphasis: 'Your Way',
    headingClassName: 'max-w-[300px] text-[34px] md:text-[44px]',
  },
  {
    imageUrl: ridePlanningEffortless,
    title: 'Ride Planning',
    emphasis: 'Made Effortless',
    headingClassName: 'max-w-[276px] text-[34px] md:text-[44px]',
  },
  {
    imageUrl: scheduleInAdvance,
    title: 'Schedule Your',
    emphasis: 'Ride in Advance',
    headingClassName: 'max-w-[290px] text-[35px] md:text-[45px]',
  },
];

function ServicesSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  function onSelectSlide(index: number) {
    setCurrentSlideIndex(index);
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlideIndex((previousSlideIndex) => {
        return (previousSlideIndex + 1) % SLIDER_ITEMS.length;
      });
    }, 3500);

    return function cleanup() {
      window.clearInterval(intervalId);
    };
  }, []);

  const services: Service[] = [
    {
      title: 'Safe Drop',
      description:
        'Fast pick-up and drop-off; escort available. Book 3+ hours ahead.',
      imageUrl: serviceImage1,
    },
    {
      title: 'Safe Hire',
      description:
        'Self-drive or chauffeur with security. Book 24+ hours ahead.',
      imageUrl: serviceImage2,
    },
  ];

  const currentSlide = SLIDER_ITEMS[currentSlideIndex];

  return (
    <section className="bg-surface py-[120px]" id="services">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <div className="mx-auto w-full max-w-[1216px]">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary md:text-base">
                Specialized Logistics
              </p>
              <h2 className="mt-4 font-display text-[34px] font-bold tracking-tight text-onSurface md:text-5xl">
                Our Services
              </h2>
            </div>
            <p className="max-w-[390px] text-base leading-7 text-subdued">
              Tailored security frameworks for dynamic personal and professional
              requirements.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[596px_580px] lg:gap-10">
            <div className="space-y-8 lg:space-y-10">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="relative h-[320px] overflow-hidden md:h-[345px]"
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkSurface/85 to-transparent" />
                  <div className="absolute bottom-5 left-5 max-w-[320px] md:bottom-10 md:left-10">
                    <h3 className="font-display text-4xl font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-onSurface">
                      {service.description}
                    </p>
                    <button className="mt-6 border-b border-primary/30 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                      Review Protocol
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="bg-card px-6 py-8 md:px-8 lg:h-[731px] lg:px-0 lg:py-0">
              <div className="mx-auto flex w-full max-w-[288px] flex-col items-center lg:mt-[49px]">
                <div className="flex w-full flex-col">
                  <div className="w-full overflow-hidden bg-darkSurface py-2">
                    <h6
                      className={`max-w-[320px] text-[24px] md:text-[32px] mx-auto mb-2 text-center font-display font-bold leading-[1.04] text-onSurface text-sm py-3`}
                    >
                      {currentSlide.title}
                      <span className="block text-primary">
                        {currentSlide.emphasis}
                      </span>
                    </h6>
                    <div
                      className="mt-4 flex transition-transform duration-700 ease-out"
                      style={{
                        transform: `translateX(-${currentSlideIndex * 100}%)`,
                      }}
                    >
                      {SLIDER_ITEMS.map((slide, index) => (
                        <div
                          key={`service-slider-${index}`}
                          className={`flex min-w-full overflow-hidden ${
                            index === 0 || index === SLIDER_ITEMS.length - 1
                              ? 'justify-start'
                              : 'justify-center'
                          }`}
                        >
                          <img
                            src={slide.imageUrl}
                            alt={`SafeRides mobile app preview ${index + 1}`}
                            className={`${SLIDER_IMAGE_CLASS_NAME}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-center gap-2 py-2">
                    {SLIDER_ITEMS.map((_, index) => (
                      <button
                        key={`service-indicator-${index}`}
                        type="button"
                        onClick={() => onSelectSlide(index)}
                        className={
                          index === currentSlideIndex
                            ? 'h-1 w-5 bg-primary'
                            : 'h-1 w-3 bg-subdued/55 dark:bg-subdued/45'
                        }
                        aria-label={`Go to service app slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
