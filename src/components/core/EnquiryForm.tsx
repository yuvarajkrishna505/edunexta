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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Please enter exactly 10 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Only allow digits for phone
    if (name === 'phone' && !/^\d*$/.test(value)) return;
    // Limit to 10 digits
    if (name === 'phone' && value.length > 10) return;

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
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        onSuccess('Thank you! Our team will contact you shortly.');
        setFormData({ name: '', email: '', phone: '' });
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.stepContent}>
          <h4 className={styles.stepTitle}>Let&apos;s get you started!</h4>
          <p className={styles.stepSubtitle}>Enter your details to receive a callback.</p>
          
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.primaryBtn}
            style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Submitting...' : (
              <>Continue <Send size={18} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
