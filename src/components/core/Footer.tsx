'use strict';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span className={styles.logoText}>EduNexta</span>
              <span className={styles.logoBadge}>AI</span>
            </div>
            <p className={styles.brandDesc}>
              India&apos;s leading AI-powered Digital Marketing Institute. Enabling corporate professionals, freshers, and business owners to master modern analytics, performance channels, and programmatic automation models.
            </p>
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <ShieldCheck size={16} className={styles.badgeIcon} />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className={styles.badge}>
                <Award size={16} className={styles.badgeIcon} />
                <span>Authorized Meta Partner</span>
              </div>
            </div>
          </div>

          {/* Site Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Academic Programs</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/courses/ai-powered-digital-marketing-executive" className={styles.link}>
                  AI-Powered Marketing Executive
                </Link>
              </li>
              <li>
                <Link href="/courses/performance-marketing-accelerator" className={styles.link}>
                  Performance Marketing Accelerator
                </Link>
              </li>
              <li>
                <Link href="/courses/social-commerce-influencer-growth" className={styles.link}>
                  AI Social Commerce masterclass
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/about" className={styles.link}>
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className={styles.link}>
                  Student Placements
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className={styles.link}>
                  CMS Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Headquarters</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Level 6, Premium Tech Plaza, Indiranagar, Bangalore, Karnataka - 560038</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <a href="tel:+919901213373" className={styles.contactLink}>+91 99012 13373</a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <a href="mailto:admissions@edunexta.com" className={styles.contactLink}>admissions@edunexta.com</a>
              </li>
            </ul>
            
            <a 
              href="https://wa.me/919901213373?text=Hi!%20I'd%20like%20to%20learn%20more%20about%20your%20placement%20record." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappBtn}
            >
              <MessageCircle size={18} /> Connect on WhatsApp
            </a>
          </div>
        </div>

        {/* SEO Disclaimer & Copyright */}
        <div className={styles.bottomBar}>
          <div className={styles.seoDisclaimer}>
            <span className={styles.boldText}>Highly-Converting Trust Elements: </span>
            Over 14,200+ graduates placed across Nykaa, Google, Meta, GrowthSchool, and Scaler networks. ISO-certified educational organization executing premium digital curriculum.
          </div>
          <div className={styles.copyrightRow}>
            <p>&copy; {currentYear} EduNexta Educational Technologies Private Limited. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
              <span className={styles.divider}>|</span>
              <Link href="/terms" className={styles.bottomLink}>Terms of Enrollment</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
