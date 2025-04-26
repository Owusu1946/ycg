'use client';

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call to newsletter service
    setTimeout(() => {
      if (email.includes('@') && email.includes('.')) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        setError('Please enter a valid email address');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-pink-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-14 w-14 opacity-90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with YCS</h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and much more. Don&apos;t miss out on our premium collection updates!
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">You&apos;re all set!</h3>
              <p>Thank you for subscribing to our newsletter. Your first discount code is on its way!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  {error && <p className="mt-1 text-sm text-pink-200 text-left">{error}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-white text-pink-500 font-medium rounded-md transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
                      <span className="ml-2">Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              <p className="mt-3 text-sm opacity-80">
                By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a> and consent to receive marketing emails.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 