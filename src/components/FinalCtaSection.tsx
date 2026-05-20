import { useState } from 'react';
import { submitWaitlistEmail } from '@api/waitlistApi';
import googlePlayLogo from '@assets/googlePlayLogo.png';
import appStoreLogo from '@assets/appleLogo.png';

function FinalCtaSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const result = await submitWaitlistEmail(email, 'cta');
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  }

  return (
    <section className="bg-darkSurface py-16 md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center px-6 md:px-8">
        <div className="flex w-full max-w-[896px] flex-col items-center gap-8 border-y-2 border-primary/20 py-10 text-center md:py-[66px]">
          <h2 className="font-display text-[36px] font-bold leading-[1.1] tracking-[-2px] text-onSurface md:text-[52px] lg:text-[60px]">
            Send Us An Email
          </h2>

          <p className="max-w-[572px] text-xl leading-7 text-subdued">
            Access to the SafeRides platform is by invitation only. Join the
            global waitlist for individual or corporate membership assessment.
          </p>

          {status === 'success' ? (
            <p className="text-base font-semibold text-primary">
              You&rsquo;re on the list &mdash; we&rsquo;ll be in touch soon.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-[512px] flex-col items-stretch gap-3"
              noValidate
            >
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Professional email address"
                  required
                  className="flex-1 bg-white/10 px-4 py-4 text-base text-onSurface placeholder:text-onSurface/60 focus:outline-none sm:px-6 sm:py-[29px]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-primary px-6 py-4 text-base font-bold leading-6 text-onPrimary shadow-[0px_0px_10px_rgba(212,175,55,0.2)] disabled:opacity-60 sm:px-10"
                >
                  {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
            </form>
          )}

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              // href="#"
              className="flex h-14 w-[191px] items-center gap-3 rounded-md border border-onSurface/20 bg-onSurface/5 px-5 text-onSurface transition-colors hover:bg-onSurface/10"
            >
              <img src={googlePlayLogo} alt="Google Play" className="h-6 w-6" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal tracking-wide text-onSurface/70">
                  Coming Soon on
                </span>
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </a>
            <a
              // href="#"
              className="flex h-14 w-[191px] items-center gap-3 rounded-md border border-onSurface/20 bg-onSurface/5 px-5 text-onSurface transition-colors hover:bg-onSurface/10"
            >
              <img src={appStoreLogo} alt="App Store" className="h-6 w-6" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal tracking-wide text-onSurface/70">
                  Coming Soon on
                </span>
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
