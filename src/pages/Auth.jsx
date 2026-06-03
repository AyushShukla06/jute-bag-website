import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Leaf } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all details.');
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      // Store dummy user credentials in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: isLogin ? 'Ayush Shukla' : name,
        email: email,
        joined: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
      }));
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 transition-colors duration-300">
      
      <div className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-8 shadow-md space-y-6">
        
        {/* Logo and Intro */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-earth-olive/40" />
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-earth-olive/40" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-earth-olive/40" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm shadow-md flex items-center justify-center gap-2 pt-3"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white dark:border-earth-forest border-t-transparent rounded-full animate-spin" />
            ) : (
              isLogin ? 'Sign In' : 'Register'
            )}
          </button>

        </form>

        {/* Toggle */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-xs text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber underline font-semibold"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="border-t border-earth-olive/10 pt-4 flex items-center justify-center gap-1.5 text-[10px] text-earth-olive/60 dark:text-earth-sand/65 text-center">
          <ShieldCheck size={14} className="text-green-600" /> Secure 256-bit credentials encryption.
        </div>

      </div>

    </div>
  );
}
