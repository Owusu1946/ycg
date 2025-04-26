'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ToastContainer with no SSR to avoid hydration issues
const ToastContainer = dynamic(
  () => import('../ui/ToastContainer'),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Providers; 