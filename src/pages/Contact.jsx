/**
 * @file Contact.jsx
 * @path src/pages/Contact.jsx
 * @description Contact page coordinating inquiry form inputs, office addresses
 * and maps widgets. Handles contact forms submit validators.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';

// Modular features components extracted from this view
import ContactForm from '../components/features/contact/ContactForm';
import ContactInfo from '../components/features/contact/ContactInfo';
import InteractiveMap from '../components/features/contact/InteractiveMap';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Contact() {
  /* --- STATE MANAGEMENT --- */
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /* --- HANDLERS & VALIDATIONS --- */
  
  /**
   * Tracks customer input updates on text/number inputs.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Asserts validity of customer contact inputs.
   */
  const validate = () => {
    const tempErrors = {};
    if (!form.name) tempErrors.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Valid email is required';
    if (!form.message) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Submits inquiry inputs.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Direct integration using FormSubmit.co AJAX endpoint pointing to your email address
      const response = await fetch("https://formsubmit.co/ajax/soulajute@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject || "Soulajute Contact Form Submission",
          message: form.message
        })
      });
      
      const result = await response.json();
      if (response.ok && (result.success === "true" || result.success === true || result.success)) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError("Failed to connect to the server. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      {/* 3.1. Main Introduction Section */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber">Get In Touch</span>
        <h1 className="text-4xl font-bold text-earth-olive dark:text-earth-sand">Let's Connect</h1>
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80">
          Whether you want to inquire about custom corporate orders, request press kits, or simply say hello — we'd love to hear from you.
        </p>
      </div>

      {/* 3.2. Core Content Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left: Contact Form Card */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-6 sm:p-8 shadow-sm">
          <ContactForm
            form={form}
            errors={errors}
            submitted={submitted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onResetSubmitted={() => {
              setSubmitted(false);
              setSubmitError(null);
            }}
          />
        </div>

        {/* Right: Contact details list and mock Mapbox widget */}
        <div className="lg:col-span-5 space-y-6">
          <ContactInfo />
          <InteractiveMap />
        </div>

      </div>

    </div>
  );
}
