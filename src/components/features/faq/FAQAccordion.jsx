/**
 * @file FAQAccordion.jsx
 * @path src/components/features/faq/FAQAccordion.jsx
 * @description Dynamic accordion collapsible component for the FAQs page.
 * Uses Framer Motion for slide/collapse height transitions.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function FAQAccordion({
  faqs,
  expandedIndex,
  onToggleAccordion
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="space-y-4 pt-4">
      {faqs.map((faq, idx) => {
        const isOpen = expandedIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl overflow-hidden transition-all duration-300"
          >
            
            {/* Header / Accordion trigger button */}
            <button
              onClick={() => onToggleAccordion(idx)}
              className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 hover:bg-earth-olive/5 transition-colors focus:outline-none"
            >
              
              <div className="flex gap-3 items-center">
                
                {/* Category tag heading */}
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded bg-earth-olive/10 text-earth-olive dark:bg-earth-amber/15 dark:text-earth-amber">
                  {faq.category}
                </span>
                
                {/* Question title */}
                <span className="font-display font-bold text-sm sm:text-base text-earth-olive dark:text-earth-sand leading-snug">
                  {faq.q}
                </span>

              </div>

              {/* Accordion Chevron Icon Indicator */}
              <div className="text-earth-olive dark:text-earth-sand">
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>

            </button>

            {/* Collapsible Answer Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-1 border-t border-earth-olive/5 text-xs sm:text-sm text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        );
      })}
    </div>
  );
}
