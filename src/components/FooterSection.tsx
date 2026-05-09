function FooterSection() {
  return (
    <footer className="bg-surface py-10 md:py-16">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl font-bold text-onSurface">
            SafeRides Global
          </p>
          <p className="mt-4 max-w-[320px] text-sm leading-7 text-subdued">
            Secure transit operations for executives, families and organizations
            requiring precision mobility.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-onSurface">
            Resources
          </p>
          <div className="mt-4 space-y-3 text-subdued">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Contact Support</p>
            <p>Security Audit</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-onSurface">
            Cities
          </p>
          <p className="mt-4 text-subdued">Lagos</p>
          <p className="mt-4 text-subdued">More Cities Coming Soon</p>
          <p className="mt-10 text-xs text-subdued">
            © 2026 SafeRides Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
