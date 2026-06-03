import React from 'react';
import { aboutIntro } from '../data/aboutData';
import SectionHeader from '../components/ui/SectionHeader';
import MissionPillars from '../components/about/MissionPillars';
import ProductionTimeline from '../components/about/ProductionTimeline';

export default function About() {
  const { subtitle, title, description } = aboutIntro;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 transition-colors duration-300">
      <SectionHeader
        tag="h1"
        subtitle={subtitle}
        title={title}
        description={description}
        className="max-w-3xl mx-auto"
      />

      <MissionPillars />

      <ProductionTimeline />
    </div>
  );
}
