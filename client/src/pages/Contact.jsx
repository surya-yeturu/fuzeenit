import { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { FadeIn } from '../utils/animations';
import { CONTACT_INFO } from '../utils/constants';
import { contactAPI } from '../services/api';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
} from '../utils/validation';

const Contact = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseInterestedIn: '',
    experienceLevel: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const fullNameError = validateRequired(form.fullName, 'Full name');
    const emailError = validateEmail(form.email);
    const phoneError = validatePhone(form.phone);
    const messageError =
      validateRequired(form.message, 'Message') ||
      validateMinLength(form.message, 10, 'Message');

    if (fullNameError) newErrors.fullName = fullNameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await contactAPI.create(form);
      setSuccess(true);
      setForm({
        fullName: '', email: '', phone: '',
        courseInterestedIn: '', experienceLevel: '', message: '',
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ form: err.message || 'Submission failed. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with FUZEN IT to discuss your learning goals and find the right technology program."
        path="/contact"
      />

      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Let's Talk About Your Learning Goals."
            align="left"
            className="mb-12"
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-brand">Phone</h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-base text-primary link-hover">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-brand">Email</h3>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-base text-primary link-hover">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-brand">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-primary link-hover"
                  >
                    {CONTACT_INFO.whatsapp}
                  </a>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-brand">Office</h3>
                  <p className="text-base text-primary">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {success ? (
                <div className="rounded-lg border border-green-100 bg-green-50 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">Message Sent</h3>
                  <p className="mt-2 text-sm text-gray-brand">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {errors.form && (
                    <p className="text-sm text-brand-red" role="alert">{errors.form}</p>
                  )}

                  <div>
                    <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-primary">
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input id="fullName" name="fullName" type="text" value={form.fullName}
                      onChange={handleChange} className={`input-field ${errors.fullName ? 'border-brand-red' : ''}`} />
                    {errors.fullName && <p className="mt-1 text-xs text-brand-red">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-primary">
                      Email <span className="text-brand-red">*</span>
                    </label>
                    <input id="email" name="email" type="email" value={form.email}
                      onChange={handleChange} className={`input-field ${errors.email ? 'border-brand-red' : ''}`} />
                    {errors.email && <p className="mt-1 text-xs text-brand-red">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-primary">
                      Phone <span className="text-brand-red">*</span>
                    </label>
                    <input id="phone" name="phone" type="tel" value={form.phone}
                      onChange={handleChange} className={`input-field ${errors.phone ? 'border-brand-red' : ''}`} />
                    {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="courseInterestedIn" className="mb-1 block text-sm font-medium text-primary">
                      Course Interested In
                    </label>
                    <input id="courseInterestedIn" name="courseInterestedIn" type="text"
                      value={form.courseInterestedIn} onChange={handleChange} className="input-field"
                      placeholder="e.g. Full Stack Development" />
                  </div>

                  <div>
                    <label htmlFor="experienceLevel" className="mb-1 block text-sm font-medium text-primary">
                      Experience Level
                    </label>
                    <select id="experienceLevel" name="experienceLevel" value={form.experienceLevel}
                      onChange={handleChange} className="input-field">
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-primary">
                      Message <span className="text-brand-red">*</span>
                    </label>
                    <textarea id="message" name="message" rows={4} value={form.message}
                      onChange={handleChange} className={`input-field resize-none ${errors.message ? 'border-brand-red' : ''}`}
                      placeholder="Tell us about your goals..." />
                    {errors.message && <p className="mt-1 text-xs text-brand-red">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Get in Touch'}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
