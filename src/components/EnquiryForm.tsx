'use client';
import { useSyncExternalStore, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../lib/site';
import { services } from '../lib/services';
import { prepareEnquiry } from '../lib/enquiry';
import { CopyEmail } from './CopyEmail';
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function EnquiryForm() {
  const ready = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [draft, setDraft] = useState<string | null>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setDraft(
      prepareEnquiry(profile.email, {
        name: String(form.get('name') || '').trim(),
        email: String(form.get('email') || '').trim(),
        details: String(form.get('details') || '').trim(),
        service: String(form.get('service') || ''),
        timeline: String(form.get('timeline') || '').trim(),
      }),
    );
  }
  return (
    <div className="enquiry-layout" id="enquiry">
      <div className="enquiry-intro">
        <h2>
          Tell me what
          <br />
          you’re building.
        </h2>
        <p>
          A few sentences about the product, the challenge, and the help you need are enough to
          start.
        </p>
        <p>Prefer a direct email?</p>
        <div className="enquiry-direct">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyEmail email={profile.email} />
        </div>
      </div>
      <form className="enquiry-form" onSubmit={prepare} onChange={() => setDraft(null)}>
        <div className="enquiry-fields">
          <div className="form-field">
            <label htmlFor="enquiry-name">Your name</label>
            <input
              disabled={!ready}
              id="enquiry-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </div>
          <div className="form-field">
            <label htmlFor="enquiry-email">Your email</label>
            <input
              disabled={!ready}
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-service">
            What kind of help? <span>Optional</span>
          </label>
          <select disabled={!ready} id="enquiry-service" name="service" defaultValue="">
            <option value="">Let’s figure it out together</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-details">What are you working on?</label>
          <textarea
            disabled={!ready}
            id="enquiry-details"
            name="details"
            required
            minLength={20}
            maxLength={2000}
            rows={5}
            placeholder="The product, what needs to change, and where you could use help."
            aria-describedby="enquiry-details-hint"
          />
          <p id="enquiry-details-hint" className="field-hint">
            Please use at least 20 characters. No detailed brief needed.
          </p>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-timeline">
            Timing or constraints <span>Optional</span>
          </label>
          <input
            disabled={!ready}
            id="enquiry-timeline"
            name="timeline"
            maxLength={200}
            placeholder="A target date, budget range, or something I should know."
          />
        </div>
        <button className="button primary" type="submit" disabled={!ready}>
          Prepare email draft
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <p className="field-hint">
          Your details stay in this page until you open the draft in your email app.
        </p>
        <noscript>
          <p>Please use the direct email address to get in touch.</p>
        </noscript>
        <div className="enquiry-result" aria-live="polite">
          {draft && (
            <>
              <p>
                Your draft is ready. Review it in your email app, then send it when you’re ready.
              </p>
              <a
                className="text-link"
                href={draft}
                ref={(node) => {
                  node?.focus();
                }}
              >
                Open email draft
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <p className="field-hint">
                Nothing has been sent. If an email app doesn’t open, use the direct address above.
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
