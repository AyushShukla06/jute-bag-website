import React, { useState } from 'react';
import { calculatorConfig } from '../../data/homeData';
import SectionHeader from '../ui/SectionHeader';

export default function EcoCalculatorSection() {
  const {
    subtitle,
    title,
    titleHighlight,
    description,
    defaultBags,
    minBags,
    maxBags,
    co2Factor,
    treeFactor,
    weeksInYear
  } = calculatorConfig;

  const [bagsPerWeek, setBagsPerWeek] = useState(defaultBags);

  const plasticSavedPerYear = bagsPerWeek * weeksInYear;
  const co2Offset = (plasticSavedPerYear * co2Factor).toFixed(1);
  const treesEquiv = (plasticSavedPerYear * treeFactor).toFixed(2);

  return (
    <section className="bg-earth-olive/10 dark:bg-earth-charcoal/30 border-y border-earth-olive/10 dark:border-earth-sand/5 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <SectionHeader
              subtitle={subtitle}
              title={title}
              highlight={titleHighlight}
              highlightType="circle"
              align="left"
            />
            <p className="text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-sm font-semibold">
                <span>Plastic bags used weekly:</span>
                <span className="text-earth-crimson dark:text-earth-amber text-lg">{bagsPerWeek} bags</span>
              </div>
              <input
                type="range"
                min={minBags}
                max={maxBags}
                value={bagsPerWeek}
                onChange={(e) => setBagsPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-earth-olive/20 dark:bg-earth-sand/20 rounded-lg appearance-none cursor-pointer accent-earth-olive dark:accent-earth-amber"
              />
              <div className="flex justify-between text-[10px] text-earth-olive/60 dark:text-earth-sand/65">
                <span>Minimalist ({minBags})</span>
                <span>Average ({defaultBags})</span>
                <span>High Use ({maxBags})</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-earth-forest/70 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl p-8 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-earth-olive/10 dark:border-earth-sand/10 pb-6 sm:pb-0 sm:pr-4">
              <span className="text-4xl font-bold text-earth-olive dark:text-earth-amber block">
                {plasticSavedPerYear}
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-earth-olive/75 dark:text-earth-sand/75">
                Plastic Saved / Year
              </span>
            </div>

            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-earth-olive/10 dark:border-earth-sand/10 pb-6 sm:pb-0 sm:pr-4">
              <span className="text-4xl font-bold text-earth-crimson dark:text-earth-amber block">
                {co2Offset}kg
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-earth-olive/75 dark:text-earth-sand/75">
                CO₂ Offset / Year
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-bold text-earth-olive dark:text-earth-amber block">
                {treesEquiv}
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-earth-olive/75 dark:text-earth-sand/75">
                Trees Replaced
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
