'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Sparkles, Plus, Trash2, Edit2, Check, RefreshCw, Star, 
  HelpCircle, FileText, Settings, Database
} from 'lucide-react';
import styles from './admin.module.css';
import Toast from '@/components/ui/Toast';

export default function AdminCmsDashboard() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'faqs' | 'courses'>('testimonials');
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Edit / Add Forms states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const fetchCmsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cms');
      if (response.ok) {
        const data = await response.json();
        setDb(data);
      }
    } catch (err) {
      console.error('Failed to load CMS data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsData();
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setToastType(type);
    setToastMessage(msg);
  };

  const handleCmsAction = async (type: string, action: string, data: any) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, action, data })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setDb(resData.db);
        triggerToast(`CMS database synchronized successfully!`, 'success');
        setEditingItem(null);
        setNewItem(null);
      } else {
        triggerToast(resData.error || 'Failed to update CMS data.', 'error');
      }
    } catch (error) {
      triggerToast('Server sync failed. Check local file system write permissions.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className={styles.spin} size={30} />
        <p>Connecting to server-side JSON database...</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.ambientGlow}></div>

      {/* Hero Header */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.badge}>
            <Database size={14} />
            <span>Operational CMS Dashboard</span>
          </div>
          <h1 className={styles.title}>EduNexta Management Portal</h1>
          <p className={styles.subtitle}>
            Fulfill the dynamic CMS-ready requirements. Modify testimonials, FAQs, and syllabus curriculums in real-time. Changes are compiled and persisted to <code>cms_db.json</code>.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className={styles.dashboardSection}>
        <div className={styles.container}>
          {/* Tabs */}
          <div className={styles.tabsRow}>
            <button 
              onClick={() => { setActiveTab('testimonials'); setEditingItem(null); setNewItem(null); }}
              className={`${styles.tabBtn} ${activeTab === 'testimonials' ? styles.activeTab : ''}`}
            >
              <Star size={16} /> Student Testimonials
            </button>
            <button 
              onClick={() => { setActiveTab('faqs'); setEditingItem(null); setNewItem(null); }}
              className={`${styles.tabBtn} ${activeTab === 'faqs' ? styles.activeTab : ''}`}
            >
              <HelpCircle size={16} /> FAQ Manager
            </button>
            <button 
              onClick={() => { setActiveTab('courses'); setEditingItem(null); setNewItem(null); }}
              className={`${styles.tabBtn} ${activeTab === 'courses' ? styles.activeTab : ''}`}
            >
              <FileText size={16} /> Course Curriculums
            </button>
          </div>

          <div className={styles.contentGrid}>
            {/* Left Col - Data List */}
            <div className={styles.listCol}>
              <div className="glass-panel">
                <div className={styles.listCard}>
                  <div className={styles.listHeader}>
                    <h3>Seeded Records ({activeTab === 'testimonials' ? db?.testimonials?.length : activeTab === 'faqs' ? db?.faqs?.length : db?.courses?.length})</h3>
                    {activeTab !== 'courses' && (
                      <button 
                        onClick={() => {
                          setEditingItem(null);
                          setNewItem(
                            activeTab === 'testimonials' 
                              ? { name: '', role: '', company: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250', story: '', salaryGrowth: '+100% Growth', beforeSalary: '₹3.0 LPA', afterSalary: '₹6.0 LPA', beforeRole: 'Associate', afterRole: 'AI Lead' }
                              : { question: '', answer: '', category: 'General' }
                          );
                        }}
                        className={styles.addBtn}
                      >
                        <Plus size={16} /> Create Record
                      </button>
                    )}
                  </div>

                  <div className={styles.recordsList}>
                    {/* Render Testimonials */}
                    {activeTab === 'testimonials' && db?.testimonials?.map((t: any) => (
                      <div key={t.id} className={styles.recordItem}>
                        <div className={styles.recordMeta}>
                          <span className={styles.recordTitle}>{t.name}</span>
                          <span className={styles.recordSub}>{t.role} at {t.company}</span>
                        </div>
                        <div className={styles.recordActions}>
                          <button onClick={() => { setEditingItem(t); setNewItem(null); }} className={styles.editBtn} aria-label="Edit Testimonial"><Edit2 size={14} /></button>
                          <button onClick={() => handleCmsAction('testimonials', 'delete', { id: t.id })} className={styles.deleteBtn} aria-label="Delete Testimonial"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}

                    {/* Render FAQs */}
                    {activeTab === 'faqs' && db?.faqs?.map((f: any) => (
                      <div key={f.id} className={styles.recordItem}>
                        <div className={styles.recordMeta}>
                          <span className={styles.recordTitle}>{f.question}</span>
                          <span className={styles.recordSub}>Category: {f.category}</span>
                        </div>
                        <div className={styles.recordActions}>
                          <button onClick={() => { setEditingItem(f); setNewItem(null); }} className={styles.editBtn} aria-label="Edit FAQ"><Edit2 size={14} /></button>
                          <button onClick={() => handleCmsAction('faqs', 'delete', { id: f.id })} className={styles.deleteBtn} aria-label="Delete FAQ"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}

                    {/* Render Courses Curriculum */}
                    {activeTab === 'courses' && db?.courses?.map((c: any) => (
                      <div key={c.id} className={styles.recordItem}>
                        <div className={styles.recordMeta}>
                          <span className={styles.recordTitle}>{c.title}</span>
                          <span className={styles.recordSub}>{c.duration} - {c.modulesCount} Modules</span>
                        </div>
                        <div className={styles.recordActions}>
                          <button onClick={() => { setEditingItem(c); setNewItem(null); }} className={styles.editBtn} aria-label="Edit Curriculum"><Edit2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Editor Form */}
            <div className={styles.editorCol}>
              <div className="glass-panel">
                <div className={styles.editorCard}>
                  {editingItem ? (
                    <div className={styles.editorForm}>
                      <h3>Edit Record Details</h3>
                      
                      {activeTab === 'testimonials' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Company</label>
                            <input type="text" value={editingItem.company} onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Story text</label>
                            <textarea value={editingItem.story} onChange={(e) => setEditingItem({ ...editingItem, story: e.target.value })} rows={4} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Growth hike metric (e.g. +120% Hike)</label>
                            <input type="text" value={editingItem.salaryGrowth} onChange={(e) => setEditingItem({ ...editingItem, salaryGrowth: e.target.value })} />
                          </div>
                        </>
                      )}

                      {activeTab === 'faqs' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Question</label>
                            <input type="text" value={editingItem.question} onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Answer text</label>
                            <textarea value={editingItem.answer} onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })} rows={6} />
                          </div>
                        </>
                      )}

                      {activeTab === 'courses' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Course Title</label>
                            <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Price</label>
                            <input type="text" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })} />
                          </div>
                          <p className={styles.infoText}>To update full curriculum schedules, connect to database systems direct.</p>
                        </>
                      )}

                      <button 
                        onClick={() => handleCmsAction(activeTab, 'edit', editingItem)}
                        disabled={isSyncing}
                        className={styles.syncBtn}
                      >
                        {isSyncing ? 'Syncing files...' : <>Save Changes <Check size={16} /></>}
                      </button>
                    </div>
                  ) : newItem ? (
                    <div className={styles.editorForm}>
                      <h3>Add New Record</h3>
                      
                      {activeTab === 'testimonials' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input type="text" placeholder="e.g. Priyan Nair" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Company</label>
                            <input type="text" placeholder="e.g. Razorpay" onChange={(e) => setNewItem({ ...newItem, company: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Story text</label>
                            <textarea placeholder="Write story..." onChange={(e) => setNewItem({ ...newItem, story: e.target.value })} rows={4} />
                          </div>
                        </>
                      )}

                      {activeTab === 'faqs' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Question</label>
                            <input type="text" placeholder="Question" onChange={(e) => setNewItem({ ...newItem, question: e.target.value })} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>Answer text</label>
                            <textarea placeholder="Answer" onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })} rows={6} />
                          </div>
                        </>
                      )}

                      <button 
                        onClick={() => handleCmsAction(activeTab, 'add', newItem)}
                        disabled={isSyncing}
                        className={styles.syncBtn}
                      >
                        {isSyncing ? 'Creating file...' : <>Save New Record <Check size={16} /></>}
                      </button>
                    </div>
                  ) : (
                    <div className={styles.emptyEditor}>
                      <Settings size={40} className={styles.settingIcon} />
                      <h4>Record Editor Panel</h4>
                      <p>Select a record from the list or click &apos;Create Record&apos; to begin database operations.</p>
                    </div>
                  )}
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
