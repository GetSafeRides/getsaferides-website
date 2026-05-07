import { useState } from 'react';
import heroImage from '@assets/heroImage.png';
import { submitWaitlistEmail } from '@api/waitlistApi';

function HeroSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const result = await submitWaitlistEmail(email, 'hero');
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-darkSurface pt-[112px]"
      id="services"
    >
      <img
        src={heroImage}
        alt="Luxury secure transport"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgb(var(--color-surface)/0.15),rgb(var(--color-dark-surface)/0.82)_65%)] dark:bg-[radial-gradient(circle_at_20%_40%,rgb(var(--color-surface)/0.15),rgb(var(--color-dark-surface)/0.92)_65%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/5 dark:from-darkSurface/95 dark:via-darkSurface/85 dark:to-darkSurface/5" />

      <div className="relative mx-auto flex min-h-[740px] w-full max-w-[1280px] flex-col justify-center px-6 pb-24 md:px-8">
        <p className="animate-rise text-sm uppercase tracking-[0.2em] text-primary md:text-base">
          Redefining Secure Transit
        </p>
        <h1 className="mt-4 max-w-[960px] font-display text-5xl font-bold leading-[0.95] tracking-tight text-onSurface md:text-7xl lg:text-8xl">
          Secure rides,
          <span className="block text-primary">Schedule Your Way</span>
        </h1>
        <p className="mt-8 max-w-[460px] text-lg leading-8 text-subdued md:text-xl">
          On-demand luxury, security-focused rides and scheduled vehicle hires
          worldwide.
        </p>

        {status === 'success' ? (
          <p className="mt-10 text-base font-semibold text-primary">
            You&rsquo;re on the list — we&rsquo;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row sm:items-center"
            noValidate
          >
            <div className="flex flex-1 flex-col gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for priority access"
                required
                className="h-14 flex-1 border border-borderColor/65 bg-card/80 p-5 text-sm text-onSurface placeholder:text-subdued/90 dark:bg-card/35"
              />
              {status === 'error' && (
                <p className="text-xs text-red-400">{errorMsg}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-14 bg-primary px-8 text-base font-bold text-onPrimary disabled:opacity-60"
            >
              {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
