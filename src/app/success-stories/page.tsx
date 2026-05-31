'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trophy, TrendingUp, Star, Users, Play, Quote, ShieldCheck, ChevronRight, CheckCircle2
} from 'lucide-react';
import styles from './successStories.module.css';

export default function SuccessStoriesPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  // Interactive Growth Slider
  const [inputSalary, setInputSalary] = useState(3.5); // Initial salary in LPA

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const response = await fetch('/api/cms');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data.testimonials || []);
        }
      } catch (err) {
        console.error('Failed to load testimonials.', err);
      }
    };
    fetchCMS();
  }, []);

  // Compute standard growth outcomes
  const estimatedHikePercent = inputSalary < 5 ? 150 : inputSalary < 8 ? 120 : 90;
  const estimatedSalary = (inputSalary * (1 + estimatedHikePercent / 100)).toFixed(1);

  return (
    <main className={styles.main}>
      <div className={styles.ambientGlow}></div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.badge}>
            <Trophy size={14} />
            <span>95.4% Placement Success Rate</span>
          </div>
          <h1 className={styles.title}>Cracking Dream Placements</h1>
          <p className={styles.subtitle}>
            Read the inspiring transformation stories of our alumni who scaled from traditional sales, offline retail, and college classrooms into elite AI-powered marketing leaders.
          </p>
        </div>
      </section>

      {/* Interactive Salary Growth Calculator/Chart Widget */}
      <section className={styles.calculatorSection}>
        <div className={styles.container}>
          <div className="glass-panel">
            <div className={styles.calcContainer}>
              <div className={styles.calcInputBox}>
                <h3 className={styles.calcTitle}>Simulate Your Salary Growth Hikes</h3>
                <p className={styles.calcSubtitle}>Select your current annual salary and calculate potential package valuations post graduation.</p>
                
                <div className={styles.sliderBox}>
                  <div className={styles.sliderHeader}>
                    <span>Current Package:</span>
                    <span className={styles.sliderVal}>₹{inputSalary} LPA</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={inputSalary}
                    onChange={(e) => setInputSalary(parseFloat(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <div className={styles.rangeLabels}>
                    <span>₹2 LPA</span>
                    <span>₹8 LPA</span>
                    <span>₹15 LPA</span>
                  </div>
                </div>

                <div className={styles.benefitsCheck}>
                  <div className={styles.checkItem}>
                    <CheckCircle2 size={16} />
                    <span>Based on actual 2025 hiring indices</span>
                  </div>
                  <div className={styles.checkItem}>
                    <CheckCircle2 size={16} />
                    <span>Includes HubSpot and Meta certification credits</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Chart Indicator Display */}
              <div className={styles.calcOutputBox}>
                <div className={styles.outputItem}>
                  <span className={styles.outputLabel}>Estimated Placement Hike:</span>
                  <span className={styles.outputValHike}>+{estimatedHikePercent}% Growth</span>
                </div>

                <div className={styles.chartBarWrapper}>
                  <div className={styles.chartCol}>
                    <span className={styles.barLabel}>Before</span>
                    <div 
                      className={styles.barBefore} 
                      style={{ height: `${(inputSalary / 32) * 180 + 20}px` }}
                    >
                      ₹{inputSalary} LPA
                    </div>
                  </div>

                  <div className={styles.chartCol}>
                    <span className={styles.barLabelAccent}>Post EduNexta</span>
                    <div 
                      className={styles.barAfter} 
                      style={{ height: `${(parseFloat(estimatedSalary) / 32) * 180 + 20}px` }}
                    >
                      ₹{estimatedSalary} LPA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After student transformations cards */}
      <section className={styles.storiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Dynamic Career Shifts</h2>
            <p>From stagnant roles to high-growth leadership. Real salaries. Real proof.</p>
          </div>

          <div className={styles.grid}>
            {testimonials.map((t) => (
              <div key={t.id} className="glass-accent-panel">
                <div className={styles.storyCard}>
                  <div className={styles.storyHeader}>
                    <img src={t.image} alt={t.name} className={styles.storyImg} />
                    <div>
                      <h4 className={styles.storyName}>{t.name}</h4>
                      <p className={styles.storySub}>{t.role} @ <strong>{t.company}</strong></p>
                    </div>
                  </div>

                  <div className={styles.storyBody}>
                    <Quote size={24} className={styles.quoteIcon} />
                    <p className={styles.storyText}>{t.story}</p>
                  </div>

                  <div className={styles.transformationGrid}>
                    <div className={styles.transitionBox}>
                      <span className={styles.transTitle}>Previous Role</span>
                      <p className={styles.transVal}>{t.beforeRole}</p>
                      <span className={styles.transSal}>{t.beforeSalary}</span>
                    </div>
                    <div className={styles.arrowCol}>
                      <ChevronRight size={24} />
                    </div>
                    <div className={styles.transitionBoxAccent}>
                      <span className={styles.transTitleAccent}>AI Growth Role</span>
                      <p className={styles.transVal}>{t.afterRole}</p>
                      <span className={styles.transSalAccent}>{t.afterSalary}</span>
                    </div>
                  </div>

                  <div className={styles.hikeTag}>
                    <TrendingUp size={16} />
                    <span>Verified {t.salaryGrowth} Hike</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video testimonials section */}
      <section className={styles.videoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Video Testimonial Highlights</h2>
            <p>Watch student interviews sharing details about curriculum pipelines and hiring experiences.</p>
          </div>

          <div className={styles.videoGrid}>
            <div className="glass-panel">
              <div className={styles.videoCard}>
                <div className={styles.thumbnailBox}>
                  <div className={styles.playBtn}><Play size={20} fill="#FFFFFF" /></div>
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" alt="Video thumbnail" className={styles.thumbImg} />
                </div>
                <div className={styles.videoMeta}>
                  <h4>Week 6 Content Engine Review</h4>
                  <p>Aishwarya Nair describes how AI automation tools saved Nykaa over 30 hours per week.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel">
              <div className={styles.videoCard}>
                <div className={styles.thumbnailBox}>
                  <div className={styles.playBtn}><Play size={20} fill="#FFFFFF" /></div>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" alt="Video thumbnail" className={styles.thumbImg} />
                </div>
                <div className={styles.videoMeta}>
                  <h4>1-on-1 Meta Mentorship review</h4>
                  <p>Rahul Sharma highlights how mock interviews helped him crack his digital role.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
