'use strict';

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${type === 'success' ? styles.success : styles.error}`}>
      <div className={styles.iconContainer}>
        {type === 'success' ? (
          <CheckCircle className={styles.iconSuccess} size={20} />
        ) : (
          <AlertCircle className={styles.iconError} size={20} />
        )}
      </div>
      <p className={styles.message}>{message}</p>
      <button onClick={onClose} className={styles.closeBtn} aria-label="Close Toast">
        <X size={16} />
      </button>
    </div>
  );
}
