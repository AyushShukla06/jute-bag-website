/**
 * @file About.jsx
 * @path src/pages/About.jsx
 * @description About Us page. Integrates mission statements and weaver guilds
 * production timelines to explain Soulajute's golden jute history.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { aboutIntro } from '../data/aboutData';
import SectionHeader from '../components/ui/SectionHeader';
import MissionPillars from '../components/about/MissionPillars';
import ProductionTimeline from '../components/about/ProductionTimeline';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function About() {
  const { subtitle, title, description } = aboutIntro;

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 transition-colors duration-300">
      
      {/* Intro section header */}
      <SectionHeader
        tag="h1"
        subtitle={subtitle}
        title={title}
        description={description}
        className="max-w-3xl mx-auto"
      />

      {/* Sustainable values pillars block */}
      <MissionPillars />

      {/* Weaving production steps roadmap */}
      <ProductionTimeline />

    </div>
  );
}
