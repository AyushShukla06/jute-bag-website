/**
 * @file ContactInfo.jsx
 * @path src/components/features/contact/ContactInfo.jsx
 * @description Contact details card. Displays corporate headquarters address,
 * support phone numbers, and guild email addresses with corresponding icons.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ContactInfo() {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="bg-earth-olive/10 dark:bg-earth-charcoal/30 border border-earth-olive/10 rounded-2xl p-6 sm:p-8 space-y-6">
      
      <h3 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
        Headquarters
      </h3>

      <div className="space-y-4 text-sm text-earth-olive/80 dark:text-earth-sand/80">
        
        {/* Address Row */}
        <div className="flex gap-3 items-start">
          <MapPin size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-earth-olive dark:text-earth-sand">Soulajute Guild House</p>
            <p className="text-xs">HNo. 869 Reidganj, Ayodhya, Uttar Pradesh - 224001</p>
          </div>
        </div>

        {/* Phone numbers row */}
        <div className="flex gap-3 items-start">
          <Phone size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-earth-olive dark:text-earth-sand">Phone Support</p>
            <p className="text-xs">
              <a href="tel:+916394793989" className="hover:underline hover:text-earth-crimson dark:hover:text-earth-amber transition-colors">+91 6394793989</a>
            </p>
            <p className="text-xs mt-1">
              <a href="tel:+919807308327" className="hover:underline hover:text-earth-crimson dark:hover:text-earth-amber transition-colors">+91 9807308327</a>
            </p>
          </div>
        </div>

        {/* Email support row */}
        <div className="flex gap-3 items-start">
          <Mail size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-earth-olive dark:text-earth-sand">Email Support</p>
            <p className="text-xs">
              <a href="mailto:soulajute@gmail.com" className="hover:underline hover:text-earth-crimson dark:hover:text-earth-amber transition-colors">soulajute@gmail.com</a>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
