'use client';

import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle newsletter signup
    console.log('Subscribed email:', email);
    setEmail('');
    alert('Thanks for subscribing!');
  };

  return (
    <footer className="bg-pink-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/plain" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Plain T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/collections/branded" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Branded T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/collections/new" className="text-gray-600 hover:text-pink-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">Help & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/customer-service" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-600 hover:text-pink-500 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive offers and new t-shirt drops.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-pink-100">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="https://instagram.com" className="text-gray-600 hover:text-pink-500" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" className="text-gray-600 hover:text-pink-500" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-1.745 0-2.397.829-2.397 2.39v1.59h3.402l-.442 3.667h-2.96v7.98H9.101z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-pink-500" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://tiktok.com" className="text-gray-600 hover:text-pink-500" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 YCS. All rights reserved.</p>
              <div className="flex space-x-4 mt-2">
                <Link href="/privacy-policy" className="hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-pink-500 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 