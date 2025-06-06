# YCS - Premium T-Shirt Store

A modern e-commerce platform for plain and branded t-shirts built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Modern UI with smooth animations and transitions
- Pink and white color scheme
- Server-side rendering for improved SEO
- Image optimization with Next.js Image component
- Client-side interactivity with React
- Clean and maintainable codebase
- Follows Next.js best practices to avoid hydration, SSR, and SWR errors

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ycs.git
cd ycs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Image Placeholders

Before running the application in development, you'll need to add placeholder images to the following directories:

- `/public/images/hero-fashion.jpg` - Hero section background image (1920x1080 recommended)
- `/public/images/products/` - T-shirt product images (tshirt-1.jpg to tshirt-8.jpg, 800x1200 recommended)
- `/public/images/categories/` - Category images (plain-tshirts.jpg, branded-tshirts.jpg, new-arrivals.jpg, sale.jpg, 800x1200 recommended)
- `/public/images/testimonials/` - Customer testimonial profile images (person-1.jpg to person-4.jpg, 300x300 recommended)

You can use placeholder image services like [Unsplash](https://unsplash.com/) or [Pexels](https://www.pexels.com/) to find suitable t-shirt images.

## Project Structure

```
/public
  /images - Contains all website images
    /products - T-shirt product images
    /categories - Category images
    /testimonials - Customer testimonial profile images
/src
  /app - Next.js app directory
    layout.tsx - Root layout
    page.tsx - Homepage
    globals.css - Global CSS
  /components - React components
    /home - Homepage components
      Hero.tsx - Hero section
      FeaturedProducts.tsx - Featured products section
      Categories.tsx - Categories section
      Testimonials.tsx - Customer testimonials section
      Newsletter.tsx - Newsletter signup section
    /layout - Layout components
      Header.tsx - Site header with navigation
      Footer.tsx - Site footer
    /ui - Reusable UI components
```

## Best Practices Followed

- Server components for data fetching and SEO
- Client components only for interactive elements
- Proper state management
- Image optimization
- Accessibility considerations
- Mobile responsiveness
- Performance optimization

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## License

This project is licensed under the MIT License - see the LICENSE file for details.
