import Link from 'next/link';
import Image from 'next/image';

// Sample categories data
const categories = [
  {
    id: 1,
    name: 'Plain T-Shirts',
    description: 'Classic, timeless and versatile everyday essentials',
    image: '/images/categories/hero1.jpg',
    slug: 'plain',
  },
  {
    id: 2,
    name: 'Branded T-Shirts',
    description: 'Express yourself with our unique graphic designs',
    image: '/images/categories/hero1.jpg',
    slug: 'branded',
  },
  {
    id: 3,
    name: 'New Arrivals',
    description: 'Our latest and freshest t-shirt designs',
    image: '/images/categories/hero1.jpg',
    slug: 'new',
  },
  {
    id: 4,
    name: 'Sale',
    description: 'Premium quality t-shirts at special prices',
    image: '/images/categories/hero1.jpg',
    slug: 'sale',
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect t-shirt for any style and occasion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/collections/${category.slug}`}
              className="block group"
            >
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/70 via-pink-500/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1 transform group-hover:translate-y-0 transition-transform">
                    {category.name}
                  </h3>
                  <p className="opacity-90 text-sm group-hover:opacity-100 transform group-hover:translate-y-0 transition-all">
                    {category.description}
                  </p>
                  <div className="mt-4 inline-flex items-center font-medium">
                    <span>Shop Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 