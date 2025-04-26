import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetails from '@/components/product/ProductDetails';

// In a real app, this data would come from an API or database
const products = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    category: 'Plain',
    price: 24.99,
    slug: 'classic-white-tshirt',
    isNew: true,
    rating: 4.8,
    description: 'Our premium classic white t-shirt made from 100% organic cotton. Comfortable, durable, and perfect for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg' // Using same image as placeholder
        }
      },
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Navy', 
        hex: '#000080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Made from 100% organic cotton',
      'Eco-friendly manufacturing process',
      'Pre-shrunk fabric',
      'Reinforced stitching for durability',
      'Classic fit with modern touch'
    ],
    careInstructions: [
      'Machine wash cold with similar colors',
      'Do not bleach',
      'Tumble dry low',
      'Cool iron if needed',
      'Do not dry clean'
    ],
    reviews: [
      {
        id: 1,
        name: 'Jamie L.',
        rating: 5,
        date: '2023-11-15',
        comment: "This is the most comfortable t-shirt I've ever owned. Perfect fit and the material is so soft!"
      },
      {
        id: 2,
        name: 'Taylor M.',
        rating: 4,
        date: '2023-10-29',
        comment: 'Great quality shirt, I bought one in every color. Only reason for 4 stars is that they run slightly large.'
      },
      {
        id: 3,
        name: 'Alex K.',
        rating: 5,
        date: '2023-10-05',
        comment: 'Perfect everyday t-shirt. The fabric is breathable and it washes really well.'
      }
    ]
  },
  {
    id: 2,
    name: 'Black Essential T-Shirt',
    category: 'Plain',
    price: 24.99,
    slug: 'black-essential-tshirt',
    isNew: false,
    rating: 4.9,
    description: 'A wardrobe staple, our black essential t-shirt offers superior comfort with a modern fit. Made from high-quality cotton blend.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Navy', 
        hex: '#000080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Premium cotton blend fabric',
      'Comfortable and breathable',
      'Versatile design for any occasion',
      'Durable construction',
      'Modern slim fit'
    ],
    careInstructions: [
      'Machine wash cold',
      'Gentle cycle with like colors',
      'Do not bleach',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    reviews: [
      {
        id: 1,
        name: 'Jordan P.',
        rating: 5,
        date: '2023-11-20',
        comment: "The black color on this shirt is perfect and doesn't fade after washing."
      },
      {
        id: 2,
        name: 'Morgan T.',
        rating: 5,
        date: '2023-10-12',
        comment: 'Great fit and very comfortable. This has become my go-to shirt.'
      }
    ]
  },
  // Simplify the rest of the products to keep the file shorter
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
    colors: [
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Distressed vintage-style logo print',
      'Soft, premium cotton fabric',
      'Slightly fitted cut',
      'Ribbed crew neck',
      'Double-needle stitched sleeves'
    ],
    careInstructions: [
      'Machine wash cold inside out',
      'Gentle cycle with like colors',
      'Only non-chlorine bleach when needed',
      'Tumble dry low',
      'Cool iron on reverse if needed'
    ],
    reviews: []
  },
  // Additional product entries would follow a similar pattern
  {
    id: 4,
    name: 'Pastel Pink T-Shirt',
    category: 'Plain',
    price: 29.99,
    slug: 'pastel-pink-tshirt',
    isNew: true,
    rating: 4.6,
    description: 'A soft pastel pink t-shirt with a relaxed fit. Made from lightweight cotton for maximum comfort in warm weather.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'Pink', 
        hex: '#FFC0CB',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Blue', 
        hex: '#ADD8E6',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Mint', 
        hex: '#98FB98',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Lavender', 
        hex: '#E6E6FA',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Lightweight cotton material',
      'Relaxed fit',
      'Perfect for layering',
      'Garment dyed for soft pastel colors',
      'Pre-shrunk to minimize shrinkage'
    ],
    careInstructions: [
      'Machine wash cold with similar colors',
      'Gentle cycle',
      'Do not bleach',
      'Tumble dry low',
      'Cool iron if needed'
    ],
    reviews: []
  },
  {
    id: 5,
    name: 'Graphic Print T-Shirt',
    category: 'Branded',
    price: 39.99,
    slug: 'graphic-print-tshirt',
    isNew: false,
    rating: 4.5,
    description: 'Bold graphic print t-shirt featuring original artwork. Made from premium cotton with a contemporary fit.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Original artwork by local artists',
      'Premium cotton material',
      'Contemporary fit',
      'Water-based ink print for softness',
      'Tearaway tag for comfort'
    ],
    careInstructions: [
      'Turn inside out before washing',
      'Machine wash cold',
      'Gentle cycle with like colors',
      'Do not bleach',
      'Line dry or tumble dry low'
    ],
    reviews: []
  },
  {
    id: 6,
    name: 'Striped T-Shirt',
    category: 'Plain',
    price: 29.99,
    slug: 'striped-tshirt',
    isNew: false,
    rating: 4.4,
    description: 'Classic horizontal striped t-shirt with a modern twist. Comfortable fit with durable stitching for long-lasting wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { 
        name: 'Navy/White', 
        hex: '#000080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Black/White', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray/White', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Classic horizontal stripes',
      'Medium-weight cotton fabric',
      'Comfortable regular fit',
      'Reinforced shoulder seams',
      'Double-stitched hems'
    ],
    careInstructions: [
      'Machine wash cold',
      'Gentle cycle with like colors',
      'Only non-chlorine bleach when needed',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    reviews: []
  },
  {
    id: 7,
    name: 'Urban Art T-Shirt',
    category: 'Branded',
    price: 44.99,
    slug: 'urban-art-tshirt',
    isNew: true,
    rating: 4.6,
    description: 'Urban art inspired t-shirt with unique street art designs. Premium quality fabric with a comfortable, relaxed fit.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Street art inspired graphics',
      'Premium ringspun cotton',
      'Relaxed fit',
      'Screen printed design',
      'Pre-washed and pre-shrunk'
    ],
    careInstructions: [
      'Machine wash cold inside out',
      'With like colors',
      'Do not bleach',
      'Tumble dry low',
      'Do not iron directly on print'
    ],
    reviews: []
  },
  {
    id: 8,
    name: 'Navy Blue T-Shirt',
    category: 'Plain',
    price: 24.99,
    slug: 'navy-blue-tshirt',
    isNew: false,
    rating: 4.9,
    description: 'Classic navy blue t-shirt made from soft cotton. Versatile, comfortable, and perfect for any casual occasion.',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: [
      { 
        name: 'Navy', 
        hex: '#000080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Black', 
        hex: '#000000',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'White', 
        hex: '#FFFFFF',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      },
      { 
        name: 'Gray', 
        hex: '#808080',
        images: {
          front: '/images/products/hero1.jpg',
          back: '/images/products/hero1.jpg'
        }
      }
    ],
    features: [
      'Soft, high-quality cotton',
      'Classic fit',
      'Versatile for layering',
      'Ribbed collar',
      'Side-seamed construction for better fit'
    ],
    careInstructions: [
      'Machine wash cold',
      'With like colors',
      'Do not bleach',
      'Tumble dry low',
      'Warm iron if needed'
    ],
    reviews: []
  },
];

