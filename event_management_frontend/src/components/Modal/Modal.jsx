import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

/**
 * Accessible modal rendered via React Portal.
 * - Focus trap keeps focus inside the modal when open
 * - Restores focus to the trigger element on close
 * - Closes on ESC and backdrop click (optional)
 * - ARIA attributes: role="dialog", aria-modal, labelledby/describedby
 */
// PUBLIC_INTERFACE
export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
  closeOnBackdrop = true,
}) {
  const modalRootRef = useRef(null);
  const contentRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.setAttribute('id', 'modal-root');
      document.body.appendChild(root);
    }
    modalRootRef.current = root;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Save last focused element to restore later
    lastFocusedRef.current = document.activeElement;

    // Lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus first focusable element inside modal
    const focusFirst = () => {
      const focusables = getFocusable(contentRef.current);
      if (focusables.length) focusables[0].focus();
      else contentRef.current?.focus();
    };
    const t = setTimeout(focusFirst, 0);

    // ESC handler
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
      }
      // Focus trap (tab/shift+tab)
      if (e.key === 'Tab') {
        const focusables = getFocusable(contentRef.current);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      // Restore focus to trigger
      if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const onBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen || !modalRootRef.current) return null;

  const dialog = (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={onBackdropClick}
      aria-hidden="true"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        ref={contentRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, modalRootRef.current);
}

function getFocusable(root) {
  if (!root) return [];
  const selectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(root.querySelectorAll(selectors.join(','))).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}
