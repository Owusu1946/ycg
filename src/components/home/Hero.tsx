'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero1.jpg"
          alt="Model showcasing our latest t-shirt collection"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="block">Express Your</span>
            <span className="block text-white">
              Style in YCS
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white">
            Premium quality plain and branded t-shirts designed for comfort, style and self-expression.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/collections/new"
              className="px-8 py-3 bg-white text-pink-500 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link 
              href="/collections"
              className="px-8 py-3 bg-pink-500 text-white font-medium rounded-md hover:bg-pink-600 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
        <span className="text-sm mb-2">Scroll to discover</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 