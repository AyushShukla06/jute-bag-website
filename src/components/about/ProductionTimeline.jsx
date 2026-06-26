import React from 'react';
import { motion } from 'framer-motion';
import { timelineSteps } from '../../data/aboutData';
import SectionHeader from '../ui/SectionHeader';
import Globe from './Globe';

export default function ProductionTimeline() {
  return (
    <section className="bg-earth-olive/5 dark:bg-earth-charcoal/30 py-16 px-6 sm:px-12 rounded-3xl border border-earth-olive/10 overflow-hidden">
      <SectionHeader
        subtitle="The Timeline"
        title="The Golden Thread Journey"
        className="mb-16"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Rotating 3D Globe - occupies 6 columns on desktop, stacked on mobile */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center">
          <Globe />
          <div className="mt-8 text-center animate-pulse-subtle">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-earth-crimson dark:text-earth-amber block mb-1">
              Global Impact
            </span>
            <h4 className="font-display italic text-2xl text-earth-olive dark:text-earth-sand">
              Our Growing Reach
            </h4>
            <div className="w-16 h-[1.5px] bg-earth-olive/20 dark:bg-earth-sand/20 mx-auto mt-3 rounded-full" />
          </div>
        </div>

        {/* Timeline Steps - occupies 6 columns on desktop */}
        <div className="col-span-1 lg:col-span-6 relative border-l-2 border-earth-olive/20 dark:border-earth-sand/20 ml-4 lg:ml-8">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-10 ml-6 sm:ml-10 relative"
            >
              <div className="absolute -left-[43px] sm:-left-[57px] top-0 bg-earth-cream dark:bg-earth-forest border-2 border-earth-olive dark:border-earth-amber text-lg w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-md select-none">
                {step.icon}
              </div>

              <div className="bg-white/70 dark:bg-earth-forest/75 p-5 rounded-xl border border-earth-olive/10 dark:border-earth-sand/15 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-display font-bold text-base sm:text-lg text-earth-olive dark:text-earth-sand">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-earth-olive/80 dark:text-earth-sand/80 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
