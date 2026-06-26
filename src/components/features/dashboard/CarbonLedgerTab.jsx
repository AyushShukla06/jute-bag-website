/**
 * @file CarbonLedgerTab.jsx
 * @path src/components/features/dashboard/CarbonLedgerTab.jsx
 * @description Ecological tracking ledger for user orders. Computes cumulative
 * plastic bags saved and net carbon offsets from natural golden jute fiber purchases.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Leaf } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function CarbonLedgerTab({
  totalBagsOrdered,
  cumulativePlasticBagsSaved,
  cumulativeCo2Offset
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 3.1. Main offset tracking banner */}
      <div className="p-6 bg-earth-olive/10 dark:bg-earth-charcoal/30 border border-earth-olive/10 dark:border-earth-sand/5 rounded-2xl space-y-4">
        
        <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
          <Leaf size={20} className="text-green-600 animate-pulse" /> 
          Your Personal Sustainability Offset
        </h2>
        
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
          Every Soulajute bag replaces hundreds of single-use carrier bags. Below is a calculation of the net savings and carbon offsets your purchases have made possible.
        </p>

        {/* 3.2. Metrics grids columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
          
          {/* Bags bought stat */}
          <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
            <span className="text-3xl font-extrabold text-earth-olive dark:text-earth-amber">
              {totalBagsOrdered}
            </span>
            <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">
              Bags Purchased
            </p>
          </div>

          {/* Plastic avoided stat */}
          <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
            <span className="text-3xl font-extrabold text-earth-crimson dark:text-earth-amber">
              {cumulativePlasticBagsSaved}
            </span>
            <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">
              Plastic Bags Prevented
            </p>
          </div>

          {/* Net carbon saved stat */}
          <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
            <span className="text-3xl font-extrabold text-earth-olive dark:text-earth-amber">
              {cumulativeCo2Offset} kg
            </span>
            <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">
              Net Carbon Offset
            </p>
          </div>

        </div>

      </div>

      {/* 3.3. Auditing methods descriptions footer card */}
      <div className="bg-white/60 dark:bg-earth-charcoal/40 p-6 rounded-xl border border-earth-olive/10 dark:border-earth-sand/10 space-y-3 text-xs leading-relaxed text-earth-olive/80 dark:text-earth-sand/80">
        <h4 className="font-bold text-sm text-earth-olive dark:text-earth-sand">
          How are these offsets computed?
        </h4>
        <p>1. <strong>Plastic Savings:</strong> Jute bags are reuse-rated for over 150 trips, replacing standard plastic carrier bags.</p>
        <p>2. <strong>CO₂ Equation:</strong> Prevents landfill accumulation and offsets approximately 0.08 kg of CO₂ emission equivalent per plastic bag omitted.</p>
      </div>

    </div>
  );
}
