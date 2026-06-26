/**
 * @file AuthForm.jsx
 * @path src/components/features/auth/AuthForm.jsx
 * @description Standard form element rendering username, email, and password inputs.
 * Toggles automatically between register or login validation configurations.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Mail, Lock, User } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function AuthForm({
  isLogin,
  name,
  onNameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  loading,
  error,
  onSubmit
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      
      {/* 3.1. Full Name Input (Register mode only) */}
      {!isLogin && (
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-3 text-earth-olive/40" />
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 3.2. Email Address Input */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3 text-earth-olive/40" />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
          />
        </div>
      </div>

      {/* 3.3. Password Input */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-3 text-earth-olive/40" />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
          />
        </div>
      </div>

      {/* Error validation banner */}
      {error && (
        <p className="text-xs text-red-500 font-semibold animate-pulse">{error}</p>
      )}

      {/* 3.4. Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm shadow-md flex items-center justify-center gap-2 pt-3 focus:outline-none transition-all"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white dark:border-earth-forest border-t-transparent rounded-full animate-spin" />
        ) : (
          isLogin ? 'Sign In' : 'Register'
        )}
      </button>

    </form>
  );
}
