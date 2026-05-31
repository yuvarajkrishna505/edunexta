'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, ChevronRight, ChevronLeft, Check, Sparkles, Send } from 'lucide-react';
import styles from './EnquiryForm.module.css';
import { initialCourses } from '@/utils/data';

interface EnquiryFormProps {
  onSuccess: (message: string) => void;
  onFailure: (message: string) => void;
  defaultCourseSlug?: string;
  onFormComplete?: () => void;
}

export default function EnquiryForm({ onSuccess, onFailure, defaultCourseSlug = '', onFormComplete }: EnquiryFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: defaultCourseSlug || 'ai-powered-digital-marketing-executive',
    workExperience: '0-2 years',
    source: 'Website Lead Form'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (currentStep: number) => {
    const tempErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) tempErrors.name = 'Full name is required';
      if (!formData.email.trim()) {
        tempErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        tempErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        tempErrors.phone = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        tempErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        onSuccess(resData.message);
        if (onFormComplete) onFormComplete();
      } else {
        onFailure(resData.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      onFailure('Network error. Check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Progress Bar */}
      <div className={styles.progressWrapper}>
        <div className={styles.stepsInfo}>
          <span className={styles.stepNum}>Step {step} of 2</span>
          <span className={styles.stepDesc}>
            {step === 1 ? 'Contact Information' : 'Course & Background'}
          </span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Let&apos;s get you started!</h4>
            <p className={styles.stepSubtitle}>Enter your details to download curriculum & receive callback.</p>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Full Name *</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aishwarya Nair"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
              </div>
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address *</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>WhatsApp Number *</label>
              <div className={styles.inputWrapper}>
                <Phone size={18} className={styles.inputIcon} />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210 (10-digit)"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                />
              </div>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className={styles.primaryBtn}
            >
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>Tailor your learning journey</h4>
            <p className={styles.stepSubtitle}>This helps our industry advisors curate recommendations.</p>

            <div className={styles.inputGroup}>
              <label htmlFor="course" className={styles.label}>Select Program *</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={styles.select}
              >
                {initialCourses.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="workExperience" className={styles.label}>Work Experience *</label>
              <select
                id="workExperience"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="College Student">College Student / Fresh Graduate</option>
                <option value="0-2 years">0 - 2 Years (Junior Associate)</option>
                <option value="3-5 years">3 - 5 Years (Mid-Level Manager)</option>
                <option value="5+ years">5+ Years (Senior Leader / Executive)</option>
              </select>
            </div>

            <div className={styles.infoBadge}>
              <Sparkles size={16} className={styles.sparkleIcon} />
              <span>Includes 100% Placement Guarantee & Live Mentorship!</span>
            </div>

            <div className={styles.btnRow}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.secondaryBtn}
              >
                <ChevronLeft size={18} /> Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? 'Syncing with CRM...' : (
                  <>
                    Submit & Apply <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
