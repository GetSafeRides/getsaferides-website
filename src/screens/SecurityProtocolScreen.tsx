import { useEffect, useState } from 'react';
import { RiShieldCheckFill } from 'react-icons/ri';
import TopNavBar from '@components/TopNavBar';
import FooterSection from '@components/FooterSection';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'saferides-theme';

const HERO_BG =
  'https://www.figma.com/api/mcp/asset/783fd6c3-c308-4537-87d0-2458af7ed670';

const SIDEBAR_LINKS = [
  'Safe Rides Privacy Policy',
  'General Terms of Use',
  // 'Safe Rides Cookie Policy',
  // 'Agent Privacy Notice',
  // 'Applicant Privacy Notice',
  // 'Intellectual Property Notice',
  // 'Compliance Clause',
  // 'Supplier Code of Conduct',
];

type BulletItem = { text: string; bold?: string };

function CheckIcon() {
  return (
    <RiShieldCheckFill size={17} className="mt-[4px] shrink-0 text-primary" />
  );
}

function DotBullet() {
  return (
    <span className="mt-[10px] inline-block size-1.5 shrink-0 rounded-full bg-subdued/50" />
  );
}

function BulletList({ items }: { items: (string | BulletItem)[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text;
        const bold = typeof item === 'string' ? undefined : item.bold;
        return (
          <li
            key={i}
            className="flex items-start gap-3 text-base leading-[26px] text-subdued"
          >
            <CheckIcon />
            <span>
              {bold && (
                <strong className="font-semibold text-onSurface">
                  {bold}{' '}
                </strong>
              )}
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-base leading-[26px] text-subdued"
        >
          <DotBullet />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <RiShieldCheckFill size={28} className="text-primary" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[32px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[40px]">
          {title}
        </h2>
        <p className="text-base leading-[26px] text-subdued">
          This document is currently being prepared and will be available soon.
        </p>
      </div>
      <span className="border border-primary/30 px-5 py-2 text-sm font-semibold uppercase tracking-[2px] text-primary">
        Coming Soon
      </span>
    </div>
  );
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <h3 className="font-display text-2xl font-semibold text-onSurface">
      {number}. {title}
    </h3>
  );
}

function DataBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 bg-card p-10">
      <p className="text-base font-semibold uppercase text-onSurface">
        {label}
      </p>
      {children}
    </div>
  );
}

