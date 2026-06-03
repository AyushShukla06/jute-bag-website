import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, faqHeader, faqCta } from '../data/faqData';
import SectionHeader from '../components/ui/SectionHeader';

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 transition-colors duration-300">
      
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-earth-olive/10 text-earth-olive dark:text-earth-amber rounded-full">
          <HelpCircle size={24} />
        </div>
        <SectionHeader
          title={faqHeader.title}
          description={faqHeader.description}
        />
      </div>

      <div className="space-y-4 pt-4">
        {faqs.map((faq, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 hover:bg-earth-olive/5 transition-colors focus:outline-none"
              >
                <div className="flex gap-3 items-center">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded bg-earth-olive/10 text-earth-olive dark:bg-earth-amber/15 dark:text-earth-amber">
                    {faq.category}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-earth-olive dark:text-earth-sand leading-snug">
                    {faq.q}
                  </span>
                </div>
                <div className="text-earth-olive dark:text-earth-sand">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

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

      <div className="text-center bg-earth-olive/5 dark:bg-earth-charcoal/30 border border-earth-olive/10 rounded-2xl p-6 space-y-2 mt-8">
        <h4 className="font-display font-semibold text-sm text-earth-olive dark:text-earth-sand">
          {faqCta.title}
        </h4>
        <p className="text-xs text-earth-olive/60 dark:text-earth-sand/65 mb-4">
          {faqCta.subtitle}
        </p>
        <span className="text-xs font-semibold text-earth-crimson dark:text-earth-amber">
          Support desk: {faqCta.email}
        </span>
      </div>

    </div>
  );
}
