import React from 'react';
import { Check } from 'lucide-react';
import { craftStory } from '../../data/homeData';
import SectionHeader from '../ui/SectionHeader';

export default function CraftStorySection() {
  const { subtitle, title, description, highlights, images } = craftStory;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <SectionHeader
            subtitle={subtitle}
            title={title}
            align="left"
          />
          <p className="text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
            {description}
          </p>
          <ul className="space-y-3 pt-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-earth-olive/90 dark:text-earth-sand/90">
                <div className="bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest p-1 rounded-full">
                  <Check size={14} />
                </div>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <img
            src={images.artisan}
            alt="Artisan Weaving"
            className="rounded-2xl shadow-md w-full aspect-[3/4] object-cover mt-8"
          />
          <img
            src={images.crops}
            alt="Golden Jute Crops"
            className="rounded-2xl shadow-md w-full aspect-[3/4] object-cover"
          />
        </div>

      </div>
    </section>
  );
}
