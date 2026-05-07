import experienceImage from '@assets/experienceImage.png';

function ExperienceSection() {
  return (
    <section className="bg-darkSurface py-24" id="services">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 md:px-8 lg:grid-cols-[1.1fr_0.8fr] lg:items-stretch">
        <article className="border-l-4 border-primary bg-card px-8 py-12 md:px-12">
          <h2 className="mt-5 font-display text-5xl font-bold leading-tight text-onSurface">
            What is safe rides?
          </h2>
          <p className="mt-6 max-w-[590px] text-lg leading-8 text-subdued">
            Safe-Rides connects verified security personnel with individuals and
            businesses needing secure transportation, point-to-point Safe Drop
            or day-based Safe Hire.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <p className="font-display text-5xl font-bold text-primary">
                0.0%
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-subdued">
                Incident Rate
              </p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-primary">
                24/7
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-subdued">
                Tactical Support
              </p>
            </div>
          </div>
        </article>

        <div className="relative min-h-[520px] overflow-hidden border border-borderColor/45 shadow-frame">
          <img
            src={experienceImage}
            alt="SafeRides customer experience"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
