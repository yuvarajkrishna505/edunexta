'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Award, ArrowUpRight, Cpu, Clock, Star, Users, Check, Filter, Calendar
} from 'lucide-react';
import styles from './courses.module.css';
import Modal from '@/components/ui/Modal';
import EnquiryForm from '@/components/core/EnquiryForm';
import Toast from '@/components/ui/Toast';
import { initialCourses } from '@/utils/data';

export default function CoursesCatalogPage() {
  const [courses] = useState<any[]>(initialCourses);
  const [selectedLevel, setSelectedLevel] = useState('All');
  
  // Lead state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleEnquirySuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
    setIsEnquiryOpen(false);
  };

  const handleEnquiryFailure = (msg: string) => {
    setToastType('error');
    setToastMessage(msg);
  };

  const openEnquiry = (courseSlug: string) => {
    setSelectedCourseSlug(courseSlug);
    setIsEnquiryOpen(true);
  };

  // Filter logic
  const filteredCourses = selectedLevel === 'All'
    ? courses
    : courses.filter(c => c.level === selectedLevel);

  return (
    <main className={styles.main}>
      {/* Background glow node */}
      <div className={styles.ambientGlow}></div>

      {/* Catalog Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroBadge}>
            <Award size={14} />
            <span>ISO 9001:2015 Educational Standard</span>
          </div>
          <h1 className={styles.title}>Dynamic Dynamic Program Catalog</h1>
          <p className={styles.subtitle}>
            Explore our curated academic programs. Master prompt engineering, server-side attribution, and performance marketing to become an elite digital operator.
          </p>
        </div>
      </section>

      {/* Course Listing */}
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          {/* Filters Row */}
          <div className={styles.filtersRow}>
            <div className={styles.filterTitle}>
              <Filter size={16} />
              <span>Skill Filter Level:</span>
            </div>
            <div className={styles.filterGroup}>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`${styles.filterBtn} ${selectedLevel === level ? styles.activeFilter : ''}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className={styles.coursesGrid}>
            {filteredCourses.map((c) => (
              <div key={c.id} className="glass-panel">
                <div className={styles.courseCard}>
                  {/* Card Header info */}
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>{c.category}</span>
                    <span className={styles.levelBadge}>{c.level}</span>
                  </div>

                  <h3 className={styles.courseTitle}>{c.title}</h3>
                  <p className={styles.courseTagline}>{c.tagline}</p>

                  <div className={styles.metadataGrid}>
                    <div className={styles.metaItem}>
                      <Clock size={16} className={styles.metaIcon} />
                      <span>{c.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Star size={16} className={styles.metaIconStar} />
                      <span>{c.rating} / 5.0 Rating</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Users size={16} className={styles.metaIcon} />
                      <span>{(c.enrolledStudents / 1000).toFixed(1)}k+ Alumni</span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className={styles.skillsBox}>
                    <span className={styles.skillsLabel}>Skills you will acquire:</span>
                    <div className={styles.skillsGrid}>
                      {c.skillsAcquired.slice(0, 4).map((skill: string, idx: number) => (
                        <span key={idx} className={styles.skillTag}>
                          <Check size={12} /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card footer details */}
                  <div className={styles.cardFooter}>
                    <div className={styles.pricing}>
                      <span className={styles.price}>{c.price}</span>
                      <span className={styles.originalPrice}>{c.originalPrice}</span>
                    </div>
                    <div className={styles.btnCol}>
                      <Link 
                        href={`/courses/${c.slug}`}
                        className={styles.primaryLink}
                      >
                        Syllabus Details <ArrowUpRight size={16} />
                      </Link>
                      <button 
                        onClick={() => openEnquiry(c.slug)}
                        className={styles.applyBtn}
                      >
                        Apply / Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture modal */}
      <Modal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} title="Apply to Dynamic Program">
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
