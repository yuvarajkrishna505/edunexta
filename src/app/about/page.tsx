'use client';

import React from 'react';
import { Target, Eye, Award, Calendar, Compass, ShieldAlert, Users, Landmark, Briefcase } from 'lucide-react';
import styles from './about.module.css';
import { initialMentors } from '@/utils/data';

export default function AboutUsPage() {
  const timelineEvents = [
    {
      year: '2023',
      title: 'Academy Inception',
      desc: 'EduNexta established in Indiranagar, Bangalore, with a pilot cohort of 40 digital marketing students.',
      icon: <Landmark size={18} />
    },
    {
      year: '2024',
      title: 'Attaining ISO 9001 Certification',
      desc: 'Formally accredited for educational design excellence. Scaled hiring network to 150+ partners.',
      icon: <Award size={18} />
    },
    {
      year: '2025',
      title: 'Launching the AI Automation Matrix',
      desc: 'Completely overhauled syllabus, introducing prompt engineering, programmatic media buying, and Zapier CRM systems.',
      icon: <Compass size={18} />
    },
    {
      year: '2026',
      title: 'Pioneering Dynamic Placement Guarantee',
      desc: 'Secured 350+ corporate partners, registering a 95.4% verified placement record with ₹8.8 LPA average packages.',
      icon: <Briefcase size={18} />
    }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.ambientGlow}></div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.badge}>
            <Users size={14} />
            <span>Pioneering Educational Engineering</span>
          </div>
          <h1 className={styles.title}>Disrupting Higher Education</h1>
          <p className={styles.subtitle}>
            We believe that traditional education is too slow for the AI era. Our mission is to train elite, data-driven digital operators who command advanced marketing technologies.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.gridCols2}>
            {/* Mission */}
            <div className="glass-panel">
              <div className={styles.cardPadding}>
                <div className={styles.iconBox}><Target size={24} /></div>
                <h3 className={styles.cardTitle}>Our Mission</h3>
                <p className={styles.cardDesc}>
                  To democratize elite performance marketing skills. We replace outdated university slide-decks with live dashboards, active ad budgets, and automated Zapier CRM triggers, enabling absolute career transformation.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="glass-panel">
              <div className={styles.cardPadding}>
                <div className={styles.iconBox}><Eye size={24} /></div>
                <h3 className={styles.cardTitle}>Our Vision</h3>
                <p className={styles.cardDesc}>
                  To build India&apos;s most high-converting, placement-driven digital academy. We aim to become the premier talent source for global high-growth DTC brands and performance agencies looking for AI-ready marketing operators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Growth Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Our Progression Journey</h2>
            <p>A history of scaling student careers at lightspeed.</p>
          </div>

          <div className={styles.timeline}>
            {timelineEvents.map((event, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.markerIcon}>{event.icon}</div>
                </div>
                <div className={`${styles.timelineContent} glass-panel`}>
                  <span className={styles.eventYear}>{event.year}</span>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <p className={styles.eventDesc}>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Mentors */}
      <section className={styles.mentorsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Led by Industry Operators</h2>
            <p>Learn from active media buyers and growth leads scaling actual multi-million dollar brands.</p>
          </div>

          <div className={styles.mentorsGrid}>
            {initialMentors.map((m) => (
              <div key={m.id} className="glass-panel">
                <div className={styles.mentorCard}>
                  <img src={m.image} alt={m.name} className={styles.mentorImg} />
                  <h4 className={styles.mentorName}>{m.name}</h4>
                  <p className={styles.mentorRole}>{m.role} @ <strong>{m.company}</strong></p>
                  <p className={styles.mentorBio}>{m.bio}</p>
                  
                  <div className={styles.skillsWrapper}>
                    {m.skills.map((s, idx) => (
                      <span key={idx} className={styles.skillTag}>#{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
