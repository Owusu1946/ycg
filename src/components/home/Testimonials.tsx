'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    title: 'Fashion Blogger',
    image: '/images/testimonials/person-1.jpg',
    content: 'YCS t-shirts are my absolute go-to for both comfort and style. The fabric quality is exceptional, and I love how they maintain their shape and color even after multiple washes!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Graphic Designer',
    image: '/images/testimonials/person-2.jpg',
    content: 'As someone who cares about sustainability, I appreciate YCS\'s commitment to ethical production. Plus, their branded designs are super creative and always get me compliments!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophie Williams',
    title: 'Marketing Executive',
    image: '/images/testimonials/person-3.jpg',
    content: 'The customer service at YCS is exceptional. I had an issue with sizing, and they were incredibly helpful in finding the perfect fit. Now I have t-shirts in every color!',
    rating: 4,
  },
  {
    id: 4,
    name: 'James Rodriguez',
    title: 'Photographer',
    image: '/images/testimonials/person-4.jpg',
    content: 'YCS plain t-shirts are perfect for my work - comfortable for long photoshoots and they layer well under everything. The fabric breathes nicely even during summer sessions.',
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image 
            src={testimonial.image} 
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-pink-400' : 'text-gray-200'}`}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      
      <p className="text-gray-600 flex-grow">{testimonial.content}</p>
      
      <div className="mt-4 text-pink-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 3; // Number of testimonials visible at once
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - visibleTestimonials ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from t-shirt lovers who have experienced YCS quality.
          </p>
        </div>
        
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Mobile/Tablet carousel */}
        <div className="lg:hidden">
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-pink-500' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 