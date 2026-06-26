/**
 * @file Home.jsx
 * @path src/pages/Home.jsx
 * @description Home page view orchestrating hero sections, sustainability calculators,
 * craft narratives, customer testimonials and featured catalog cards.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Product catalog database source and reusable header elements
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import SectionHeader from '../components/ui/SectionHeader';

// Page-specific layout blocks sections components
import HeroSection from '../components/home/HeroSection';
import EcoCalculatorSection from '../components/home/EcoCalculatorSection';
import CraftStorySection from '../components/home/CraftStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Home() {
  /* --- CATALOG SUGGESTIONS RETRIEVAL --- */
  // Slices first 3 products from static database list
  const featuredProducts = products.slice(0, 3);

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="space-y-24 pb-20">
      
      {/* 3.1. Hero Spotlight Landing block */}
      <HeroSection />

      {/* 3.2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header containing title, subtitle, and CTA link */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          
          <SectionHeader
            subtitle="Curated Selection"
            title="Featured Eco-Handbags"
            align="left"
          />
          
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber mt-4 md:mt-0 transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>

        </div>

        {/* 3 columns Product grid list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

      {/* 3.3. Personal sustainability impact calculators block */}
      <EcoCalculatorSection />

      {/* 3.4. Craft narrative story block */}
      <CraftStorySection />

      {/* 3.5. Customer feedback testimonials quotes block */}
      <TestimonialsSection />

    </div>
  );
}
