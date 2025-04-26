'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastProps } from './Toast';

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Wrap removeToast in useCallback since it's used by addToast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Wrap addToast in useCallback to prevent it from changing on every render
  const addToast = useCallback(
    (message: string, type: ToastProps['type'] = 'success', duration?: number) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        { id, message, type, duration, onClose: removeToast },
      ]);
    },
    [removeToast]
  );

  useEffect(() => {
    setIsMounted(true);
    
    const handleToast = (event: CustomEvent<{ message: string; type?: ToastProps['type']; duration?: number }>) => {
      const { message, type, duration } = event.detail;
      addToast(message, type, duration);
    };
    
    window.addEventListener('toast', handleToast as EventListener);
    
    return () => {
      window.removeEventListener('toast', handleToast as EventListener);
    };
  }, [addToast]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ marginTop: `${index * 4}px` }}>
          <Toast {...toast} />
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;

// Helper function to trigger toasts from anywhere
export const showToast = (
  message: string, 
  type: ToastProps['type'] = 'success', 
  duration?: number
) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message, type, duration },
      })
    );
  }
};