/**
 * @file Auth.jsx
 * @path src/pages/Auth.jsx
 * @description Authentication page. Coordinates registration and login states,
 * writes simulated user records to localStorage database on success, and manages
 * navigation sequences back to Dashboard tabs.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Leaf } from 'lucide-react';

// Modular feature components extracted from this view
import AuthForm from '../components/features/auth/AuthForm';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Auth() {
  /* --- ROUTING HOOK --- */
  const navigate = useNavigate();

  /* --- LOCAL STATES --- */
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* --- HANDLERS & API SIMULATION --- */
  /**
   * Performs basic validation audits and simulated database response delays.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all details.');
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate user fetch latency from API
    setTimeout(() => {
      setLoading(false);
      
      // Store mock user info keys in localStorage database
      localStorage.setItem('user', JSON.stringify({
        name: isLogin ? 'Ayush Shukla' : name,
        email: email,
        joined: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
      }));
      
      navigate('/dashboard');
    }, 1500);
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-md mx-auto px-4 py-20 transition-colors duration-300">
      
      {/* 3.1. Primary Wrapper card */}
      <div className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-8 shadow-md space-y-6">
        
        {/* Logo and Intro branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest rounded-full">
            <Leaf size={24} />
          </div>
          <h2 className="font-display font-bold text-2xl text-earth-olive dark:text-earth-sand">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-earth-olive/60 dark:text-earth-sand/65">
            {isLogin
              ? 'Login to view order tracking and manage your wishlist.'
              : 'Register to unlock exclusive launches and trace carbon offsets.'}
          </p>
        </div>

        {/* 3.2. Form inputs segment */}
        <AuthForm
          isLogin={isLogin}
          name={name}
          onNameChange={setName}
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />

        {/* 3.3. Toggler switch button (Login <=> Register) */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-xs text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber underline font-semibold focus:outline-none"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        {/* 3.4. Footer security policy note */}
        <div className="border-t border-earth-olive/10 pt-4 flex items-center justify-center gap-1.5 text-[10px] text-earth-olive/60 dark:text-earth-sand/65 text-center">
          <ShieldCheck size={14} className="text-green-600" /> Secure 256-bit credentials encryption.
        </div>

      </div>

    </div>
  );
}
