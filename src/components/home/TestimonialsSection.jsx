import React from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../../data/homeData';
import SectionHeader from '../ui/SectionHeader';

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-earth-cream dark:bg-earth-forest py-16 rounded-2xl border border-earth-olive/10 dark:border-earth-sand/10 transition-colors duration-300">
      <SectionHeader
        subtitle="Testimonials"
        title="Shared Love for Green Luxury"
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white/60 dark:bg-earth-charcoal/40 p-6 rounded-xl border border-earth-olive/10 dark:border-earth-sand/10 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex text-earth-amber mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm italic text-earth-olive/80 dark:text-earth-sand/80 mb-6 leading-relaxed">
                "{review.comment}"
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-earth-olive/20"
              />
              <div>
                <h4 className="font-semibold text-sm text-earth-olive dark:text-earth-sand">{review.name}</h4>
                <span className="text-xs text-earth-olive/50 dark:text-earth-sand/55">{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
