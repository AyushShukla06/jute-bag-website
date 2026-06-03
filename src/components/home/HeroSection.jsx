import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { heroContent } from '../../data/homeData';
import Button from '../ui/Button';

export default function HeroSection() {
  const {
    subtitle,
    titleLine1,
    titleLine2,
    titleHighlight,
    description,
    ctaPrimaryText,
    ctaSecondaryText
  } = heroContent;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-earth-cream dark:bg-earth-forest border-b border-earth-olive/10 dark:border-earth-sand/10 transition-colors duration-300">
      <div className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full border border-earth-olive/5 dark:border-earth-sand/5 pointer-events-none animate-spin-slow" />
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full border border-earth-crimson/5 dark:border-earth-amber/5 pointer-events-none animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-olive/10 text-earth-olive dark:bg-earth-amber/10 dark:text-earth-amber text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Leaf size={14} /> {subtitle}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-earth-olive dark:text-earth-sand max-w-5xl mx-auto leading-[1.1] mb-6"
        >
          {titleLine1}
          <br />
          {titleLine2} <span className="doodle-underline">{titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-earth-olive/80 dark:text-earth-sand/80 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            as="link"
            to="/shop"
            variant="primary"
            icon={<ArrowRight size={18} />}
          >
            {ctaPrimaryText}
          </Button>
          <Button
            as="link"
            to="/about"
            variant="outline"
          >
            {ctaSecondaryText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
