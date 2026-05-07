import { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { RiShieldCheckFill } from 'react-icons/ri';
import { submitWaitlistEmail } from '@api/waitlistApi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function WaitlistModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form state when modal opens
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
        setErrorMsg('');
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const result = await submitWaitlistEmail(email, 'navbar');
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex h-screen w-screen items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join the waitlist"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-[480px] bg-darkSurface p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center text-subdued transition-colors hover:text-onSurface"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <RiShieldCheckFill size={28} className="text-primary" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-onSurface">
              You&rsquo;re on the list
            </h3>
            <p className="text-base leading-7 text-subdued">
              We&rsquo;ll be in touch with early access details.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 bg-primary px-8 py-3 text-sm font-bold text-onPrimary"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mb-1 text-xs uppercase tracking-[3px] text-primary">
              Early Access
            </p>
            <h3 className="font-display text-[28px] font-extrabold leading-tight text-onSurface">
              Join the Waitlist
            </h3>
            <p className="mt-2 mb-6 text-sm leading-6 text-subdued">
              Access to the SafeRides platform is by invitation only. Enter your
              professional email to be assessed for membership.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Professional email address"
                required
                className="w-full bg-card px-5 py-4 text-sm text-onSurface placeholder:text-subdued/70 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {status === 'error' && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary px-8 py-4 text-sm font-bold text-onPrimary disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting…' : 'Join Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default WaitlistModal;
