/**
 * @file Button.jsx
 * @path src/components/ui/Button.jsx
 * @description Highly reusable atomic button component supporting standard,
 * outline, or ghost variants. Automatically shifts between a button element
 * or an anchor Link elements if custom props are provided.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Link } from 'react-router-dom';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  to,
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) {
  /* --- STYLING MAPS --- */
  // Base classes that apply to all button states
  const baseStyle = "px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto";

  // Visual variants for the design system (primary, outline, ghost styles)
  const variants = {
    primary: "bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "bg-transparent border border-earth-olive/35 hover:bg-earth-olive/5 dark:border-earth-sand/35 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand",
    ghost: "bg-transparent hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand px-4 py-2",
  };

  const combinedClass = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;

  /* --- RENDER HELPERS --- */
  // Handles icons layout positions
  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  /* ==========================================================================
     3. CONDITIONAL ELEMENT RENDER
     ========================================================================== */
  // Shifting to React-Router Link when 'as' is set to 'link'
  if (as === 'link' && to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {renderContent()}
      </Link>
    );
  }

  // Fallback to normal button element
  return (
    <button className={combinedClass} {...props}>
      {renderContent()}
    </button>
  );
}
