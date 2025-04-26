'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Hero = () => {
  // State for parallax effect and animations
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  // Add keyframes for the underline animation
  useEffect(() => {
    // Create a style element for the keyframes
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes underline {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
        100% { transform: translateX(100%); }
      }
      .animate-underline {
        animation: underline 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);

    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Add animation class after component mounts
    setLoaded(true);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gray-900/20 z-10"></div>
      
      {/* Multiple layered background images for depth */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <Image
          src="/images/hero1.jpg"
          alt="Model showcasing our latest t-shirt collection"
          fill
          priority
          quality={95}
          className="object-cover scale-105"
          sizes="100vw"
        />
      </div>
      
      {/* Gradient overlay with animated appearance */}
      <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/70 via-pink-500/50 to-transparent transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
      
      {/* Content with staggered animations */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center z-20">
        <div className={`max-w-2xl transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-pink-500/10 backdrop-blur-sm p-2 inline-block rounded-lg mb-3 border-l-4 border-pink-500">
            <span className="text-white text-sm font-medium tracking-wider">PREMIUM COLLECTION</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-white leading-tight">
            <span className="block">Express Your</span>
            <span className="block text-white relative">
              Style in 
              <span className="relative inline-block">
                <span className="relative z-10">YCG</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-transparent overflow-hidden">
                  <span className="w-full h-full bg-pink-500/40 rounded-sm absolute animate-underline"></span>
                </span>
              </span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light leading-relaxed max-w-xl">
            Premium quality plain and branded t-shirts designed for comfort, style and self-expression.
          </p>
          
          <div className="flex flex-wrap gap-5 items-center">
            <Link 
              href="/collections/new"
              className="group px-8 py-4 bg-white text-pink-500 font-bold rounded-md relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-pink-500/20"
            >
              <span className="relative z-10">Shop New Arrivals</span>
              <span className="absolute inset-0 bg-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-pink-100 transition-all duration-300"></span>
            </Link>
            <Link 
              href="/collections"
              className="group px-8 py-4 bg-pink-500 text-white font-bold rounded-md relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-pink-500/30"
            >
              <span className="relative z-10">Explore Collection</span>
              <span className="absolute bottom-0 left-0 w-0 h-full bg-pink-600 group-hover:w-full transition-all duration-300 -z-0"></span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-3 ml-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs text-white">★</div>
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-xs text-white">★</div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-xs text-white">★</div>
              </div>
              <span className="text-white/80 text-sm">1200+ 5-star reviews</span>
            </div>
          </div>
          
          <div className="mt-10 flex items-center space-x-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-white/80 text-sm">Free shipping</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-white/80 text-sm">100% cotton</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-white/80 text-sm">30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-sm font-light mb-2 tracking-widest">SCROLL TO DISCOVER</span>
        <div className="w-7 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full animate-[bounce_1.5s_infinite]" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;