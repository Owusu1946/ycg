'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { showToast } from '@/components/ui/ToastContainer';

// This is a server component as it doesn't need interactivity
// In a real app, this data would come from an API or backend
const featuredProducts = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    category: 'Plain',
    price: 24.99,
    image: '/images/products/hero1.jpg',
    slug: 'classic-white-tshirt',
    isNew: true,
    rating: 4.8,
    description: 'Our premium classic white t-shirt made from 100% organic cotton. Comfortable, durable, and perfect for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
  },
  {
    id: 2,
    name: 'Black Essential T-Shirt',
    category: 'Plain',
    price: 24.99,
    image: '/images/products/hero1.jpg',
    slug: 'black-essential-tshirt',
    isNew: false,
    rating: 4.9,
    description: 'A wardrobe staple, our black essential t-shirt offers superior comfort with a modern fit. Made from high-quality cotton blend.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['Black', 'White', 'Gray', 'Navy'],
  },
  {
    id: 3,
    name: 'Vintage Logo T-Shirt',
    category: 'Branded',
    price: 34.99,
    image: '/images/products/hero1.jpg',
    slug: 'vintage-logo-tshirt',
    isNew: true,
    rating: 4.7,
    description: 'Our vintage logo t-shirt features a distressed YCS print. Soft fabric with a slightly fitted cut for a stylish retro look.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['White', 'Gray', 'Black'],
  },
  {
    id: 4,
    name: 'Pastel Pink T-Shirt',
    category: 'Plain',
    price: 29.99,
    image: '/images/products/hero1.jpg',
    slug: 'pastel-pink-tshirt',
    isNew: true,
    rating: 4.6,
    description: 'A soft pastel pink t-shirt with a relaxed fit. Made from lightweight cotton for maximum comfort in warm weather.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['Pink', 'Blue', 'Mint', 'Lavender'],
  },
  {
    id: 5,
    name: 'Graphic Print T-Shirt',
    category: 'Branded',
    price: 39.99,
    image: '/images/products/hero1.jpg',
    slug: 'graphic-print-tshirt',
    isNew: false,
    rating: 4.5,
    description: 'Bold graphic print t-shirt featuring original artwork. Made from premium cotton with a contemporary fit.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['White', 'Black'],
  },
  {
    id: 6,
    name: 'Striped T-Shirt',
    category: 'Plain',
    price: 29.99,
    image: '/images/products/hero1.jpg',
    slug: 'striped-tshirt',
    isNew: false,
    rating: 4.4,
    description: 'Classic horizontal striped t-shirt with a modern twist. Comfortable fit with durable stitching for long-lasting wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy/White', 'Black/White', 'Gray/White'],
  },
  {
    id: 7,
    name: 'Urban Art T-Shirt',
    category: 'Branded',
    price: 44.99,
    image: '/images/products/hero1.jpg',
    slug: 'urban-art-tshirt',
    isNew: true,
    rating: 4.6,
    description: 'Urban art inspired t-shirt with unique street art designs. Premium quality fabric with a comfortable, relaxed fit.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['White', 'Black', 'Gray'],
  },
  {
    id: 8,
    name: 'Navy Blue T-Shirt',
    category: 'Plain',
    price: 24.99,
    image: '/images/products/hero1.jpg',
    slug: 'navy-blue-tshirt',
    isNew: false,
    rating: 4.9,
    description: 'Classic navy blue t-shirt made from soft cotton. Versatile, comfortable, and perfect for any casual occasion.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'White', 'Gray'],
  },
];

// Quick View Modal Component
const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose 
}: { 
  product: typeof featuredProducts[0], 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // In a real app, we would add the product to the cart here
    showToast(
      `${quantity} ${selectedColor} ${product.name} (Size: ${selectedSize}) added to cart!`,
      'success',
      5000
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background overlay - semi-transparent */}
      <div 
        className="fixed inset-0 bg-white/10 backdrop-blur-md transition-all duration-300" 
        aria-hidden="true"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto z-10">
        <div className="relative">
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white text-gray-500 hover:text-pink-500 focus:outline-none shadow-md"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content container */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:gap-8">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover object-center"
                  />
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                      New Arrival
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="md:w-1/2 pt-6 md:pt-0">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2" id="modal-title">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-pink-400" : "text-gray-300"}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ${product.price.toFixed(2)}
                </div>
                
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                {/* Size Selector */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm rounded-md border ${selectedSize === size 
                          ? 'border-pink-500 bg-pink-50 text-pink-500 font-medium' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selector */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm rounded-md border ${selectedColor === color 
                          ? 'border-pink-500 bg-pink-50 text-pink-500 font-medium' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Quantity</h4>
                  <div className="flex items-center w-32 h-10">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="flex-1 h-full rounded-l-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="flex-1 h-full border-t border-b border-gray-300 flex items-center justify-center font-medium">
                      {quantity}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="flex-1 h-full rounded-r-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-md font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-md font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-colors text-center"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: typeof featuredProducts[0] }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 aspect-[3/4]">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
            New Arrival
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => setIsQuickViewOpen(true)}
            className="bg-white text-pink-500 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors transform -translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            Quick View
          </button>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">
              <Link href={`/product/${product.slug}`} className="hover:text-pink-500">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-pink-400" : "text-gray-300"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal 
          product={product} 
          isOpen={isQuickViewOpen} 
          onClose={() => setIsQuickViewOpen(false)} 
        />
      )}
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trending T-Shirts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular t-shirts, designed for comfort and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/collections"
            className="inline-block px-8 py-3 border-2 border-pink-500 text-pink-500 font-medium hover:bg-pink-500 hover:text-white transition-colors rounded-md"
          >
            View All T-Shirts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 