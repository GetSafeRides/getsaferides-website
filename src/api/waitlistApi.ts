type WaitlistResult = { success: true } | { success: false; error: string };

export async function submitWaitlistEmail(
  email: string,
  source: string,
  appName: string = 'SafeRides Website',
): Promise<WaitlistResult> {
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, appName }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error ?? 'Something went wrong.' };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
