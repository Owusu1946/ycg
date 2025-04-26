'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/ToastContainer';

interface ProductColor {
  name: string;
  hex: string;
  images: {
    front: string;
    back: string;
  };
}

interface ProductReview {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProductFeature {
  id: number;
  name: string;
  category: string;
  price: number;
  slug: string;
  isNew: boolean;
  rating: number;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  features: string[];
  careInstructions: string[];
  reviews?: ProductReview[];
}

export default function ProductDetails({ product }: { product: ProductFeature }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  
  // Update the current image when selectedColor changes
  useEffect(() => {
    // Reset view to front when color changes
    setCurrentView('front');
    setIsHoveringImage(false);
  }, [selectedColor]);

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
  };

  const handleMouseEnter = () => {
    setIsHoveringImage(true);
    setCurrentView('back');
  };

  const handleMouseLeave = () => {
    setIsHoveringImage(false);
    setCurrentView('front');
  };
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    showToast(
      `${quantity} ${selectedColor.name} ${product.name} (Size: ${selectedSize}) added to cart!`,
      'success',
      5000
    );
  };
  
  const handleBuyNow = () => {
    // In a real app, we would add to cart and then navigate to checkout
    // For now, just navigate to checkout with query params
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize,
      quantity: quantity,
      image: selectedColor.images.front
    };
    
    // Save as an array under 'checkoutItems' so checkout page can read it
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkoutItems', JSON.stringify([checkoutItem]));
    }
    
    router.push('/checkout');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
      {/* Left Column - Product Images */}
      <div>
        <div 
          className="relative h-[500px] md:h-[600px] bg-gray-100 rounded-lg overflow-hidden mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image 
            src={currentView === 'front' ? selectedColor.images.front : selectedColor.images.back} 
            alt={`${product.name} - ${selectedColor.name} - ${currentView} view`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          {product.isNew && (
            <div className="absolute top-4 left-4 z-10 bg-pink-500 text-white px-3 py-1 rounded font-medium">
              New Arrival
            </div>
          )}
          
          {/* View indicator */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs py-1 px-3 rounded-full">
              {isHoveringImage ? 'Back View' : 'Front View'} - Hover to see {isHoveringImage ? 'front' : 'back'}
            </div>
          </div>
        </div>
        
        {/* Thumbnail Color Gallery */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color)}
              className={`relative aspect-square bg-gray-100 rounded cursor-pointer hover:opacity-90 transition border-2 ${
                selectedColor.name === color.name 
                  ? 'border-pink-500' 
                  : 'border-transparent'
              }`}
              aria-label={`Select ${color.name} color`}
            >
              <div 
                className="absolute inset-0 m-1 rounded" 
                style={{backgroundColor: color.hex}}
              />
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Right Column - Product Info & Options */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-500 mt-1">{product.category} T-Shirt</p>
        
        {/* Rating */}
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-pink-400" : "text-gray-300"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-500">
            {product.rating} rating · {product.reviews?.length || 0} reviews
          </span>
        </div>
        
        {/* Price */}
        <div className="mt-6">
          <p className="text-3xl font-bold text-gray-900">GH₵{product.price.toFixed(2)}</p>
          <p className="text-gray-500 mt-1">Free delivery on orders over GH₵200</p>
        </div>
        
        {/* Selected Color */}
        <div className="mt-6 flex items-center">
          <span className="text-gray-700 font-medium">Selected Color:</span>
          <span className="ml-2 flex items-center">
            <span 
              className="inline-block w-4 h-4 rounded-full mr-1"
              style={{backgroundColor: selectedColor.hex}} 
            ></span>
            {selectedColor.name}
          </span>
        </div>
        
        {/* Short Description */}
        <p className="mt-4 text-gray-700">{product.description}</p>
        
        {/* Size Selection */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <button className="text-sm font-medium text-pink-500 hover:text-pink-600">Size Guide</button>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 text-sm border rounded-md ${
                  selectedSize === size
                    ? 'bg-pink-50 border-pink-500 text-pink-500 font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Color Selection */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`flex items-center py-2 px-3 text-sm border rounded-md ${
                  selectedColor.name === color.name
                    ? 'bg-pink-50 border-pink-500 text-pink-500 font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <span 
                  className="inline-block w-4 h-4 rounded-full mr-2"
                  style={{backgroundColor: color.hex}} 
                ></span>
                {color.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Quantity Selection */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          
          <div className="flex items-center w-36 h-12 mt-2">
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
            <div className="flex-1 h-full border-t border-b border-gray-300 flex items-center justify-center font-medium text-lg">
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
        
        {/* Add to Cart and Buy Now Buttons */}
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-4 px-6 rounded-md font-medium text-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
          >
            Add to Cart
          </button>
          
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full bg-white text-pink-500 border-2 border-pink-500 py-4 px-6 rounded-md font-medium text-lg hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
          >
            Buy Now
          </button>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex space-x-8 overflow-x-auto pb-2 border-b border-gray-200 scrollbar-hide">
            <button
              className={`pb-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-b-2 border-pink-500 text-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'features'
                  ? 'border-b-2 border-pink-500 text-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`pb-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'care'
                  ? 'border-b-2 border-pink-500 text-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('care')}
            >
              Care Instructions
            </button>
            <button
              className={`pb-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-pink-500 text-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>
          
          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>{product.description}</p>
                <p className="mt-4">
                  Our t-shirts are designed with both comfort and style in mind. Each piece is carefully crafted using 
                  high-quality materials to ensure durability and a perfect fit. Whether you&apos;re looking for everyday basics
                  or statement pieces, our collection has something for everyone.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            
            {activeTab === 'care' && (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={i < review.rating ? "currentColor" : "none"}
                                stroke="currentColor"
                                className={`w-4 h-4 ${i < review.rating ? "text-pink-400" : "text-gray-300"}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < review.rating ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
                )}

                {/* Add a review button */}
                <div className="mt-6">
                  <button 
                    className="inline-flex items-center text-pink-500 hover:text-pink-600"
                    onClick={() => showToast('Review feature coming soon!', 'info')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="mt-12 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-900">Free returns within 30 days</h3>
            <p className="mt-1 text-sm text-gray-500">Not the right fit? No problem. We&apos;ll give you a full refund.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 