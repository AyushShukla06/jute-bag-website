/**
 * @file ContactForm.jsx
 * @path src/components/features/contact/ContactForm.jsx
 * @description Standard message inquiry inputs, capturing name, email, subject,
 * and text body. Displays submit animations and verification messages.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ContactForm({
  form,
  errors,
  submitted,
  onInputChange,
  onSubmit,
  onResetSubmitted
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  
  // 3.1. Success feedback when message is validated and sent
  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4 animate-fade-in">
        
        <div className="inline-flex p-3 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 rounded-full">
          <CheckCircle2 size={36} />
        </div>
        
        <h3 className="text-xl font-bold text-earth-olive dark:text-earth-sand">Message Sent!</h3>
        
        <p className="text-sm text-earth-olive/60 dark:text-earth-sand/65 max-w-sm mx-auto">
          Thank you for reaching out. A sustainability advisor will review your request and get back to you within 24 hours.
        </p>
        
        <button
          onClick={onResetSubmitted}
          className="mt-4 px-6 py-2 border border-earth-olive/30 text-earth-olive dark:text-earth-sand text-xs font-semibold rounded-full hover:bg-earth-olive/5 focus:outline-none"
        >
          Send Another Message
        </button>

      </div>
    );
  }

  // 3.2. Primary Form fields
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
          />
          {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
          />
          {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
        </div>

      </div>

      {/* Subject Input */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Subject (Optional)</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={onInputChange}
          className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
        />
      </div>

      {/* Message Text Area */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Your Message</label>
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={onInputChange}
          className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none resize-none"
        />
        {errors.message && <p className="text-xs text-red-500 font-semibold">{errors.message}</p>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm shadow-md flex items-center justify-center gap-2 pt-3 transition-all"
      >
        <Send size={16} /> Send Message
      </button>

    </form>
  );
}
