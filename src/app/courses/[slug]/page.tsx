'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Cpu, Clock, Star, Users, CheckCircle2, ChevronDown, ChevronUp, Sparkles, 
  ArrowLeft, Calendar, FileText, Gift, Award, DollarSign
} from 'lucide-react';
import styles from './courseDetail.module.css';
import Modal from '@/components/ui/Modal';
import EnquiryForm from '@/components/core/EnquiryForm';
import CalendarScheduler from '@/components/sections/CalendarScheduler';
import Toast from '@/components/ui/Toast';
import SchemaMarkup from '@/components/core/SchemaMarkup';
import { initialCourses } from '@/utils/data';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(0);
  
  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (slug) {
      const found = initialCourses.find((c: any) => c.slug === slug);
      if (found) {
        setCourse(found);
      }
      setLoading(false);
    }
  }, [slug]);

  const handleEnquirySuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
    setIsEnquiryOpen(false);
  };

  const handleBookingSuccess = (msg: string) => {
    setToastType('success');
    setToastMessage(msg);
  };

  const handleEnquiryFailure = (msg: string) => {
    setToastType('error');
    setToastMessage(msg);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Retrieving course credentials from CMS...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.errorContainer}>
        <h3>Program Not Found</h3>
        <p>The requested curriculum slug does not exist in our system.</p>
        <button onClick={() => router.push('/courses')} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      {/* Course Dynamic Schema LD-JSON */}
      <SchemaMarkup type="Course" data={course} />

      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <button onClick={() => router.push('/courses')} className={styles.breadcrumb}>
            <ArrowLeft size={14} /> Back to Catalog
          </button>
          
          <div className={styles.heroBadge}>
            <Cpu size={14} />
            <span>Premium Industry Accreditation</span>
          </div>

          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.tagline}>{course.tagline}</p>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{course.duration} Program</span>
            </div>
            <div className={styles.metaItem}>
              <Star size={16} className={styles.starIcon} />
              <span>{course.rating} / 5.0 Rating</span>
            </div>
            <div className={styles.metaItem}>
              <Users size={16} />
              <span>{course.enrolledStudents.toLocaleString()} Alumni enrolled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid split */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left Col - curriculum & info */}
            <div className={styles.leftCol}>
              {/* Description */}
              <div className="glass-panel">
                <div className={styles.cardPadding}>
                  <h3 className={styles.cardTitle}>Program Overview</h3>
                  <p className={styles.descText}>{course.description}</p>

                  <h4 className={styles.subCardTitle}>Key Skills Mastered:</h4>
                  <div className={styles.skillsGrid}>
                    {course.skillsAcquired.map((skill: string, i: number) => (
                      <span key={i} className={styles.skillTag}>
                        <CheckCircle2 size={14} className={styles.checkIcon} />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* In-depth curriculum Accordion */}
              <div className={styles.curriculumBox}>
                <div className={styles.curriculumHeader}>
                  <FileText size={20} />
                  <h3>Structured Syllabus Overview</h3>
                </div>

                <div className={styles.accordion}>
                  {course.curriculum.map((module: any, idx: number) => (
                    <div 
                      key={idx} 
                      className={`${styles.moduleItem} ${activeModuleIdx === idx ? styles.activeModule : ''}`}
                    >
                      <button
                        onClick={() => setActiveModuleIdx(activeModuleIdx === idx ? null : idx)}
                        className={styles.moduleBtn}
                      >
                        <div className={styles.moduleMeta}>
                          <span className={styles.moduleWeek}>{module.week}</span>
                          <h4 className={styles.moduleTitle}>{module.title}</h4>
                        </div>
                        {activeModuleIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {activeModuleIdx === idx && (
                        <div className={styles.moduleDetails}>
                          <div className={styles.topicsBox}>
                            <h5>Key Learning Units:</h5>
                            <ul>
                              {module.topics.map((t: string, i: number) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.assignmentBox}>
                            <h5>Practical Capstone Assignment:</h5>
                            <p>{module.practicalAssignment}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col - pricing & action triggers */}
            <div className={styles.rightCol}>
              <div className="glass-accent-panel">
                <div className={styles.sidebarContent}>
                  <div className={styles.priceHeader}>
                    <span className={styles.pricingLabel}>Special Admission Pricing:</span>
                    <div className={styles.pricing}>
                      <span className={styles.price}>{course.price}</span>
                      <span className={styles.originalPrice}>{course.originalPrice}</span>
                    </div>
                  </div>

                  <div className={styles.perksList}>
                    <div className={styles.perk}>
                      <Award size={16} />
                      <span>100% Placement Guarantee</span>
                    </div>
                    <div className={styles.perk}>
                      <Gift size={16} />
                      <span>Complimentary AI Tools Kit</span>
                    </div>
                    <div className={styles.perk}>
                      <Calendar size={16} />
                      <span>Flexible Weekend Cohorts</span>
                    </div>
                  </div>

                  <div className={styles.actionBtnGroup}>
                    <button 
                      onClick={() => setIsEnquiryOpen(true)}
                      className={styles.applyBtn}
                    >
                      Apply Now <Sparkles size={16} />
                    </button>
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className={styles.bookingBtn}
                    >
                      Book Free Live Demo
                    </button>
                  </div>

                  <p className={styles.seatsNote}>* Only 8 slots remaining for the upcoming cohort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* enquiry Lead Capture popup */}
      <Modal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} title={`Enroll in ${course.title}`}>
        <EnquiryForm
          onSuccess={handleEnquirySuccess}
          onFailure={handleEnquiryFailure}
          defaultCourseSlug={course.slug}
        />
      </Modal>

      {/* calendar Scheduler popup */}
      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title="Select live demo schedule">
        <CalendarScheduler
          onSuccess={handleBookingSuccess}
          onFailure={handleEnquiryFailure}
          onComplete={() => setIsBookingOpen(false)}
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
