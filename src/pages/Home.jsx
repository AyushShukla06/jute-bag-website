import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/ui/SectionHeader';

import HeroSection from '../components/home/HeroSection';
import EcoCalculatorSection from '../components/home/EcoCalculatorSection';
import CraftStorySection from '../components/home/CraftStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <EcoCalculatorSection />

      <CraftStorySection />

      <TestimonialsSection />
    </div>
  );
}
