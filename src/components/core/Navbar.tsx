'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917736204006"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappWidget}
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
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
