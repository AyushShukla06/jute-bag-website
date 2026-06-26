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
            <p className="text-xs">48/C Salt Lake Sector V, Kolkata, West Bengal - 700091</p>
          </div>
        </div>

        {/* Phone numbers row */}
        <div className="flex gap-3 items-start">
          <Phone size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-earth-olive dark:text-earth-sand">Phone Support</p>
            <p className="text-xs">+91 33 2490 8219 (Artisan Coordinator)</p>
            <p className="text-xs">+91 92899 69989 (General Inquiries)</p>
          </div>
        </div>

        {/* Email support row */}
        <div className="flex gap-3 items-start">
          <Mail size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-earth-olive dark:text-earth-sand">Email Support</p>
            <p className="text-xs">guild@soulajute.com</p>
            <p className="text-xs">custom@soulajute.com (Corporate Orders)</p>
          </div>
        </div>

      </div>

    </div>
  );
}
