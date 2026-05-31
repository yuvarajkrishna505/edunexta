'use client';

import React, { useState } from 'react';
import { Terminal, Send, Sparkles, Wand2, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';
import styles from './AiTools.module.css';

export default function AiTools() {
  const [activeTab, setActiveTab] = useState<'seo' | 'ad' | 'lead'>('seo');
  const [inputVal, setInputVal] = useState('organic skincare');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<any>({
    title: '10 Organic Skincare Secrets for Radiant Skin in 2026',
    meta: 'Discover the top organic skincare ingredients and routines designed to deliver glowing, youthful skin naturally. Read our expert dermatologist guides.',
    keywords: ['clean beauty routine', 'organic moisturizers', 'natural glow secrets'],
    score: 94
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (activeTab === 'seo') {
        setOutput({
          title: `The Ultimate Guide to ${inputVal.charAt(0).toUpperCase() + inputVal.slice(1)}: Scaling Organic Traffic`,
          meta: `Learn the exact blueprints to rank #1 on Google for ${inputVal}. Get access to audit templates, expert checklists, and semantic structures.`,
          keywords: [`${inputVal} strategy`, `best ${inputVal} tools`, `how to rank for ${inputVal}`],
          score: 96
        });
      } else if (activeTab === 'ad') {
        setOutput({
          hook: `🔥 Stop wasting budgets on untargeted marketing!`,
          primaryText: `Ready to master AI performance marketing? Learn to scale paid campaigns from the world's leading media buyers. Claim your free demo slot.`,
          cta: `Learn More / Apply Now`,
          ctrEstimate: '4.85% (High)',
          score: 98
        });
      } else if (activeTab === 'lead') {
        const visits = parseInt(inputVal) || 4;
        const score = Math.min(visits * 18, 99);
        setOutput({
          qualification: score > 75 ? 'MQL_HIGH_INTENT' : 'COLD_NURTURE',
          score: score,
          nextAction: score > 75 ? 'WhatsApp Advisor callback trigger' : 'Enqueue to Weekly AI Newsletter',
          routedTo: score > 75 ? 'Siddharth Roy (Meta APAC Mentor)' : 'Automated Email Bot'
        });
      }
      setIsGenerating(false);
    }, 1200);
  };

  const handleTabChange = (tab: 'seo' | 'ad' | 'lead') => {
    setActiveTab(tab);
    if (tab === 'seo') {
      setInputVal('organic skincare');
      setOutput({
        title: '10 Organic Skincare Secrets for Radiant Skin in 2026',
        meta: 'Discover the top organic skincare ingredients and routines designed to deliver glowing, youthful skin naturally. Read our expert dermatologist guides.',
        keywords: ['clean beauty routine', 'organic moisturizers', 'natural glow secrets'],
        score: 94
      });
    } else if (tab === 'ad') {
      setInputVal('AI Marketing Institute');
      setOutput({
        hook: '🚀 Master AI-Powered Marketing or Get Left Behind!',
        primaryText: 'Learn to automate 80% of marketing tasks using advanced LLM prompts, programmatic ads, and dynamic webhooks. Register for free demo.',
        cta: 'Apply in 60 seconds',
        ctrEstimate: '5.12% (Exceptional)',
        score: 97
      });
    } else if (tab === 'lead') {
      setInputVal('5'); // mock page visits
      setOutput({
        qualification: 'MQL_HIGH_INTENT',
        score: 90,
        nextAction: 'WhatsApp Advisor callback trigger',
        routedTo: 'Siddharth Roy (Meta APAC Mentor)'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Sparkles size={20} className={styles.sparkleIcon} />
        <h3 className={styles.title}>EduNexta AI Marketing Sandbox</h3>
        <p className={styles.subtitle}>Test actual AI tools taught in our programs. Experience the power of automation.</p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          onClick={() => handleTabChange('seo')} 
          className={`${styles.tabBtn} ${activeTab === 'seo' ? styles.activeTab : ''}`}
        >
          SEO Engine
        </button>
        <button 
          onClick={() => handleTabChange('ad')} 
          className={`${styles.tabBtn} ${activeTab === 'ad' ? styles.activeTab : ''}`}
        >
          Ad Creative Copy
        </button>
        <button 
          onClick={() => handleTabChange('lead')} 
          className={`${styles.tabBtn} ${activeTab === 'lead' ? styles.activeTab : ''}`}
        >
          CRM Lead Scoring
        </button>
      </div>

      <div className={styles.sandbox}>
        {/* Input Panel */}
        <div className={styles.panelInput}>
          <h4 className={styles.panelTitle}>
            {activeTab === 'seo' && 'Semantic Content Optimizer'}
            {activeTab === 'ad' && 'High-Conversion Ad Generator'}
            {activeTab === 'lead' && 'HubSpot Scoring Model Simulator'}
          </h4>

          <div className={styles.inputArea}>
            <label className={styles.inputLabel}>
              {activeTab === 'seo' && 'Enter Target Keyword / Topic:'}
              {activeTab === 'ad' && 'Enter Brand / Product Name:'}
              {activeTab === 'lead' && 'Enter Landing Page Visits (1-10):'}
            </label>
            
            <div className={styles.inputWrapper}>
              <input 
                type={activeTab === 'lead' ? 'number' : 'text'}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className={styles.input}
                placeholder="Type here..."
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={styles.generateBtn}
              >
                {isGenerating ? <RefreshCw className={styles.spin} /> : <Wand2 size={16} />}
              </button>
            </div>
          </div>

          <div className={styles.terminalBox}>
            <div className={styles.terminalHeader}>
              <Terminal size={14} />
              <span>Real-time Log stream</span>
            </div>
            <div className={styles.terminalLogs}>
              <p className={styles.log}>[System] Initializing EduNexta LLM connector...</p>
              <p className={styles.log}>[System] Target vector: {inputVal}</p>
              {isGenerating ? (
                <p className={`${styles.log} ${styles.logPulse}`}>[AI] Generating optimized vector weights...</p>
              ) : (
                <p className={styles.logSuccess}>[AI] Completed. Output synchronized with local cache.</p>
              )}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className={styles.panelOutput}>
          <div className={styles.outputHeader}>
            <h4 className={styles.panelTitle}>AI Output Engine</h4>
            <div className={styles.qualityScore}>
              <BarChart2 size={14} />
              <span>Score: {output.score}%</span>
            </div>
          </div>

          <div className={styles.outputArea}>
            {activeTab === 'seo' && (
              <div className={styles.seoOutput}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Generated Meta Title:</span>
                  <div className={styles.fieldValue}>{output.title}</div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Optimized Meta Description:</span>
                  <div className={styles.fieldValue}>{output.meta}</div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Suggested Semantic LSI Keywords:</span>
                  <div className={styles.keywordsGrid}>
                    {output.keywords?.map((k: string, i: number) => (
                      <span key={i} className={styles.keywordTag}>#{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ad' && (
              <div className={styles.adOutput}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Viral Hook line:</span>
                  <div className={styles.fieldValue}>{output.hook}</div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Ad Primary Copy Text:</span>
                  <div className={styles.fieldValue}>{output.primaryText}</div>
                </div>

                <div className={styles.adFooter}>
                  <div>
                    <span className={styles.fieldLabel}>Suggested CTA:</span>
                    <div className={styles.badgeCta}>{output.cta}</div>
                  </div>
                  <div>
                    <span className={styles.fieldLabel}>Predicted CTR:</span>
                    <div className={styles.ctrValue}>{output.ctrEstimate}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lead' && (
              <div className={styles.leadOutput}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>HubSpot Qualifier Status:</span>
                  <div className={`${styles.fieldValue} ${output.score > 75 ? styles.mqlBadge : styles.coldBadge}`}>
                    {output.qualification}
                  </div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Automated Workflow Route:</span>
                  <div className={styles.fieldValue}>{output.nextAction}</div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Assigned Admissions Expert:</span>
                  <div className={styles.fieldValue}>{output.routedTo}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
