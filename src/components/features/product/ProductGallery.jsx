/**
 * @file ProductGallery.jsx
 * @path src/components/features/product/ProductGallery.jsx
 * @description Renders the product image showcase, including a large preview
 * and clickable thumbnail selectors.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ProductGallery({
  images,
  name,
  activeImage,
  onActiveImageChange
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="lg:col-span-6 space-y-4">
      
      {/* 3.1. Large Feature Image View */}
      <div className="bg-earth-sand/20 rounded-2xl overflow-hidden aspect-[4/5] border border-earth-olive/10 dark:border-earth-sand/10">
        <img
          src={activeImage}
          alt={name}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>
      
      {/* 3.2. Thumbnails List Row */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onActiveImageChange(img)}
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 aspect-square flex-shrink-0 transition-all ${
              activeImage === img
                ? 'border-earth-crimson dark:border-earth-amber ring-2 ring-earth-crimson/20 dark:ring-earth-amber/20'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            aria-label={`View image thumbnail ${i + 1}`}
          >
            <img 
              src={img} 
              alt={`${name} View ${i + 1}`} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>

    </div>
  );
}
