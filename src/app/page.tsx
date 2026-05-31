'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Award, ArrowUpRight, TrendingUp, Users, CheckCircle2, ChevronDown, 
  HelpCircle, Calendar, Play, Trophy, Cpu, Zap, Star
} from 'lucide-react';
import styles from './home.module.css';
import Modal from '@/components/ui/Modal';
import EnquiryForm from '@/components/core/EnquiryForm';
import Toast from '@/components/ui/Toast';
import AiTools from '@/components/sections/AiTools';
import SchemaMarkup from '@/components/core/SchemaMarkup';

export default function HomePage() {
  // Modal controllers
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');
  
  // Dynamic CMS state
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState('General');
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Fetch CMS data
  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch('/api/cms');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data.testimonials || []);
          setFaqs(data.faqs || []);
        }
      } catch (err) {
        console.error('Failed to load dynamic CMS data.', err);
      }
    };
    fetchCmsData();
  }, []);

  const handleEnquirySuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
    setIsEnquiryOpen(false);
    // Track conversion event in simulated Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: 'Home Lead Form' });
    }
  };

  const handleEnquiryFailure = (msg: string) => {
    setToastType('error');
    setToastMessage(msg);
  };

  const openEnquiry = (courseSlug = '') => {
    setSelectedCourseSlug(courseSlug);
    setIsEnquiryOpen(true);
  };

  const filteredFaqs = faqs.filter(f => f.category === activeFaqCategory);

  return (
    <main className={styles.main}>
      {/* Dynamic SEO FAQs schema */}
      {faqs.length > 0 && <SchemaMarkup type="FAQPage" data={faqs} />}

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.ambientGlow1}></div>
        <div className={styles.ambientGlow2}></div>
        
        <div className={styles.heroContainer}>
          <div className={styles.heroBadge}>
            <Cpu size={14} className={styles.heroBadgeIcon} />
            <span>Next-Gen AI-Driven Learning System</span>
          </div>

          <h1 className={styles.heroTitle}>
            Redesign Your Career as an <br />
            <span className="gradient-text-purple">AI-Powered Marketer</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Scale paid ads, automate programmatic attribution pipelines, and engineer content loops utilizing advanced Large Language Models. Built in collaboration with Meta & Google leaders.
          </p>

          <div className={styles.heroCtas}>
            <button 
              onClick={() => openEnquiry('ai-powered-digital-marketing-executive')} 
              className={styles.primaryCta}
            >
              Apply Now & Save 40% <Sparkles size={16} />
            </button>
            <Link href="/courses" className={styles.secondaryCta}>
              Explore Program Syllabus <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Social Proof Numbers */}
          <div className={styles.heroMetrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricNum}>14,200+</span>
              <span className={styles.metricLabel}>Graduates Placed</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricNum}>100%</span>
              <span className={styles.metricLabel}>Placement Guarantee</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricNum}>₹8.8 LPA</span>
              <span className={styles.metricLabel}>Average Package</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricNum}>350+</span>
              <span className={styles.metricLabel}>Hiring Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Company Logos Scrolling */}
      <section className={styles.logosSection}>
        <div className={styles.sectionContainer}>
          <p className={styles.logosTitle}>Our Alumni Work At Global Top-Tier Brands</p>
          <div className={styles.logosWrapper}>
            <div className={styles.logoTrack}>
              <div className={styles.logoItem}>Google</div>
              <div className={styles.logoItem}>Meta</div>
              <div className={styles.logoItem}>Nykaa</div>
              <div className={styles.logoItem}>Flipkart</div>
              <div className={styles.logoItem}>Adobe</div>
              <div className={styles.logoItem}>Simplilearn</div>
              <div className={styles.logoItem}>Microsoft</div>
              <div className={styles.logoItem}>HubSpot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Statistics Dashboard */}
      <section className={styles.statsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <Trophy className={styles.sectionHeaderIcon} size={28} />
            <h2 className={styles.sectionTitle}>Elite Placement Ecosystem</h2>
            <p className={styles.sectionSubtitle}>
              We dont just teach; we place. Our dedicated career cells map mock interviews, construct resumes, and secure premium interviews.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className="glass-panel">
              <div className={styles.statCardContent}>
                <TrendingUp className={styles.statIcon} size={28} />
                <span className={styles.statBig}>120%</span>
                <span className={styles.statTitle}>Average Salary Hike</span>
                <p className={styles.statDesc}>Graduates double their income streams within 6 months of course completion.</p>
              </div>
            </div>

            <div className="glass-panel">
              <div className={styles.statCardContent}>
                <Trophy className={styles.statIcon} size={28} />
                <span className={styles.statBig}>₹32.4 LPA</span>
                <span className={styles.statTitle}>Highest CTC Secured</span>
                <p className={styles.statDesc}>Acquired by an AI Automation Engineer at an APAC performance agency.</p>
              </div>
            </div>

            <div className="glass-panel">
              <div className={styles.statCardContent}>
                <Users className={styles.statIcon} size={28} />
                <span className={styles.statBig}>95.4%</span>
                <span className={styles.statTitle}>Placement Success Rate</span>
                <p className={styles.statDesc}>Calculated out of students who completed assignments and capstones in 2025.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Marketing Tools Showcase Sandbox */}
      <section className={styles.sandboxSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <Cpu className={styles.sectionHeaderIcon} size={28} />
            <h2 className={styles.sectionTitle}>Hands-On AI Automation Training</h2>
            <p className={styles.sectionSubtitle}>
              No more theoretical lectures. Learn to create programmatic pipelines that execute actual digital campaigns at high speed.
            </p>
          </div>
          <AiTools />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <Award className={styles.sectionHeaderIcon} size={28} />
            <h2 className={styles.sectionTitle}>The EduNexta Advantage</h2>
            <p className={styles.sectionSubtitle}>What makes us India&apos;s most premium and elite marketing academy.</p>
          </div>

          <div className={styles.whyGrid}>
            <div className="glass-panel">
              <div className={styles.whyCardContent}>
                <div className={styles.whyIconBox}><Star size={24} /></div>
                <h4>Expert Mentorship</h4>
                <p>1-on-1 strategy sessions with Ex-Meta directors and active Google media buyers.</p>
              </div>
            </div>

            <div className="glass-panel">
              <div className={styles.whyCardContent}>
                <div className={styles.whyIconBox}><Cpu size={24} /></div>
                <h4>Curriculum Updates</h4>
                <p>Curriculum optimized weekly to match the latest ChatGPT, Claude, and programmatic DSP models.</p>
              </div>
            </div>

            <div className="glass-panel">
              <div className={styles.whyCardContent}>
                <div className={styles.whyIconBox}><Zap size={24} /></div>
                <h4>Interactive Projects</h4>
                <p>Work with live ad budgets granted during programmatic meta execution modules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Test Drive Carousel */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <Star className={styles.sectionHeaderIcon} size={28} />
            <h2 className={styles.sectionTitle}>Before & After Transformations</h2>
            <p className={styles.sectionSubtitle}>Actual student career stories showing massive growth hikes.</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className="glass-panel">
                <div className={styles.testiContent}>
                  <div className={styles.testiHeader}>
                    <img src={t.image} alt={t.name} className={styles.testiImg} />
                    <div>
                      <h4 className={styles.testiName}>{t.name}</h4>
                      <p className={styles.testiRole}>{t.role} @ <strong>{t.company}</strong></p>
                    </div>
                  </div>
                  <div className={styles.hikeBadge}>{t.salaryGrowth}</div>
                  <p className={styles.testiStory}>&ldquo;{t.story}&rdquo;</p>
                  
                  <div className={styles.beforeAfterSalary}>
                    <div>
                      <span className={styles.salLabel}>Before:</span>
                      <span className={styles.salVal}>{t.beforeSalary} ({t.beforeRole})</span>
                    </div>
                    <div>
                      <span className={styles.salLabel}>After:</span>
                      <span className={styles.salValAccent}>{t.afterSalary} ({t.afterRole})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ System */}
      <section className={styles.faqSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <HelpCircle className={styles.sectionHeaderIcon} size={28} />
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>Got queries? We have answers. Clear all doubts before taking the leap.</p>
          </div>

          <div className={styles.faqCategories}>
            {['General', 'Placements', 'Curriculum', 'AI Tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat)}
                className={`${styles.faqCatBtn} ${activeFaqCategory === cat ? styles.activeCat : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${activeFaq === faq.id ? styles.faqActive : ''}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className={styles.faqQuestionBtn}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className={styles.arrowIcon} />
                </button>
                {activeFaq === faq.id && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaCard}>
            <div className={styles.ambientGlow3}></div>
            <h2 className={styles.ctaTitle}>Ready to dominate the marketing landscape?</h2>
            <p className={styles.ctaDesc}>
              Enrollment for the Summer Cohort closes in 3 days. Lock your 100% placement program slot and receive our premium AI prompts library for free.
            </p>
            <div className={styles.ctaBtnRow}>
              <button onClick={() => openEnquiry('')} className={styles.ctaBtnPrimary}>
                Apply & Speak with Advisor <Sparkles size={16} />
              </button>
              <a 
                href="https://wa.me/919591390860?text=Hi!%20I'd%20like%20to%20apply%20to%20EduNexta." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.ctaBtnSecondary}
              >
                Connect on WhatsApp <Play size={14} />
              </a>
            </div>
            <p className={styles.ctaSmall}>* ISO 9001:2015 educational program. Guaranteed refund model applies.</p>
          </div>
        </div>
      </section>

      {/* Lead capture modal */}
      <Modal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} title="Start Your Career Transformation">
        <EnquiryForm
          onSuccess={handleEnquirySuccess}
          onFailure={handleEnquiryFailure}
          defaultCourseSlug={selectedCourseSlug}
        />
      </Modal>

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
