'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-pink-500">
              YCS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/collections/plain" className="text-gray-700 hover:text-pink-500 font-medium">
              Plain T-Shirts
            </Link>
            <Link href="/collections/branded" className="text-gray-700 hover:text-pink-500 font-medium">
              Branded T-Shirts
            </Link>
            <Link href="/collections/new" className="text-gray-700 hover:text-pink-500 font-medium">
              New Arrivals
            </Link>
            <Link href="/collections/sale" className="text-gray-700 hover:text-pink-500 font-medium">
              Sale
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-500 font-medium">
              About Us
            </Link>
          </nav>

          {/* Right Section - Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg p-4 transition-all">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <input 
                      type="text" 
                      placeholder="Search for t-shirts..." 
                      className="w-full px-4 py-2 focus:outline-none"
                    />
                    <button className="bg-pink-500 text-white p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account */}
            <Link href="/account" className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-500 hover:text-pink-500 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">3</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-500 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/collections/plain" className="text-gray-700 hover:text-pink-500 font-medium">
                Plain T-Shirts
              </Link>
              <Link href="/collections/branded" className="text-gray-700 hover:text-pink-500 font-medium">
                Branded T-Shirts
              </Link>
              <Link href="/collections/new" className="text-gray-700 hover:text-pink-500 font-medium">
                New Arrivals
              </Link>
              <Link href="/collections/sale" className="text-gray-700 hover:text-pink-500 font-medium">
                Sale
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-500 font-medium">
                About Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 