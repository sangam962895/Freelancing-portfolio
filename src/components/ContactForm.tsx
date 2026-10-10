import { useState, type FormEvent } from 'react';
import { emailJs, emailJsReady, profile } from '../data/portfolio';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'mailto' }
  | { kind: 'error'; message: string };

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Portfolio contact from ${name}`;

    // Honeypot: real visitors leave this hidden field empty. Bots fill it, so stop quietly.
    if (String(data.get('website') ?? '') !== '') return;

    const found: FieldErrors = {};
    if (!name) found.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = 'Please enter a valid email address.';
    if (message.length < 10) found.message = 'Please write at least 10 characters.';
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Not connected to EmailJS yet: open the visitor's email app with the message filled in.
    // Nothing is claimed as sent in this case.
    if (!emailJsReady) {
      const body = `${message}\n\n— ${name} (${email})`;
      const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
      setStatus({ kind: 'mailto' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailJs.serviceId,
          template_id: emailJs.templateId,
          user_id: emailJs.publicKey,
          template_params: { from_name: name, reply_to: email, subject, message, to_name: profile.name },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS responded with ${res.status}`);
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Your message could not be sent. Please try again, or email me directly.',
      });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">Your Name <span aria-hidden="true">*</span></label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        {errors.name && <p id="cf-name-err" className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email Address <span aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        {errors.email && <p id="cf-email-err" className="field-error">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <p id="cf-message-err" className="field-error">{errors.message}</p>}
      </div>
      <div className="hp" aria-hidden="true">
        <label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </button>
      <div role="status" aria-live="polite" className="form-status">
        {status.kind === 'sent' && <p className="success">Thanks! Your message was sent.</p>}
        {status.kind === 'mailto' && (
          <p className="muted">Your email app should open with this message. If nothing opens, email me at {profile.email}.</p>
        )}
        {status.kind === 'error' && <p className="field-error">{status.message}</p>}
      </div>
    </form>
  );
}
