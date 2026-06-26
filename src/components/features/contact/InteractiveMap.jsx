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
    <a
      href="https://www.google.com/maps/search/?api=1&query=HNo.+869+Reidganj,+Ayodhya,+Uttar+Pradesh+-+224001"
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-64 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl overflow-hidden relative shadow-inner bg-[#ece5d8] dark:bg-[#1f221c] transition-all duration-300 hover:border-earth-crimson/40 hover:shadow-md select-none cursor-pointer"
    >
      
      {/* 3.1. Styled SVG Dot grid pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px] transition-transform duration-700 group-hover:scale-105" />
      
      {/* 3.2. Vector lines mapping (Roads & Rivers) */}
      <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/60 dark:bg-white/5 rotate-12 transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/60 dark:bg-white/5 -rotate-45 transition-transform duration-700 group-hover:scale-105" />
      
      {/* Sarayu River block */}
      <div 
        className="absolute top-[10%] bottom-0 right-[20%] w-16 bg-blue-300/35 dark:bg-blue-900/20 rounded-full blur-md transition-transform duration-700 group-hover:scale-105" 
        title="Sarayu River" 
      />

      {/* 3.3. Pulsing Office Pin Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        
        {/* Ring Ping Animation */}
        <span className="flex h-6 w-6 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md">
            S
          </span>
        </span>
        
        {/* Label bubble tooltip */}
        <div className="bg-earth-olive text-earth-beige dark:bg-earth-sand dark:text-earth-forest text-[10px] px-2.5 py-1 rounded shadow-md mt-1.5 whitespace-nowrap font-bold transition-all duration-300 group-hover:bg-earth-crimson group-hover:text-white">
          Ayodhya Guild House
        </div>

      </div>

      {/* 3.4. Click instructions and map version details */}
      <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-earth-charcoal/90 px-2.5 py-1 rounded text-[9px] font-bold border border-earth-olive/10 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-earth-crimson dark:text-earth-amber">
        Click to open Google Maps ➔
      </div>

      <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-earth-charcoal/90 px-2 py-1 rounded text-[9px] font-bold border border-earth-olive/10 shadow-sm">
        Ayodhya Maps Mock
      </div>

    </a>
  );
}
