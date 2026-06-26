/**
 * @file InteractiveMap.jsx
 * @path src/components/features/contact/InteractiveMap.jsx
 * @description Premium mock Mapbox visual component with styled roads, Hooghly river delta,
 * map controllers, and a pulsing Red Pin marker indicating the Kolkata corporate office.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function InteractiveMap() {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="h-64 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl overflow-hidden relative shadow-inner bg-[#ece5d8] dark:bg-[#1f221c]">
      
      {/* 3.1. Styled SVG Dot grid pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* 3.2. Vector lines mapping (Roads & Rivers) */}
      <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/60 dark:bg-white/5 rotate-12" />
      <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/60 dark:bg-white/5 -rotate-45" />
      
      {/* Delta River block */}
      <div 
        className="absolute top-1/4 bottom-0 right-1/4 w-12 bg-blue-300/35 dark:bg-blue-900/20 rounded-full blur-md" 
        title="Hooghly River Delta" 
      />

      {/* 3.3. Pulsing Office Pin Marker */}
      <div className="absolute top-[45%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        
        {/* Ring Ping Animation */}
        <span className="flex h-5 w-5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
            S
          </span>
        </span>
        
        {/* Label bubble tooltip */}
        <div className="bg-earth-olive text-earth-beige text-[9px] px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap font-bold">
          Kolkata Office
        </div>

      </div>

      {/* 3.4. Interactive controls notes */}
      <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-earth-charcoal/90 px-2 py-1 rounded text-[9px] font-bold border border-earth-olive/10 shadow-sm">
        Mapbox Mock v3
      </div>

    </div>
  );
}
