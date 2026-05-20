import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiShieldCheckFill } from 'react-icons/ri';
import TopNavBar from '@components/TopNavBar';
import FooterSection from '@components/FooterSection';
import legalIntelligenceImage from '@assets/legalIntelligence.png';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'saferides-theme';

const HERO_BG = legalIntelligenceImage;

const LegalDoc = {
  PRIVACY_POLICY: 'privacy-policy',
  GENERAL_TERMS: 'general-terms',
  IP_NOTICE: 'ip-notice',
  COMPLIANCE_CLAUSE: 'compliance-clause',
  SUPPLIER_CODE: 'supplier-code',
  AGENT_PRIVACY: 'agent-privacy',
  APPLICANT_PRIVACY: 'applicant-privacy',
  // COOKIE_POLICY: 'cookie-policy',
} as const;

type LegalDoc = (typeof LegalDoc)[keyof typeof LegalDoc];

const SIDEBAR_LINKS: { label: string; slug: LegalDoc }[] = [
  { label: 'General Terms of Use', slug: LegalDoc.GENERAL_TERMS },
  { label: 'Safe Rides Privacy Policy', slug: LegalDoc.PRIVACY_POLICY },
  { label: 'Intellectual Property Notice', slug: LegalDoc.IP_NOTICE },
  { label: 'Compliance Clause', slug: LegalDoc.COMPLIANCE_CLAUSE },
  { label: 'Supplier Code of Conduct', slug: LegalDoc.SUPPLIER_CODE },
  { label: 'Agent Privacy Notice', slug: LegalDoc.AGENT_PRIVACY },
  { label: 'Applicant Privacy Notice', slug: LegalDoc.APPLICANT_PRIVACY },
  // { label: 'Safe Rides Cookie Policy', slug: LegalDoc.COOKIE_POLICY },
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
  const { doc } = useParams<{ doc: string }>();
  const validDocs = Object.values(LegalDoc) as string[];
  const activeDoc: LegalDoc = validDocs.includes(doc ?? '')
    ? (doc as LegalDoc)
    : LegalDoc.PRIVACY_POLICY;

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
              {SIDEBAR_LINKS.map(({ label, slug }) => (
                <Link
                  key={slug}
                  to={`/security-protocol/${slug}`}
                  className={`p-5 text-left text-base capitalize transition-colors ${
                    activeDoc === slug
                      ? 'bg-primary font-extrabold text-onPrimary'
                      : 'bg-card font-medium text-subdued hover:text-onSurface'
                  }`}
                >
                  {label.toLowerCase()}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Document Content */}
          <main className="min-w-0 flex-1">
            {activeDoc === LegalDoc.PRIVACY_POLICY ? (
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
            ) : activeDoc === LegalDoc.GENERAL_TERMS ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  General Terms of Use
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        Welcome to Safe Rides, a secure transportation platform
                        operating in Nigeria. Safe Rides is a ride-hailing
                        service that connects users (&ldquo;Riders&rdquo;) to
                        independent third-party transportation providers
                        (&ldquo;Drivers&rdquo; and &ldquo;Vehicle Owners&rdquo;)
                        and assigns professional, certified security personnel
                        (&ldquo;Security Personnel&rdquo;) to each trip to
                        ensure safety.
                      </p>
                      <p>
                        By using the Safe Rides mobile app, website, or any
                        associated services, you agree to be legally bound by
                        these Terms of Use. If you do not agree with any part of
                        these Terms, you must not access or use the Safe Rides
                        Platform.
                      </p>
                    </div>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={2} title="Definitions" />
                    <p className="text-base leading-[26px] text-subdued">
                      For clarity:
                    </p>
                    <BulletList
                      items={[
                        {
                          bold: 'Platform',
                          text: 'means the Safe Rides app, website, backend systems, and related technologies.',
                        },
                        {
                          bold: 'Rider',
                          text: 'means any registered user who requests a ride through the Platform.',
                        },
                        {
                          bold: 'Driver',
                          text: 'means an independent third-party driver who accepts bookings through the Platform.',
                        },
                        {
                          bold: 'Vehicle Owner',
                          text: 'means a third-party who provides cars for use by registered Drivers.',
                        },
                        {
                          bold: 'Security Personnel',
                          text: 'means an authorized, trained escort who accompanies a ride, either armed or unarmed.',
                        },
                        {
                          bold: 'Partner',
                          text: 'means any individual or company providing vehicles, drivers, or security personnel.',
                        },
                        { bold: 'Company', text: 'means Safe Rides Ltd.' },
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={3} title="Legal Relationship" />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides is a technology platform provider. We do not
                      own vehicles, do not employ drivers, and are not a
                      transport company. Drivers, Vehicle Owners, and Security
                      Personnel are independent contractors, not employees or
                      agents of Safe Rides. Riders enter into a contract of
                      carriage directly with third-party Drivers, facilitated by
                      the Platform.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={4}
                      title="Eligibility and Registration"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      To register as a user, you must be at least 18 years old,
                      have a valid government-issued ID, and pass our KYC
                      process including phone/email verification, NIN
                      verification, and facial match. You are responsible for
                      keeping your account secure, notifying us of unauthorized
                      access, and ensuring your profile information remains up
                      to date. We reserve the right to suspend or terminate
                      accounts where false information is provided or fraud is
                      suspected.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={5} title="Use of the Platform" />
                    <p className="text-base leading-[26px] text-subdued">
                      By using the Platform, you agree to:
                    </p>
                    <BulletList
                      items={[
                        'Use services only for lawful, personal, non-commercial transportation',
                        'Treat all Drivers and Security Personnel with respect',
                        'Follow instructions of Security Personnel in emergency or safety scenarios',
                        'Not attempt to bypass platform protocols including off-app payments',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      You must not:
                    </p>
                    <BulletList
                      items={[
                        'Engage in harassment, violence, or illegal activity',
                        'Tamper with tracking or panic button features',
                        'Transport hazardous, explosive, or banned items',
                        'Misuse promo codes or abuse the referral system',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={6} title="Safety and Security" />
                    <BulletList
                      items={[
                        'Each Safe Rides trip is accompanied by vetted Security Personnel licensed under NSCDC or authorized private guard firms',
                        'Security escorts are authorized to terminate trips or contact law enforcement if threats arise',
                        'Riders are not allowed to bribe, distract, or intimidate Drivers or Security Personnel',
                        'Panic button alerts will notify the Safe Rides Control Room and trigger emergency protocols',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={7} title="Pricing and Payments" />
                    <BulletList
                      items={[
                        'Fare estimates are provided in-app before trip confirmation',
                        'Actual fares are based on distance, traffic, wait time, and selected security tier',
                        'Payments are processed via approved in-app gateways',
                        'Off-app cash payments are prohibited unless specifically permitted',
                        'Safe Rides collects payments on behalf of Drivers and Security Partners and remits balances weekly, net of fees and commissions',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={8}
                      title="Cancellations, No-Shows, and Refunds"
                    />
                    <BulletList
                      items={[
                        'Riders may cancel trips free of charge within a 60-second grace period',
                        'Late cancellations or no-shows may attract a cancellation fee',
                        'If a Driver or Security Escort does not appear within a reasonable time, Riders may cancel and request a refund',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Refunds are processed on a case-by-case basis via email to{' '}
                      <a
                        href="mailto:refunds@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        refunds@getsaferides.com
                      </a>
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={9}
                      title="Insurance and Liability"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides partners with licensed insurers to provide
                      basic ride insurance for passengers. Insurance coverage
                      may be limited and does not include personal property
                      damage, loss, or force majeure events.
                    </p>
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides is not liable for:
                    </p>
                    <BulletList
                      items={[
                        'Acts or omissions of Drivers or Security Personnel',
                        'Traffic delays, accidents, or vehicle conditions',
                        'Misuse of the platform by Riders or third parties',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      You agree to indemnify Safe Rides against all claims
                      arising from your use or misuse of the Platform.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={10} title="Intellectual Property" />
                    <p className="text-base leading-[26px] text-subdued">
                      All content, branding, software, databases, and user
                      interface or experience features of Safe Rides are
                      protected under the Copyright Act, the Trade Marks Act,
                      and applicable international conventions. You may not
                      copy, reproduce, distribute, or reverse-engineer any part
                      of the Safe Rides platform.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={11}
                      title="Suspension and Termination"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides may suspend or permanently deactivate your
                      account if you violate these Terms, pose a risk to public
                      or platform safety, or if fraudulent or harmful activity
                      is detected.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={12} title="Compliance with Law" />
                    <p className="text-base leading-[26px] text-subdued">
                      All users agree to comply with applicable Nigerian laws,
                      including:
                    </p>
                    <BulletList
                      items={[
                        'Nigeria Data Protection Act (NDPA) 2023',
                        'National Road Traffic Regulations',
                        'FCCPC Consumer Protection Regulations',
                        'Cybercrimes Act 2015',
                        'Private Guard Companies Act where applicable to security personnel',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={13} title="Dispute Resolution" />
                    <p className="text-base leading-[26px] text-subdued">
                      If you have a complaint, contact us via in-app support or{' '}
                      <a
                        href="mailto:legal@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        legal@getsaferides.com
                      </a>
                      . If unresolved within 14 business days, disputes shall be
                      referred to the Federal Competition and Consumer
                      Protection Commission (FCCPC), or settled through
                      litigation in a court of competent jurisdiction in Lagos,
                      Nigeria.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={14} title="Modifications" />
                    <p className="text-base leading-[26px] text-subdued">
                      We may update these Terms periodically. Updated Terms will
                      be posted on the platform and take effect immediately upon
                      publication. Your continued use of the Platform means you
                      accept the updated Terms.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={15} title="Contact Information" />
                    <div className="bg-card p-8 text-base leading-[26px] text-subdued">
                      <p className="font-semibold text-onSurface">
                        Safe Rides Ltd.
                      </p>
                      <p>RC: 8464781</p>
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
            ) : activeDoc === LegalDoc.IP_NOTICE ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Intellectual Property Notice
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        This Intellectual Property (IP) Notice outlines the
                        rights, protections, and usage conditions relating to
                        the intellectual property assets of Safe Rides Ltd.
                        (&ldquo;Safe Rides&rdquo;, &ldquo;we&rdquo;,
                        &ldquo;our&rdquo;, or &ldquo;us&rdquo;). It applies to
                        users, drivers, vendors, contractors, and any other
                        third parties who access, use, or interact with our
                        platform and brand.
                      </p>
                      <p>
                        All use of our intellectual property is governed by
                        applicable laws in Nigeria and international
                        conventions, including:
                      </p>
                    </div>
                    <BulletList
                      items={[
                        'Copyright Act, Cap C28, Laws of the Federation of Nigeria, 2004',
                        'Trade Marks Act, Cap T13, LFN 2004',
                        'Cybercrimes (Prohibition, Prevention, etc.) Act, 2015',
                        'NDPA 2023, as it relates to proprietary platform data',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={2}
                      title="Our Intellectual Property"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      All content and features on the Safe Rides platform,
                      including but not limited to:
                    </p>
                    <BulletList
                      items={[
                        'Our brand name, logo, visual identity, and slogans',
                        'The Safe Rides app and all associated source code, UX/UI designs, architecture, and databases',
                        'Website content, including text, graphics, videos, articles, and animations',
                        'Any documentation, training materials, onboarding guides, or operational processes',
                        'Proprietary algorithms, matching logic, ride history databases, and security protocols',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      are the exclusive intellectual property of Safe Rides
                      Technologies Ltd. or its licensors, and are protected
                      under copyright, trademark, and trade secret laws.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={3} title="Prohibited Use" />
                    <p className="text-base leading-[26px] text-subdued">
                      Unless otherwise authorized in writing, you must not:
                    </p>
                    <BulletList
                      items={[
                        'Reproduce, copy, or distribute any part of the app, platform, or website',
                        'Modify, reverse-engineer, decompile, or tamper with our software',
                        "Use Safe Rides' trademarks or designs in advertising or marketing without prior approval",
                        'Sell, sublicense, rent, or commercialize any platform features or data',
                        'Create derivative works or competing products based on our technology',
                        'Use our brand in a manner that could damage our reputation or mislead the public',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={4}
                      title="User Content and License"
                    />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        If you contribute content to our platform (such as
                        reviews, support messages, or suggestions), you grant
                        Safe Rides a non-exclusive, royalty-free, worldwide
                        license to use, reproduce, adapt, and publish such
                        content for promotional or operational purposes.
                      </p>
                      <p>
                        This license does not affect your personal ownership of
                        content you submit, unless agreed otherwise in writing.
                      </p>
                    </div>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={5} title="Third-Party IP" />
                    <p className="text-base leading-[26px] text-subdued">
                      Some parts of the platform may use third-party services
                      (e.g., maps, payment tools, or fonts). These are subject
                      to their respective IP licenses and terms. Safe Rides
                      respects all third-party IP and expects users and partners
                      to do the same.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={6} title="Enforcement" />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides will enforce its IP rights to the fullest
                      extent of the law, including:
                    </p>
                    <BulletList
                      items={[
                        'Issuing legal takedown notices',
                        'Filing claims for injunctive relief or damages',
                        'Terminating access to the platform or partnerships',
                        'Reporting IP violations to the Nigerian Copyright Commission (NCC) or courts of law',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={7} title="Reporting Violations" />
                    <p className="text-base leading-[26px] text-subdued">
                      To report suspected misuse, infringement, or abuse of our
                      intellectual property, contact:
                    </p>
                    <div className="bg-card p-8 text-base leading-[26px] text-subdued">
                      <p className="font-semibold text-onSurface">
                        Legal &amp; IP Protection Office
                      </p>
                      <p>
                        Email:{' '}
                        <a
                          href="mailto:legal@getsaferides.com"
                          className="font-semibold text-primary hover:underline"
                        >
                          legal@getsaferides.com
                        </a>
                      </p>
                      <p>
                        Head Office: 28, Airways Road, Shop 1, Ijeshatedo,
                        Surulere, Lagos State, Nigeria
                      </p>
                    </div>
                    <p className="text-base leading-[26px] text-subdued">
                      Include sufficient detail for verification (e.g.,
                      screenshots, URLs, description of the violation).
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={8} title="Disclaimer" />
                    <p className="text-base leading-[26px] text-subdued">
                      Use of the Safe Rides app or platform does not grant you
                      ownership of any intellectual property found therein. All
                      rights not expressly granted in this notice are reserved.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={9} title="Updates to This Notice" />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides may revise this IP Notice periodically. Updated
                      versions will be published on our platform and take effect
                      immediately.
                    </p>
                  </section>
                </div>
              </>
            ) : activeDoc === LegalDoc.COMPLIANCE_CLAUSE ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Compliance Clause
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={1}
                      title="Purpose of the Compliance Clause"
                    />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        This Compliance Clause outlines the commitment of Safe
                        Rides Ltd. (&ldquo;Safe Rides&rdquo;) and its partners
                        &mdash; including drivers, vehicle owners, security
                        firms, contractors, and vendors &mdash; to full
                        adherence with applicable laws, regulations, industry
                        standards, and internal policies. It also sets
                        expectations for lawful and ethical conduct in all
                        dealings relating to the Safe Rides platform.
                      </p>
                      <p>
                        This clause shall be incorporated into all contracts,
                        partnership agreements, onboarding materials, and
                        procurement documents of Safe Rides.
                      </p>
                    </div>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={2}
                      title="Legal and Regulatory Compliance"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      All parties engaged with Safe Rides must strictly comply
                      with:
                    </p>
                    <BulletList
                      items={[
                        'The Nigeria Data Protection Act (NDPA) 2023',
                        'The Corrupt Practices and Other Related Offences Act 2000',
                        'The Companies and Allied Matters Act (CAMA)',
                        'The Labour Act',
                        'All transportation, licensing, and safety laws enforced by FRSC, NSCDC, and state VIOs',
                        'Any other applicable tax, insurance, security, health, or environmental laws',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={3}
                      title="Compliance with Safe Rides Policies"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      All parties must comply with the following Safe Rides
                      internal policies:
                    </p>
                    <BulletList
                      items={[
                        'Privacy Policy',
                        'Cookie Policy',
                        'Supplier Code of Conduct',
                        'Anti-Corruption and Bribery Policy',
                        'Health & Safety Guidelines',
                        'Incident Reporting and Escalation Framework',
                        'Any contract-specific or role-based compliance instructions',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      These policies shall be made accessible through our app,
                      website, onboarding materials, or on written request.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={4}
                      title="Representations and Warranties"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      By engaging with Safe Rides, all partners and contractors
                      represent and warrant that they:
                    </p>
                    <BulletList
                      items={[
                        'Have the legal right and capacity to perform their obligations',
                        'Possess valid licenses, permits, or regulatory approvals (e.g., NSCDC license for security firms)',
                        'Have not been convicted of fraud, corruption, or other criminal offenses',
                        'Will not engage in conduct that would expose Safe Rides to legal, regulatory, or reputational risk',
                        'Will ensure their personnel are trained and compliant with relevant laws',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={5}
                      title="Record-Keeping and Disclosure"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Partners must:
                    </p>
                    <BulletList
                      items={[
                        'Maintain accurate records of services rendered, incidents, and certifications',
                        'Promptly report any breaches, violations, or risks',
                        'Cooperate fully with any audit, inspection, or investigation conducted by Safe Rides or regulators',
                        'Disclose any conflict of interest or material change in circumstance',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={6} title="Breach of Compliance" />
                    <p className="text-base leading-[26px] text-subdued">
                      Any breach of this clause or applicable regulations shall
                      entitle Safe Rides to take immediate remedial action,
                      which may include:
                    </p>
                    <BulletList
                      items={[
                        'Suspension or termination of the partnership',
                        'Withholding of payment or benefits',
                        'Reporting the matter to law enforcement or regulatory authorities',
                        'Initiating legal action for breach of contract or damages',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={7} title="Reporting Misconduct" />
                    <p className="text-base leading-[26px] text-subdued">
                      All parties are encouraged to report compliance
                      violations, unethical conduct, or criminal behavior by
                      contacting:
                    </p>
                    <div className="bg-card p-8 text-base leading-[26px] text-subdued">
                      <p className="font-semibold text-onSurface">
                        Compliance &amp; Ethics Office
                      </p>
                      <p>
                        Email:{' '}
                        <a
                          href="mailto:legal@getsaferides.com"
                          className="font-semibold text-primary hover:underline"
                        >
                          legal@getsaferides.com
                        </a>
                      </p>
                      <p>
                        Head Office: 28, Airways Road, Shop 1, Ijeshatedo,
                        Surulere, Lagos State, Nigeria
                      </p>
                    </div>
                    <p className="text-base leading-[26px] text-subdued">
                      Reports will be handled confidentially and without fear of
                      retaliation.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={8}
                      title="Survival and Enforcement"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      This Compliance Clause shall remain enforceable even after
                      the expiration or termination of the contract or
                      engagement. Safe Rides reserves the right to audit and
                      enforce compliance at any time.
                    </p>
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={9} title="Amendment" />
                    <p className="text-base leading-[26px] text-subdued">
                      This clause may be reviewed and updated by Safe Rides as
                      necessary. Partners will be informed of material changes,
                      and updated versions will be considered binding unless
                      objected to in writing within 7 days of receipt.
                    </p>
                  </section>
                </div>
              </>
            ) : activeDoc === LegalDoc.SUPPLIER_CODE ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Supplier Code of Conduct
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-4">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        At Safe Rides Ltd. (&ldquo;Safe Rides&rdquo;,
                        &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                        &ldquo;us&rdquo;), we are committed to providing secure,
                        ethical, and professional ride-hailing services in
                        Nigeria. As part of this commitment, all third-party
                        service providers &mdash; including vehicle owners,
                        licensed security firms, and support vendors &mdash; are
                        expected to adhere to this Supplier Code of Conduct.
                      </p>
                      <p>
                        This Code outlines the legal, ethical, operational, and
                        safety standards that all our suppliers, contractors,
                        and partners must meet to do business with Safe Rides.
                      </p>
                    </div>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={2} title="Scope" />
                    <p className="text-base leading-[26px] text-subdued">
                      This Code applies to all entities and individuals
                      supplying goods or services to Safe Rides, including:
                    </p>
                    <BulletList
                      items={[
                        'Registered vehicle owners or fleet operators',
                        'Licensed private security companies providing escort personnel',
                        'Training agencies, background check firms, or other technical vendors',
                        'Technology support providers, such as GPS or app service subcontractors',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={3} title="Legal Compliance" />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers must comply with all applicable laws and
                      regulations in Nigeria, including but not limited to:
                    </p>
                    <BulletList
                      items={[
                        'Nigeria Data Protection Act (NDPA) 2023',
                        'Private Guard Companies Act (for security firms)',
                        'National Road Traffic Regulations',
                        'Companies and Allied Matters Act (CAMA)',
                        'Labour Act and Occupational Health and Safety Laws',
                        'Tax laws and anti-money laundering regulations',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers must also cooperate with lawful investigations
                      or audits initiated by Safe Rides or regulators.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={4}
                      title="Ethical Business Conduct"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers must:
                    </p>
                    <BulletList
                      items={[
                        'Conduct business with integrity, honesty, and transparency',
                        'Avoid all forms of bribery, kickbacks, and facilitation payments',
                        'Declare any conflicts of interest, whether real or perceived',
                        'Ensure that records, invoices, and compliance documentation are truthful and accurate',
                        "Report any unethical behavior observed within Safe Rides' operations",
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={5}
                      title="Human Rights and Labor Practices"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We expect suppliers to:
                    </p>
                    <BulletList
                      items={[
                        'Treat all workers fairly and with dignity',
                        'Prohibit child labor and forced labor',
                        'Provide a safe and non-discriminatory work environment',
                        'Comply with national wage laws, working hour limits, and social security provisions',
                        "Respect workers' rights to organize and bargain collectively where applicable",
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={6} title="Health and Safety" />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers must provide:
                    </p>
                    <BulletList
                      items={[
                        'Vehicles and equipment that meet roadworthiness and safety standards',
                        'Security personnel who are trained, licensed, and physically fit',
                        'Adequate personal protective equipment (PPE) for field personnel',
                        'Insurance coverage for their employees and operations, including third-party liability where applicable',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      All security operatives must comply with NSCDC safety
                      protocols and refrain from violence, intimidation, or
                      unauthorized use of force.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={7}
                      title="Data Protection and Confidentiality"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers shall:
                    </p>
                    <BulletList
                      items={[
                        'Handle all personal data in compliance with the NDPA 2023',
                        'Sign a Data Processing Agreement with Safe Rides (where applicable)',
                        'Not misuse or share data obtained through Safe Rides for personal or commercial gain',
                        'Protect confidential information shared during the course of the partnership',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={8}
                      title="Environmental Responsibility"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides encourages its suppliers to adopt
                      environmentally responsible practices, including:
                    </p>
                    <BulletList
                      items={[
                        'Maintaining low-emission vehicles or conducting regular engine servicing',
                        'Avoiding illegal dumping of vehicle fluids or waste',
                        'Complying with local environmental laws and waste disposal standards',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={9} title="Monitoring and Audits" />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides reserves the right to:
                    </p>
                    <BulletList
                      items={[
                        'Conduct site visits or remote compliance audits',
                        'Request documentation or proof of certifications, permits, and policies',
                        'Suspend or terminate vendors for failure to meet the standards in this Code',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={10}
                      title="Anti-Corruption and Reporting Obligations"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Suppliers must:
                    </p>
                    <BulletList
                      items={[
                        'Maintain anti-bribery policies within their organizations',
                        'Prohibit unlawful gifts or favors to Safe Rides staff or government officials',
                        'Immediately report corruption, fraud, or serious misconduct',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Email:{' '}
                      <a
                        href="mailto:legal@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        legal@getsaferides.com
                      </a>
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={11}
                      title="Consequences of Non-Compliance"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Failure to comply with this Code may result in:
                    </p>
                    <BulletList
                      items={[
                        'Termination of contract or partnership',
                        'Removal from the Safe Rides vendor database',
                        'Blacklisting across Safe Rides and affiliated tech mobility platforms',
                        'Legal or regulatory escalation where required',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={12}
                      title="Acknowledgement and Acceptance"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      All suppliers are required to review, sign, and
                      acknowledge this Code of Conduct before or during
                      onboarding. Continued partnership with Safe Rides
                      constitutes acceptance of its terms.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={13}
                      title="Contact and Enforcement"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      For questions regarding this Code or to report breaches,
                      contact:
                    </p>
                    <div className="bg-card p-8 text-base leading-[26px] text-subdued">
                      <p className="font-semibold text-onSurface">
                        Compliance and Vendor Relations
                      </p>
                      <p>
                        Office: 28, Airways Road, Shop 1, Ijeshatedo, Surulere,
                        Lagos State, Nigeria
                      </p>
                      <p>
                        Email:{' '}
                        <a
                          href="mailto:legal@getsaferides.com"
                          className="font-semibold text-primary hover:underline"
                        >
                          legal@getsaferides.com
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </>
            ) : activeDoc === LegalDoc.AGENT_PRIVACY ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Agent Privacy Notice
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        This Agent Privacy Notice explains how Safe Rides Ltd.
                        (&ldquo;Safe Rides&rdquo;, &ldquo;we&rdquo;,
                        &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses,
                        stores, and shares personal data of independent
                        contractors and partners (&ldquo;Agents&rdquo;) who work
                        with us to deliver ride-hailing and onboard security
                        services.
                      </p>
                      <p>
                        This includes individuals and legal entities who act as:
                      </p>
                    </div>
                    <BulletList
                      items={[
                        'Third-party drivers',
                        'Licensed security personnel or private security firms',
                        'Registered vehicle owners',
                        'Business vendors providing transportation support under contractual arrangements',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      This policy is issued in compliance with the Nigeria Data
                      Protection Act (NDPA) 2023 and relevant security,
                      transport, and labour regulations.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={2} title="Scope of This Notice" />
                    <p className="text-base leading-[26px] text-subdued">
                      This notice applies to:
                    </p>
                    <BulletList
                      items={[
                        'Individuals engaged via third-party security firms',
                        'Drivers or owners operating under B2B arrangements',
                        'Private contractors (sole proprietors) engaged by Safe Rides',
                        'Administrative and operations subcontractors',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      It does not apply to passengers or internal employees (see
                      our Privacy Policy or Applicant Privacy Notice instead).
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={3}
                      title="What Personal Data We Collect"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Safe Rides collects the following data during onboarding
                      and throughout your engagement:
                    </p>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          a. Personal and Contact Details
                        </p>
                        <BulletList
                          items={[
                            'Full name',
                            'Phone number and email',
                            'Passport photograph',
                            'Residential and office addresses',
                            'Next of kin or emergency contact',
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          b. Legal and Identification Data
                        </p>
                        <BulletList
                          items={[
                            'National ID Number (NIN)',
                            "Valid Government-issued ID (Driver's License, Voter's Card, International Passport)",
                            'BVN (where applicable)',
                            'Corporate registration documents (RC number, CAC certificate for vendors)',
                            'NSCDC license (for security firms)',
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          c. Professional and Operational Data
                        </p>
                        <BulletList
                          items={[
                            'Driving or guard certifications (LASDRI, FRSC, firearms license)',
                            'Vehicle documents (insurance, roadworthiness, license plate info)',
                            'Background screening reports',
                            'Bank account details (for disbursement of earnings)',
                            'GPS tracking logs, security incident reports, or disciplinary records',
                          ]}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={4}
                      title="Purpose of Data Processing"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We process Agent data to:
                    </p>
                    <BulletList
                      items={[
                        'Register, verify, and onboard agents',
                        'Assign routes and rides',
                        'Track ride performance and security compliance',
                        'Pay earnings or disburse platform commissions',
                        'Monitor safety, service quality, and complaints',
                        'Ensure regulatory compliance with NSCDC, FRSC, CAC, NDLEA, etc.',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={5}
                      title="Legal Basis for Processing"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Under the NDPA, we process this data based on:
                    </p>
                    <BulletList
                      items={[
                        {
                          bold: 'Contractual necessity:',
                          text: 'to fulfil the Agent agreement',
                        },
                        {
                          bold: 'Legal obligation:',
                          text: 'to meet security, transport, and tax regulations',
                        },
                        {
                          bold: 'Legitimate interest:',
                          text: 'to ensure the safety and integrity of our users',
                        },
                        {
                          bold: 'Consent:',
                          text: 'for specific activities such as marketing or optional surveys',
                        },
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={6}
                      title="Data Sharing and Disclosure"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We may share Agent data with:
                    </p>
                    <BulletList
                      items={[
                        'Internal teams (Compliance, Dispatch, Finance, Security Desk)',
                        'Background screening vendors',
                        'Our legal and accounting advisors',
                        'Law enforcement or regulatory bodies (upon lawful request)',
                        'Payment processors and tax consultants',
                        'Passengers (e.g., names and photo of assigned driver/security escort shown on app)',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We do not sell or rent Agent data to third parties.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={7}
                      title="International Data Transfers"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Some of your data may be stored or processed using cloud
                      services hosted in the United States or other
                      jurisdictions. Such transfers are made:
                    </p>
                    <BulletList
                      items={[
                        'Through encrypted, access-controlled systems',
                        'Under Data Processing Agreements compliant with Nigerian data export rules',
                        'In line with provisions of the NDPA 2023, Section 41–44',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      By entering into partnership with Safe Rides, you consent
                      to this transfer where applicable.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={8}
                      title="Retention of Agent Data"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We retain your data:
                    </p>
                    <BulletList
                      items={[
                        'For the duration of your partnership with us',
                        'For up to 6 years after termination (for audit, tax, or dispute resolution purposes)',
                        'Indefinitely if blacklisted due to security breach or fraudulent conduct',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={9}
                      title="Your Rights as a Data Subject"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      You have the right to:
                    </p>
                    <BulletList
                      items={[
                        'Access a copy of your personal data',
                        'Correct or update incorrect or outdated data',
                        'Object to certain types of data use (e.g., direct marketing)',
                        'Request erasure of your data (subject to legal or contractual limitations)',
                        'File a complaint with the Nigeria Data Protection Commission (NDPC)',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Requests should be directed to:{' '}
                      <a
                        href="mailto:legal@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        legal@getsaferides.com
                      </a>
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={10}
                      title="Data Security Measures"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We protect Agent data using:
                    </p>
                    <BulletList
                      items={[
                        'Encrypted databases and cloud storage',
                        'Strict role-based access controls (RBAC)',
                        'Monitoring and security audits',
                        'Background checks on staff with access to sensitive agent data',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={11}
                      title="Updates to This Notice"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We reserve the right to update this notice periodically to
                      reflect changes in our operations or applicable
                      regulations. The updated version will be published on our
                      partner onboarding portal or shared via email.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={12} title="Contact" />
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
                          href="mailto:legal@getsaferides.com"
                          className="font-semibold text-primary hover:underline"
                        >
                          legal@getsaferides.com
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </>
            ) : activeDoc === LegalDoc.APPLICANT_PRIVACY ? (
              <>
                <h2 className="font-display text-[40px] font-extrabold capitalize leading-tight tracking-[-1px] text-onSurface md:text-[48px]">
                  Applicant Privacy Notice
                </h2>
                <div className="mb-12 mt-2 h-1 w-[207px] bg-primary" />
                <div className="flex flex-col gap-12">
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={1} title="Introduction" />
                    <div className="flex flex-col gap-3 text-base leading-[26px] text-subdued">
                      <p>
                        This Applicant Privacy Notice explains how Safe Rides
                        Ltd. (&ldquo;Safe Rides&rdquo;, &ldquo;we&rdquo;,
                        &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses,
                        and protects the personal data of individuals who apply
                        to work with or provide services to us, including:
                      </p>
                    </div>
                    <BulletList
                      items={[
                        'Independent drivers',
                        'Security personnel',
                        'Vehicle owners/operators',
                        'Administrative, technical, and field staff applicants',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      This notice is in accordance with the Nigeria Data
                      Protection Act (NDPA) 2023 and applies to all applicants
                      submitting personal information through our onboarding
                      portals, recruitment platforms, field recruiters, or
                      email.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={2}
                      title="Categories of Applicants Covered"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      This notice applies to the following applicants:
                    </p>
                    <BulletList
                      items={[
                        'Drivers applying to join Safe Rides through third-party arrangements',
                        'Security escorts, including those assigned by licensed security partner firms',
                        'Vehicle owners offering third-party logistics support',
                        'Job applicants for operations, legal, engineering, and compliance roles',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={3}
                      title="What Personal Data We Collect"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      During the application and onboarding process, we collect
                      the following information:
                    </p>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          a. Identification Data
                        </p>
                        <BulletList
                          items={[
                            'Full name',
                            'Gender',
                            'Date of birth',
                            'Photograph',
                            'Residential address',
                            'Next of kin/emergency contact',
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          b. Contact Information
                        </p>
                        <BulletList
                          items={[
                            'Phone number',
                            'Email address',
                            'Social media handles (where applicable)',
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          c. Verification &amp; Legal Data
                        </p>
                        <BulletList
                          items={[
                            'National Identification Number (NIN)',
                            'BVN',
                            "Valid Government-issued ID (e.g. Driver's License, Voter's Card)",
                            'Criminal background check report',
                            'Medical or psychological fitness certificates (security applicants)',
                            'Proof of address (utility bill or tenancy agreement)',
                            'Fingerprint or biometric data (if required by security partners)',
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold text-onSurface">
                          d. Professional Data
                        </p>
                        <BulletList
                          items={[
                            'Curriculum Vitae (CV)',
                            'Driving license, LASDRI ID, and/or vehicle documents',
                            'NSCDC or PGC certification (for security personnel)',
                            'Training or onboarding scores',
                            "References and guarantors' contact information",
                            'Vehicle inspection reports (for drivers/owners)',
                          ]}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={4}
                      title="Purpose of Data Collection"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We collect and process applicant data to:
                    </p>
                    <BulletList
                      items={[
                        'Evaluate applications for engagement or recruitment',
                        'Conduct background screening, due diligence, and risk assessments',
                        'Comply with statutory requirements of NSCDC, FRSC, and NDLEA',
                        'Manage training, onboarding, and compliance workflows',
                        'Assign, monitor, and audit drivers and security personnel',
                        'Enforce platform integrity and user safety',
                        'Maintain a secure record of all affiliated personnel',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={5}
                      title="Legal Basis for Processing"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      The legal bases under NDPA for collecting this information
                      are:
                    </p>
                    <BulletList
                      items={[
                        {
                          bold: 'Consent',
                          text: '(where explicitly requested)',
                        },
                        {
                          bold: 'Pre-contractual necessity',
                          text: '(to assess your eligibility for engagement)',
                        },
                        {
                          bold: 'Legal obligation',
                          text: '(compliance with transportation, safety, tax, and labour regulations)',
                        },
                        {
                          bold: 'Legitimate interest',
                          text: '(to prevent fraud and protect platform users)',
                        },
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading
                      number={6}
                      title="Who We Share Applicant Data With"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      Your data may be shared with the following authorized
                      recipients:
                    </p>
                    <BulletList
                      items={[
                        'Internal Safe Rides departments (Legal, Operations, Compliance, Security, HR)',
                        'Third-party background check vendors',
                        'Licensed security firms (for coordinating security assignments)',
                        'Government and law enforcement agencies (on lawful request)',
                        'Insurance providers (to enroll applicants in ride protection schemes)',
                        'Payment service providers (for processing earnings, reimbursements, or expenses)',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We do not sell your personal information under any
                      circumstance.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={7} title="Data Retention Period" />
                    <p className="text-base leading-[26px] text-subdued">
                      Applicant records are retained as follows:
                    </p>
                    <BulletList
                      items={[
                        'Successful applicants: retained for the duration of engagement + 6 years',
                        'Unsuccessful applicants: retained for up to 2 years, then securely deleted',
                        'Blacklisted applicants: retained indefinitely for legal and safety reasons',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={8} title="Your Rights" />
                    <p className="text-base leading-[26px] text-subdued">
                      As an applicant, you have the right to:
                    </p>
                    <BulletList
                      items={[
                        'Access a copy of your submitted data',
                        'Request correction or update of inaccurate information',
                        'Withdraw your application (unless legally restricted)',
                        'Lodge a complaint with the Nigeria Data Protection Commission (NDPC)',
                      ]}
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      To exercise your rights, email:{' '}
                      <a
                        href="mailto:legal@getsaferides.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        legal@getsaferides.com
                      </a>
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={9} title="Data Security" />
                    <p className="text-base leading-[26px] text-subdued">
                      We have implemented robust security measures, including:
                    </p>
                    <BulletList
                      items={[
                        'Encrypted document storage',
                        'Access control (only authorized compliance officers may access sensitive data)',
                        'Secure onboarding platforms (SSL/TLS)',
                        'Physical security of hard-copy files, where applicable',
                      ]}
                    />
                  </section>
                  <section className="flex flex-col gap-4">
                    <SectionHeading
                      number={10}
                      title="Updates to This Notice"
                    />
                    <p className="text-base leading-[26px] text-subdued">
                      We may update this Privacy Notice as our processes evolve
                      or in response to legal or regulatory updates. Updated
                      versions will be available on our platform or partner
                      dashboard.
                    </p>
                  </section>
                  <section className="flex flex-col gap-5">
                    <SectionHeading number={11} title="Contact Us" />
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
            ) : (
              <ComingSoon title={SIDEBAR_LINKS[activeDoc].label} />
            )}
          </main>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default SecurityProtocolScreen;
