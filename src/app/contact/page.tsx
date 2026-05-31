'use client';

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Sparkles, Send, MessageSquare, ShieldCheck, HelpCircle, Navigation
} from 'lucide-react';
import styles from './contact.module.css';
import EnquiryForm from '@/components/core/EnquiryForm';
import Toast from '@/components/ui/Toast';

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
  };

  const handleFailure = (msg: string) => {
    setToastType('error');
    setToastMessage(msg);
  };

  return (
    <main className={styles.main}>
      <div className={styles.ambientGlow}></div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.badge}>
            <Navigation size={14} />
            <span>Connect in 60 Seconds</span>
          </div>
          <h1 className={styles.title}>Connect With Admissions</h1>
          <p className={styles.subtitle}>
            Have questions about placements, syllabus options, or corporate discounts? Fill the multi-step ledger or ping us on WhatsApp for rapid support.
          </p>
        </div>
      </section>

      {/* Form and info row */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left Col - Info & Map */}
            <div className={styles.leftCol}>
              <div className="glass-panel">
                <div className={styles.infoBox}>
                  <h3 className={styles.cardTitle}>Headquarters</h3>
                  
                  <ul className={styles.infoList}>
                    <li className={styles.infoItem}>
                      <MapPin size={18} className={styles.infoIcon} />
                      <span>Level 6, Premium Tech Plaza, Indiranagar, Bangalore, Karnataka - 560038</span>
                    </li>
                    <li className={styles.infoItem}>
                      <Phone size={18} className={styles.infoIcon} />
                      <a href="tel:+919876543210">+91 98765 43210</a>
                    </li>
                    <li className={styles.infoItem}>
                      <Mail size={18} className={styles.infoIcon} />
                      <a href="mailto:admissions@edunexta.com">admissions@edunexta.com</a>
                    </li>
                  </ul>

                  <a 
                    href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20admissions%20query." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.whatsappBtn}
                  >
                    <MessageSquare size={18} /> Ping Admissions WhatsApp
                  </a>
                </div>
              </div>

              {/* Mock Map Visualizer */}
              <div className="glass-panel">
                <div className={styles.mapWidget}>
                  <div className={styles.mapHeader}>
                    <Navigation size={14} className={styles.navIcon} />
                    <span>Stylized Bangalore Hub Radar (Indiranagar)</span>
                  </div>
                  <div className={styles.mockMapArea}>
                    <div className={styles.mapGridLines}></div>
                    <div className={styles.glowingMarker}>
                      <div className={styles.markerRadar}></div>
                      <MapPin size={24} className={styles.markerPin} />
                    </div>
                    <span className={styles.markerLabel}>EduNexta HQ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Multi-step Enquiry Form */}
            <div className={styles.rightCol}>
              <div className="glass-panel">
                <div className={styles.formCard}>
                  <h3 className={styles.formTitle}>Intake Enquiry ledger</h3>
                  <EnquiryForm
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      )}
    </main>
  );
}
