/**
 * @file SectionHeader.jsx
 * @path src/components/ui/SectionHeader.jsx
 * @description Standardized section header element. Supports subtitles,
 * titles, custom typography heading elements (h1-h4), description copy,
 * and decorative hand-drawn doodles (circles and underlines).
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function SectionHeader({
  tag = 'h2',
  subtitle,
  title,
  highlight,
  highlightType = 'none',
  titleAfter,
  description,
  align = 'center',
  className = ''
}) {
  /* --- LAYOUT ALIGNMENTS & FONT MAPS --- */
  // Left or center alignment styles
  const alignClass = align === 'left' ? 'text-left' : 'text-center max-w-2xl mx-auto';
  
  // Tailwind typography mapping based on chosen HTML tag level
  const headingClassMap = {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-earth-olive dark:text-earth-sand leading-[1.1]',
    h2: 'text-3xl sm:text-4xl font-bold text-earth-olive dark:text-earth-sand mt-2',
    h3: 'text-2xl sm:text-3xl font-bold text-earth-olive dark:text-earth-sand',
    h4: 'text-xl sm:text-2xl font-semibold text-earth-olive dark:text-earth-sand'
  };

  const HeadingTag = tag;
  const headingClass = headingClassMap[tag] || headingClassMap.h2;

  /* --- DOODLES DECORATION RENDERER --- */
  // Returns highlighted text wraps styling for hand-drawn SVG overlays (see index.css)
  const renderHighlight = () => {
    if (!highlight) return null;
    
    // Doodle horizontal wave underline wrapper
    if (highlightType === 'underline') {
      return (
        <>
          {' '}
          <span className="doodle-underline">{highlight}</span>
        </>
      );
    }
    
    // Doodle organic circle loop wrapper
    if (highlightType === 'circle') {
      return (
        <>
          {' '}
          <span className="doodle-circle">{highlight}</span>
        </>
      );
    }
    
    // Simple space wrapper
    return ` ${highlight}`;
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className={`space-y-3 ${alignClass} ${className}`}>
      
      {/* Small uppercase category subtitle */}
      {subtitle && (
        <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber block">
          {subtitle}
        </span>
      )}
      
      {/* Title Heading */}
      <HeadingTag className={headingClass}>
        {title}
        {renderHighlight()}
        {titleAfter && ` ${titleAfter}`}
      </HeadingTag>
      
      {/* Description copy paragraph */}
      {description && (
        <p className="text-sm sm:text-base text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}

    </div>
  );
}
