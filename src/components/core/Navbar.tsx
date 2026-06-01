'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Sparkles, MessageSquare } from 'lucide-react';
import styles from './Navbar.module.css';
import Modal from '@/components/ui/Modal';
import CalendarScheduler from '@/components/sections/CalendarScheduler';
import Toast from '@/components/ui/Toast';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleBookingSuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
  };

  const handleBookingFailure = (msg: string) => {
    setToastType('error');
    setToastMessage(msg);
  };

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Sparkles size={24} className={styles.logoIcon} />
            <span className={styles.logoText}>EduNexta</span>
            <span className={styles.badge}>AI</span>
          </Link>

          {/* Desktop links */}
          <div className={styles.desktopMenu}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`${styles.link} ${pathname === link.path ? styles.activeLink : ''}`}
              >
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={() => setIsBookingOpen(true)}
              className={styles.ctaBtn}
            >
              <Calendar size={16} /> Book Free Demo
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button onClick={toggleMenu} className={styles.mobileTrigger} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {isOpen && (
          <div className={styles.mobileDrawer}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`${styles.mobileLink} ${pathname === link.path ? styles.mobileActiveLink : ''}`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleMenu();
                setIsBookingOpen(true);
              }}
              className={styles.mobileCtaBtn}
            >
              <Calendar size={18} /> Book Free Demo
            </button>
          </div>
        )}
      </nav>

      {/* Booking Calendar Modal */}
      <Modal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        title="Schedule dynamic 1-on-1 career call with AI experts"
      >
        <CalendarScheduler
          onSuccess={handleBookingSuccess}
          onFailure={handleBookingFailure}
          onComplete={() => {
            // Keep screen showing booking details, or user manually closes
          }}
        />
      </Modal>

      {/* WhatsApp Quick Action Widget */}
      <a 
        href="https://wa.me/919901213373?text=Hi%20EduNexta,%20I'm%20interested%20in%20mastering%20AI-powered%20digital%20marketing.%20Can%20I%20speak%20to%20a%20mentor?" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.whatsappWidget}
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare size={24} />
        <span className={styles.whatsappTooltip}>Chat with Advisor</span>
      </a>

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      )}
    </>
  );
}
