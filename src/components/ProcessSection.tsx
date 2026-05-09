import selectEscortLevelStep from '@assets/selectEscortLevelStep.png';
import selectRideStep from '@assets/selectRideStep.png';
import trackAndArriveStep from '@assets/trackAndArriveStep.png';
import type { ReactNode } from 'react';

type Step = {
  title: string;
  description: string;
  side: 'left' | 'right';
  icon: ReactNode;
};

function ProcessSection() {
  const steps: Step[] = [
    {
      title: 'Choose Your Ride',
      description:
        'Safe Drop for point-to-point pickups with optional enforcement escort, or Safe Hire for day-based rentals.',
      side: 'right',
      icon: (
        <img
          src={selectRideStep}
          alt="Choose Your Ride"
          className="text-primary"
        />
      ),
    },
    {
      title: 'Select Escort Level',
      description:
        'Choose Armed Security, Unarmed Security, or a Security Convoy based on route profile and exposure.',
      side: 'left',
      icon: (
        <img
          src={selectEscortLevelStep}
          alt="Select Escort Level"
          className="text-primary"
        />
      ),
    },
    {
      title: 'Track and Arrive',
      description:
        'Track your ride in real time and arrive at your destination the Safe Rides way.',
      side: 'right',
      icon: (
        <img
          src={trackAndArriveStep}
          alt="Track and Arrive"
          className="text-primary"
        />
      ),
    },
  ];

  return (
    <section className="bg-surface py-16 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <div className="mx-auto w-full max-w-[1216px]">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-onSurface md:text-5xl">
              How It Works
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary" />
          </div>

          <div className="relative mt-12 md:mt-14">
            <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-borderColor/45 md:block" />

            <div className="space-y-8 md:space-y-10">
              {steps.map((step, index) => {
                const isTextLeft = step.side === 'left';

                return (
                  <article
                    key={step.title}
                    className="grid gap-5 rounded-md border border-borderColor/40 bg-card/40 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:rounded-none md:border-0 md:bg-transparent md:p-0"
                  >
                    <div
                      className={isTextLeft ? 'order-1' : 'order-3 md:order-1'}
                    >
                      {isTextLeft ? (
                        <div className="md:ml-auto md:max-w-[513px]">
                          <h3 className="font-display text-[28px] font-bold text-onSurface">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-base leading-7 text-subdued">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div className="flex h-[180px] items-center justify-center">
                          {step.icon}
                        </div>
                      )}
                    </div>

                    <div className="order-2 flex items-center justify-center z-20">
                      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-lg font-bold text-onPrimary">
                        {index + 1}
                      </div>
                    </div>

                    <div
                      className={
                        isTextLeft ? 'order-3 md:order-3' : 'order-1 md:order-3'
                      }
                    >
                      {isTextLeft ? (
                        <div className="flex h-[180px] items-center justify-center">
                          {step.icon}
                        </div>
                      ) : (
                        <div className="md:max-w-[513px]">
                          <h3 className="font-display text-[28px] font-bold text-onSurface">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-base leading-7 text-subdued">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
