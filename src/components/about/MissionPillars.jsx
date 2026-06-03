import React from 'react';
import { Users, Leaf, Award } from 'lucide-react';
import { pillars } from '../../data/aboutData';

const iconMap = {
  Users: Users,
  Leaf: Leaf,
  Award: Award
};

export default function MissionPillars() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((pillar, idx) => {
        const IconComponent = iconMap[pillar.iconName] || Leaf;
        return (
          <div
            key={idx}
            className="p-8 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 rounded-2xl space-y-4"
          >
            <div className="inline-flex p-3 bg-earth-olive/10 text-earth-olive dark:text-earth-amber rounded-full">
              <IconComponent size={24} />
            </div>
            <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand">
              {pillar.title}
            </h3>
            <p className="text-sm text-earth-olive/75 dark:text-earth-sand/75 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