// Helper function to get product data
function getProductData(slug: string) {
  // In a real app, this would fetch from an API or database
  // For our static data, we can just return directly
  return products.find((p) => p.slug === slug);
}

// Helper function to get a simplified version of related products for the UI
function getRelatedProductsData(category: string, currentId: number) {
  return products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.colors[0].images.front, // Use the first color's front image
      slug: p.slug,
      isNew: p.isNew,
      rating: p.rating,
    }));
}

// This is a dynamic route that gets the slug from the URL
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params before accessing its properties (Next.js 15 requirement)
  const { slug } = await params;
  
  // Find the product based on the slug
  const product = getProductData(slug);
  
  // If product doesn't exist, show the 404 page
  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = getRelatedProductsData(product.category, product.id);
  
  return (
    <div className="py-12">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 flex items-center overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-pink-500">
            {product.category} T-Shirts
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 truncate">{product.name}</span>
        </div>
      </div>
      
      {/* Main product section */}
      <div className="container mx-auto px-4">
        <ProductDetails product={product} />
      </div>
      
      {/* Related products section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 aspect-[3/4]">
                  <Image 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {relatedProduct.isNew && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                      New Arrival
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link 
                      href={`/product/${relatedProduct.slug}`}
                      className="bg-white text-pink-500 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors transform -translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        <Link href={`/product/${relatedProduct.slug}`} className="hover:text-pink-500">
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{relatedProduct.category}</p>
                    </div>
                    <p className="font-medium">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 