/**
 * @file ProductTabs.jsx
 * @path src/components/features/product/ProductTabs.jsx
 * @description Specifications tabs accordion component. Groups details by technical
 * sizing metrics, ecological impacts offsets, and care/maintenance guidelines.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Leaf, Truck, HelpCircle } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ProductTabs({
  product,
  activeAccordion,
  onActiveAccordionChange
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl overflow-hidden bg-white/30 dark:bg-earth-charcoal/20">
      
      {/* 3.1. Navigation Tab Headers */}
      <div className="flex border-b border-earth-olive/10 dark:border-earth-sand/10 text-xs font-bold uppercase tracking-wider">
        
        {/* Spec Details Tab Toggle */}
        <button
          onClick={() => onActiveAccordionChange('details')}
          className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
            activeAccordion === 'details'
              ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
              : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
          }`}
        >
          Spec Details
        </button>

        {/* Eco Impact Tab Toggle */}
        <button
          onClick={() => onActiveAccordionChange('eco')}
          className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
            activeAccordion === 'eco'
              ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
              : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
          }`}
        >
          Eco Impact
        </button>

        {/* Shipping & Care Tab Toggle */}
        <button
          onClick={() => onActiveAccordionChange('shipping')}
          className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
            activeAccordion === 'shipping'
              ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
              : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
          }`}
        >
          Shipping & Care
        </button>

      </div>

      {/* 3.2. Specs Content Block */}
      <div className="p-4 text-xs space-y-3 leading-relaxed text-earth-olive/80 dark:text-earth-sand/80">
        
        {/* Detail specs panel */}
        {activeAccordion === 'details' && (
          <div className="grid grid-cols-2 gap-y-2.5">
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Materials:</span>
            <span>{product.details.material}</span>
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Dimensions:</span>
            <span>{product.details.dimensions} (H x W x D)</span>
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Weaving Origin:</span>
            <span>{product.details.origin}</span>
          </div>
        )}

        {/* Eco metrics offsets statistics panel */}
        {activeAccordion === 'eco' && (
          <div className="grid grid-cols-2 gap-y-2.5">
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Plastic Saved Annual:</span>
            <span className="flex items-center gap-1 text-green-600 font-bold">
              <Leaf size={12} /> {product.impact.plasticSaved} bags/yr
            </span>
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Carbon Offset:</span>
            <span>{product.impact.co2Offset} CO₂ eq.</span>
            <span className="font-semibold text-earth-olive dark:text-earth-sand">Artisan Hours Funded:</span>
            <span>{product.impact.weaverHours} hours of weaving wages</span>
          </div>
        )}

        {/* Care instructions panel */}
        {activeAccordion === 'shipping' && (
          <div className="space-y-2">
            <p className="flex items-center gap-1.5">
              <Truck size={14} className="text-earth-crimson dark:text-earth-amber" /> 
              Carbon-neutral shipping on orders above $100.
            </p>
            <p className="flex items-center gap-1.5">
              <HelpCircle size={14} className="text-earth-crimson dark:text-earth-amber" /> 
              <strong>Care: </strong> {product.details.care}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
