/**
 * @file DashboardHeader.jsx
 * @path src/components/features/dashboard/DashboardHeader.jsx
 * @description Profile summary banner for Dashboard, showing member dates,
 * initials profile circle, and log out triggers.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { LogOut, Calendar } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function DashboardHeader({
  user,
  onLogout
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
      
      {/* 3.1. Profile Information */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        
        {/* User profile avatar initials badge */}
        <div className="w-16 h-16 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest font-bold text-2xl rounded-full flex items-center justify-center shadow-md uppercase">
          {user.name.charAt(0)}
        </div>
        
        {/* Name, email, join date headings */}
        <div>
          <h1 className="text-2xl font-bold text-earth-olive dark:text-earth-sand leading-tight">
            {user.name}
          </h1>
          <p className="text-xs text-earth-olive/60 dark:text-earth-sand/60 flex items-center gap-1.5 justify-center sm:justify-start mt-1">
            <Calendar size={12} /> Member since {user.joined || 'June 2026'}
          </p>
          <p className="text-xs text-earth-olive/60 dark:text-earth-sand/60">{user.email}</p>
        </div>

      </div>

      {/* 3.2. Logout Button */}
      <button
        onClick={onLogout}
        className="px-4 py-2 border border-earth-olive/30 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 dark:border-earth-sand/35 dark:hover:bg-red-500/15 rounded-lg text-xs font-bold text-earth-olive dark:text-earth-sand flex items-center gap-1.5 transition-all focus:outline-none"
      >
        <LogOut size={14} /> Log Out
      </button>

    </div>
  );
}