function SecurityProtocolScreen() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' ? 'light' : 'dark';
  });
  const [activeDoc, setActiveDoc] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  function handleToggleTheme() {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="bg-darkSurface font-body text-onSurface">
      <TopNavBar
        isDarkMode={themeMode === 'dark'}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero */}
      <section className="relative h-[410px] overflow-hidden bg-[#131313]">
        <div className="absolute inset-0 opacity-40">
          <div className="pointer-events-none absolute inset-0 bg-white mix-blend-saturation" />
          <img
            src={HERO_BG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#272727] via-[rgba(25,25,25,0.8)] via-50% to-transparent" />
        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col justify-center gap-4 px-6 md:px-[90px]">
          <p className="text-base uppercase tracking-[3.2px] text-primary">
            Privacy policy
          </p>
          <h1 className="font-display font-extrabold leading-none tracking-[-4.8px]">
            <span className="block text-[72px] text-onSurface md:text-[96px]">
              Legal
            </span>
            <span className="block text-[72px] text-primary md:text-[96px]">
              Intelligence.
            </span>
          </h1>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[90px] md:px-[90px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[88px] lg:w-[320px] lg:shrink-0 xl:w-[374px]">
            {/* <p className="mb-2 px-5 text-sm uppercase tracking-[3.2px] text-primary">
              Directory of Protocols
            </p> */}
            <nav className="flex flex-col">
              {SIDEBAR_LINKS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveDoc(i)}
                  className={`p-5 text-left text-base capitalize transition-colors ${
                    activeDoc === i
                      ? 'bg-primary font-extrabold text-onPrimary'
                      : 'bg-card font-medium text-subdued hover:text-onSurface'
                  }`}
                >
                  {label.toLowerCase()}
                </button>
              ))}
            </nav>
          </aside>

          {/* Document Content */}
          <main className="min-w-0 flex-1">
            {activeDoc !== 0 ? (
              <ComingSoon title={SIDEBAR_LINKS[activeDoc]} />
            ) : (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Safe rides privacy policy
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />

                <div className="flex flex-col gap-12">
                  {/* 1 */}
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        At Safe Rides Ltd. (&ldquo;Safe Rides&rdquo;,
                        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                        &ldquo;our&rdquo;), your privacy is very important to
                        us. This Privacy Policy explains how we collect, use,
                        store, disclose, and protect your personal data when you
                        use our mobile application, website, or related
                        services.
                      </p>
                      <p>
                        This Policy is issued in compliance with the Nigeria
                        Data Protection Act (NDPA) 2023, and other relevant
                        regulations, including international best practices like
                        the GDPR.
                      </p>
                      <p>
                        By accessing or using our platform, you agree to the
                        terms outlined in this Privacy Policy.
                      </p>
                    </div>
                  </section>

                  {/* 2 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={2} title="Scope" />
                    <p className="text-base leading-[26px] text-subdued">
                      This Privacy Policy applies to:
                    </p>
                    <BulletList
                      items={[
                        'Riders who book transportation services on our platform',
                        'Third-party drivers and vehicle owners who partner with us',
                        'Security personnel assigned to rides',
                        'Visitors to our website or app',
                        'Applicants for jobs or partnership programs',
                      ]}
                    />
                  </section>

                  {/* 3 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={3}
                      title="What Personal Data We Collect"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We may collect the following categories of personal data:
                    </p>
                    <DataBox label="A. For Riders">
                      <DotList
                        items={[
                          'Full name',
                          'Phone number and email address',
                          'Residential address (optional)',
                          'Live GPS location during rides',
                          'Facial recognition or selfie for ID verification',
                          'Payment details (card tokenized via payment gateway)',
                          'Trip history and behavioral analytics',
                        ]}
                      />
                    </DataBox>
                    <DataBox label="B. For Drivers and Security Personnel">
                      <DotList
                        items={[
                          'Full name and contact information',
                          'National Identification Number (NIN), BVN',
                          "Government-issued ID (e.g., Driver's License, Voter's Card)",
                          'Vehicle registration and license details',
                          'Criminal record check and background verification reports',
                          'Performance metrics and ratings',
                        ]}
                      />
                    </DataBox>
                    <DataBox label="C. For All Users">
                      <DotList
                        items={[
                          'Device information (e.g., IP address, operating system, browser type)',
                          'App usage data (logs, actions, crash reports)',
                          'In-app communications and call recordings (for safety)',
                        ]}
                      />
                    </DataBox>
                  </section>

                  {/* 4 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={4}
                      title="How We Collect Your Data"
                    />
                    <BulletList
                      items={[
                        'Directly from you during registration or onboarding',
                        'Automatically through the app and device permissions',
                        'From third parties such as security agencies, background check services, or KYC providers',
                        'From cookies and web beacons (see our Cookie Policy)',
                      ]}
                    />
                  </section>

                  {/* 5 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={5}
                      title="Purpose of Data Processing"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We process personal data for the following purposes:
                    </p>
                    <BulletList
                      items={[
                        'To register and authenticate users',
                        'To facilitate booking and dispatch of rides',
                        'To assign, verify, and track security personnel during trips',
                        'To process payments and issue invoices',
                        'To comply with safety regulations, fraud prevention, and law enforcement requirements',
                        'To monitor app performance and improve service delivery',
                        'To communicate with users about updates, trips, and promotions',
                        'To meet obligations under NDPA and other legal standards',
                      ]}
                    />
                  </section>

                  {/* 6 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={6}
                      title="Legal Basis for Processing"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We rely on the following legal bases under the NDPA:
                    </p>
                    <BulletList
                      items={[
                        {
                          bold: 'Consent:',
                          text: 'for marketing and in-app promotional content',
                        },
                        {
                          bold: 'Contract:',
                          text: 'to fulfill our agreement to provide ride services',
                        },
                        {
                          bold: 'Legal Obligation:',
                          text: 'to comply with KYC, FRSC, NSCDC, tax, and law enforcement requirements',
                        },
                        {
                          bold: 'Legitimate Interest:',
                          text: 'to enhance safety, prevent fraud, and improve platform experience',
                        },
                      ]}
                    />
                  </section>

                  {/* 7 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={7}
                      title="Data Sharing and Third Parties"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We do not sell your personal data. However, we may share
                      it with:
                    </p>
                    <BulletList
                      items={[
                        'Banking and payment processors (for transaction fulfillment)',
                        'Government agencies (e.g., police, tax authorities, court orders)',
                        'Background check and verification partners',
                        'Third-party cloud service providers (see Section 8)',
                        'Security partner firms (who provide licensed escorts)',
                        'Legal counsel, auditors, and regulators where legally required',
                      ]}
                    />
                  </section>

                  {/* 8 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={8}
                      title="Cross-Border Data Transfer"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides stores and processes certain user data on
                      secure cloud servers located in the United States. This
                      may involve cross-border data transfers, which are:
                    </p>
                    <BulletList
                      items={[
                        'Protected by end-to-end encryption',
                        'Governed by Data Processing Agreements with service providers',
                        "In compliance with the NDPA's conditions for international data transfer",
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      By using the platform, you consent to this transfer where
                      applicable.
                    </p>
                  </section>

                  {/* 9 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={9} title="Data Retention" />
                    <p className="text-base leading-[26px] text-subdued">
                      We retain your data only for as long as:
                    </p>
                    <BulletList
                      items={[
                        'Necessary to provide services and resolve disputes',
                        'Required by law or regulation (e.g., NDLEA, EFCC, FIRS retention rules)',
                        'Needed for audit, taxation, or security-related review',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Account and ride history are typically retained for 6
                      years after last use.
                    </p>
                  </section>

                  {/* 10 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={10}
                      title="Data Security Measures"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We implement appropriate technical and organizational
                      controls including:
                    </p>
                    <BulletList
                      items={[
                        'End-to-end encryption (TLS/SSL)',
                        'Multi-factor authentication',
                        'Role-based access controls (RBAC)',
                        'Routine vulnerability testing',
                        'Real-time monitoring and incident response protocols',
                      ]}
                    />
                  </section>

                  {/* 11 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={11}
                      title="Your Rights Under the NDPA"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      As a data subject, you have the right to:
                    </p>
                    <BulletList
                      items={[
                        'Request access to your data',
                        'Correct or update inaccurate data',
                        'Withdraw consent at any time (where applicable)',
                        'Request deletion or erasure of your personal data',
                        'Lodge a complaint with the Nigeria Data Protection Commission (NDPC)',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      To exercise these rights, contact:{' '}
                      <a
                        href="mailto:legal@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        legal@getsaferides.com
                      </a>
                    </p>
                  </section>

                  {/* 12 */}
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={12}
                      title="Cookies and Tracking Technologies"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Please refer to our Cookie Policy for how we use cookies
                      on our website and mobile app.
                    </p>
                  </section>

                  {/* 13 */}
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={13}
                      title="Updates to this Privacy Policy"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We may revise this Privacy Policy periodically. Updates
                      will be posted on the platform with the revised effective
                      date. Users will be notified via in-app or email alerts.
                    </p>
                  </section>

                  {/* 14 */}
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={14} title="Contact Us" />
                    <div className="bg-card p-8 text-base leading-[26px] text-subdued">
                      <p className="font-semibold text-onSurface">
                        Data Protection Officer (DPO)
                      </p>
                      <p>
                        Head Office: 28, Airways Road, Shop 1, Ijeshatedo,
                        Surulere, Lagos State, Nigeria
                      </p>
                      <p>
                        Email:{' '}
                        <a
                          href="mailto:info@getsaferides.com"
                          className="font-semibold text-primary hover:underline"
                        >
                          info@getsaferides.com
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default SecurityProtocolScreen;
