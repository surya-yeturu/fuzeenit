import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { enquiryAPI } from '../services/api';
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '../utils/validation';
import Button from './Button';
import { useExpertModal } from '../context/ExpertModalContext';

const ExpertModal = () => {
  const { isOpen, defaultCourse, closeModal } = useExpertModal();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    interestedCourse: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, interestedCourse: defaultCourse }));
      setErrors({});
      setSuccess(false);
    }
  }, [isOpen, defaultCourse]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const nameError = validateRequired(form.name, 'Name');
    const emailError = validateEmail(form.email);
    const phoneError = validatePhone(form.phone);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await enquiryAPI.create(form);
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', interestedCourse: '', message: '' });
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-surface/60 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="expert-modal-title"
            className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-surface-100 dark:shadow-nav-dark md:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-brand hover:bg-gray-light transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {success ? (
              <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">Thank You</h3>
                <p className="mt-2 text-sm text-gray-brand">
                  Our team will contact you shortly.
                </p>
                <Button onClick={closeModal} className="mt-6" variant="outline">
                  Close
                </Button>
              </motion.div>
            ) : (
              <>
                <h2 id="expert-modal-title" className="text-xl font-bold text-primary md:text-2xl">
                  Talk to an Expert
                </h2>
                <p className="mt-2 text-sm text-gray-brand">
                  Share your details and our team will help you find the right program.
                </p>

                {errors.form && (
                  <p className="mt-4 text-sm text-brand-red" role="alert">{errors.form}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="expert-name" className="mb-1 block text-sm font-medium text-primary">
                      Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="expert-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-brand-red' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="expert-phone" className="mb-1 block text-sm font-medium text-primary">
                      Phone <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="expert-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-brand-red' : ''}`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="expert-email" className="mb-1 block text-sm font-medium text-primary">
                      Email <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="expert-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-brand-red' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-brand-red">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="expert-course" className="mb-1 block text-sm font-medium text-primary">
                      Interested Course
                    </label>
                    <input
                      id="expert-course"
                      name="interestedCourse"
                      type="text"
                      value={form.interestedCourse}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g. Data Science & AI"
                    />
                  </div>

                  <div>
                    <label htmlFor="expert-message" className="mb-1 block text-sm font-medium text-primary">
                      Message
                    </label>
                    <textarea
                      id="expert-message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpertModal;
