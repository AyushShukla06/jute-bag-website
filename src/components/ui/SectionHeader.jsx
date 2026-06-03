import React from 'react';

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
  const alignClass = align === 'left' ? 'text-left' : 'text-center max-w-2xl mx-auto';
  const headingClassMap = {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-earth-olive dark:text-earth-sand leading-[1.1]',
    h2: 'text-3xl sm:text-4xl font-bold text-earth-olive dark:text-earth-sand mt-2',
    h3: 'text-2xl sm:text-3xl font-bold text-earth-olive dark:text-earth-sand',
    h4: 'text-xl sm:text-2xl font-semibold text-earth-olive dark:text-earth-sand'
  };

  const HeadingTag = tag;
  const headingClass = headingClassMap[tag] || headingClassMap.h2;

  const renderHighlight = () => {
    if (!highlight) return null;
    if (highlightType === 'underline') {
      return (
        <>
          {' '}
          <span className="doodle-underline">{highlight}</span>
        </>
      );
    }
    if (highlightType === 'circle') {
      return (
        <>
          {' '}
          <span className="doodle-circle">{highlight}</span>
        </>
      );
    }
    return ` ${highlight}`;
  };

  return (
    <div className={`space-y-3 ${alignClass} ${className}`}>
      {subtitle && (
        <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber block">
          {subtitle}
        </span>
      )}
      <HeadingTag className={headingClass}>
        {title}
        {renderHighlight()}
        {titleAfter && ` ${titleAfter}`}
      </HeadingTag>
      {description && (
        <p className="text-sm sm:text-base text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
