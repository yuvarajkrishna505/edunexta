'use client';

import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, Star, ShieldAlert, Check } from 'lucide-react';
import styles from './CalendarScheduler.module.css';

interface CalendarSchedulerProps {
  onSuccess: (message: string) => void;
  onFailure: (message: string) => void;
  onComplete?: () => void;
}

export default function CalendarScheduler({ onSuccess, onFailure, onComplete }: CalendarSchedulerProps) {
  const [advisor, setAdvisor] = useState('Senior Industry Mentor');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('');

  // Generate dynamic date options for the next 5 days
  const getNextFiveDays = () => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        iso: d.toISOString().split('T')[0],
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()]
      });
    }
    return dates;
  };

  const datesList = getNextFiveDays();
  const timeSlots = ['10:30 AM', '02:00 PM', '04:30 PM', '07:00 PM'];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!selectedDate) tempErrors.date = 'Please select a date';
    if (!selectedSlot) tempErrors.slot = 'Please select a time slot';
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone)) {
      tempErrors.phone = 'Valid 10-digit mobile number is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/crm/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          timeSlot: selectedSlot,
          advisorType: advisor
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setMeetingUrl(data.booking.meetingUrl);
        onSuccess(data.message);
        if (onComplete) onComplete();
      } else {
        onFailure(data.message || 'Booking failed. Try choosing another slot.');
      }
    } catch (error) {
      onFailure('Connection error, please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.schedulerContainer}>
      {!isSuccess ? (
        <form onSubmit={handleBooking} className={styles.form}>
          {/* Advisor Selection */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>1. Choose Career Coach</label>
            <div className={styles.advisorsGrid}>
              <div 
                className={`${styles.advisorCard} ${advisor === 'Senior Industry Mentor' ? styles.activeAdvisor : ''}`}
                onClick={() => setAdvisor('Senior Industry Mentor')}
              >
                <div className={styles.advisorHeader}>
                  <span className={styles.advisorName}>Industry Expert</span>
                  <Star size={14} className={styles.starIcon} />
                </div>
                <p className={styles.advisorDesc}>Ex-Meta / Google Leaders focusing on placements, resumes & agency scaling.</p>
              </div>

              <div 
                className={`${styles.advisorCard} ${advisor === 'AI Growth Consultant' ? styles.activeAdvisor : ''}`}
                onClick={() => setAdvisor('AI Growth Consultant')}
              >
                <div className={styles.advisorHeader}>
                  <span className={styles.advisorName}>AI Growth Lead</span>
                  <Star size={14} className={styles.starIcon} />
                </div>
                <p className={styles.advisorDesc}>Specialists focusing on AI automation workflows, lead systems & CRO tech.</p>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>2. Select Available Date</label>
            <div className={styles.datesGrid}>
              {datesList.map((d) => (
                <div
                  key={d.iso}
                  className={`${styles.dateCard} ${selectedDate === d.iso ? styles.activeDate : ''}`}
                  onClick={() => {
                    setSelectedDate(d.iso);
                    if (errors.date) setErrors((prev) => { const n = { ...prev }; delete n.date; return n; });
                  }}
                >
                  <span className={styles.dateDay}>{d.dayName}</span>
                  <span className={styles.dateNum}>{d.dayNum}</span>
                  <span className={styles.dateMonth}>{d.month}</span>
                </div>
              ))}
            </div>
            {errors.date && <p className={styles.errorMsg}>{errors.date}</p>}
          </div>

          {/* Time Picker */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>3. Select Available Slot (IST)</label>
            <div className={styles.slotsGrid}>
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`${styles.slotCard} ${selectedSlot === slot ? styles.activeSlot : ''}`}
                  onClick={() => {
                    setSelectedSlot(slot);
                    if (errors.slot) setErrors((prev) => { const n = { ...prev }; delete n.slot; return n; });
                  }}
                >
                  <Clock size={14} />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
            {errors.slot && <p className={styles.errorMsg}>{errors.slot}</p>}
          </div>

          {/* Form Credentials */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>4. Confirm Contact Details</label>
            <div className={styles.fieldsGrid}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorTxt}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorTxt}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="WhatsApp Number (e.g. 9876543210)"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                />
                {errors.phone && <span className={styles.errorTxt}>{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? 'Securing Slot in Calendar...' : (
              <>
                Confirm Live Demo Booking <UserCheck size={18} />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className={styles.successScreen}>
          <div className={styles.successBadge}>
            <Check size={48} className={styles.checkIcon} />
          </div>
          <h4 className={styles.successTitle}>Demo Confirmed Successfully!</h4>
          <p className={styles.successSubtitle}>
            Your dynamic 1-on-1 strategy consultation with the <strong>{advisor}</strong> has been secured for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
          </p>

          <div className={styles.meetBox}>
            <span className={styles.meetLabel}>Simulated Google Meet Link:</span>
            <a href={meetingUrl} target="_blank" rel="noopener noreferrer" className={styles.meetUrl}>
              {meetingUrl}
            </a>
          </div>

          <div className={styles.trustInfo}>
            <ShieldAlert size={16} />
            <span>A WhatsApp notification with login credentials has been sent to +91 {formData.phone}.</span>
          </div>
        </div>
      )}
    </div>
  );
}
