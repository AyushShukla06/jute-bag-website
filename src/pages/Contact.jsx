import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.name) tempErrors.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Valid email is required';
    if (!form.message) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber">Get In Touch</span>
        <h1 className="text-4xl font-bold text-earth-olive dark:text-earth-sand">Let's Connect</h1>
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80">
          Whether you want to inquire about custom corporate orders, request press kits, or simply say hello — we'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left: Contact Form Card */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex p-3 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 rounded-full">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-earth-olive dark:text-earth-sand">Message Sent!</h3>
              <p className="text-sm text-earth-olive/60 dark:text-earth-sand/65 max-w-sm mx-auto">
                Thank you for reaching out. A sustainability advisor will review your request and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 border border-earth-olive/30 text-earth-olive dark:text-earth-sand text-xs font-semibold rounded-full hover:bg-earth-olive/5"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
                  />
                  {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                </div>

              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Subject (Optional)</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Your Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm text-earth-olive dark:text-earth-sand focus:outline-none resize-none"
                />
                {errors.message && <p className="text-xs text-red-500 font-semibold">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm shadow-md flex items-center justify-center gap-2 pt-3"
              >
                <Send size={16} /> Send Message
              </button>

            </form>
          )}
        </div>

        {/* Right: Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-earth-olive/10 dark:bg-earth-charcoal/30 border border-earth-olive/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <h3 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
              Headquarters
            </h3>

            <div className="space-y-4 text-sm text-earth-olive/80 dark:text-earth-sand/80">
              
              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-earth-olive dark:text-earth-sand">Soulajute Guild House</p>
                  <p className="text-xs">48/C Salt Lake Sector V, Kolkata, West Bengal - 700091</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone size={18} className="text-earth-crimson dark:text-earth-amber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-earth-olive dark:text-earth-sand">Phone Support</p>
                  <p className="text-xs">+91 33 2490 8219 (Artisan Coordinator)</p>
                  <p className="text-xs">+91 92899 69989 (General Inquiries)</p>
                </div>
              </div>

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

          {/* Premium CSS Mock Mapbox Block */}
          <div className="h-64 border border-earth-olive/15 dark:border-earth-sand/15 rounded-2xl overflow-hidden relative shadow-inner bg-[#ece5d8] dark:bg-[#1f221c]">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Styled roads & rivers */}
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/60 dark:bg-white/5 rotate-12" />
            <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/60 dark:bg-white/5 -rotate-45" />
            <div className="absolute top-1/4 bottom-0 right-1/4 w-12 bg-blue-300/35 dark:bg-blue-900/20 rounded-full blur-md" title="Hooghly River Delta" />

            {/* Pulsing Pin Marker */}
            <div className="absolute top-[45%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="flex h-5 w-5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">S</span>
              </span>
              <div className="bg-earth-olive text-earth-beige text-[9px] px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap font-bold">
                Kolkata Office
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-earth-charcoal/90 px-2 py-1 rounded text-[9px] font-bold border border-earth-olive/10 shadow-sm">
              Mapbox Mock v3
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
