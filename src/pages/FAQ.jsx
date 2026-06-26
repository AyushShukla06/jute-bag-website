/**
 * @file FAQ.jsx
 * @path src/pages/FAQ.jsx
 * @description Frequently Asked Questions page. Orchestrates and maps
 * static FAQ lists loaded from data config files and coordinates expanded
 * accordion toggles.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

// Data sources & standard sections headers
import { faqs, faqHeader, faqCta } from '../data/faqData';
import SectionHeader from '../components/ui/SectionHeader';

// Modular features components extracted from this view
import FAQAccordion from '../components/features/faq/FAQAccordion';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function FAQ() {
  /* --- STATE MANAGEMENT --- */
  const [expandedIndex, setExpandedIndex] = useState(null);

  /* --- HANDLERS & CALLBACKS --- */
  /**
   * Collapses/Expands specific accordion indices.
   */
  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 transition-colors duration-300">
      
      {/* 3.1. Main FAQ Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-earth-olive/10 text-earth-olive dark:text-earth-amber rounded-full">
          <HelpCircle size={24} />
        </div>
        <SectionHeader
          title={faqHeader.title}
          description={faqHeader.description}
        />
      </div>

      {/* 3.2. FAQ list collapsible rows */}
      <FAQAccordion
        faqs={faqs}
        expandedIndex={expandedIndex}
        onToggleAccordion={toggleAccordion}
      />

      {/* 3.3. Help / Support CTA banner panel */}
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
