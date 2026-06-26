/**
 * @file Dashboard.jsx
 * @path src/pages/Dashboard.jsx
 * @description Customer account portal dashboard. Synchronizes navigation tabs via URL query parameters,
 * loads orders from localStorage history, processes logout sequences, and orchestrates
 * wishlist and sustainability LEDGER dashboards.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Leaf, History } from 'lucide-react';

// Global context hook for wishlist contents
import { useWishlist } from '../context/WishlistContext';

// Modular features components extracted from this view
import DashboardHeader from '../components/features/dashboard/DashboardHeader';
import OrderHistory from '../components/features/dashboard/OrderHistory';
import WishlistTab from '../components/features/dashboard/WishlistTab';
import CarbonLedgerTab from '../components/features/dashboard/CarbonLedgerTab';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Dashboard() {
  /* --- ROUTER HOOKS --- */
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  /* --- CONTEXTS STATE --- */
  const { wishlist, toggleWishlist } = useWishlist();

  /* --- DERIVED AND LOCAL STATES --- */
  // Derives the active tab value directly from the query parameter
  const activeTab = tabParam || 'orders';

  // Lazily load user info from localStorage to avoid setting state in effect
  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Lazily load orders from localStorage to avoid setting state in effect
  const [orders] = useState(() => {
    let savedOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    if (savedOrders.length === 0) {
      savedOrders = [
        {
          orderId: 'SLJ-928410',
          date: 'May 12, 2026',
          total: 112.95,
          status: 'Delivered',
          items: [
            { name: 'The Sylvan Tote', quantity: 1, color: 'Natural', size: 'Standard', price: 79.00 },
            { name: 'The Terra Clutch', quantity: 1, color: 'Earth Crimson', size: 'Standard', price: 35.00 }
          ]
        },
        {
          orderId: 'SLJ-382902',
          date: 'April 02, 2026',
          total: 29.00,
          status: 'Delivered',
          items: [
            { name: 'Hooghly Shopper', quantity: 1, color: 'Natural', size: 'Standard', price: 29.00 }
          ]
        }
      ];
      localStorage.setItem('mockOrders', JSON.stringify(savedOrders));
    }
    return savedOrders;
  });

  // Redirect to login if user credentials do not exist on mount
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  /* --- LOGOUT SEQUENCING --- */
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  // Skip loading checks if user is unauthorized
  if (!user) return null;

  /* ==========================================================================
     3. CARBON CALCULATIONS METRICS
     ========================================================================== */
  const totalBagsOrdered = orders.reduce((sum, order) => 
    sum + order.items.reduce((s, i) => s + i.quantity, 0)
  , 0);
  
  // Reusable golden jute bag trips rating metrics (replaces 150 single-use bags)
  const cumulativePlasticBagsSaved = totalBagsOrdered * 150;
  
  // Net CO₂ saved (approx 0.08 kg per plastic bag omitted)
  const cumulativeCo2Offset = (cumulativePlasticBagsSaved * 0.08).toFixed(1);

  /* ==========================================================================
     4. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* 4.1. Account header banner card */}
      <DashboardHeader user={user} onLogout={handleLogout} />

      {/* 4.2. Core Tab layout grid (Navigation sidebar + Tabs main contents) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar Panel */}
        <aside className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-earth-olive/10 lg:pr-6">
          
          {/* Order history tab toggle */}
          <button
            onClick={() => { setSearchParams({ tab: 'orders' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap focus:outline-none ${
              activeTab === 'orders'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <History size={16} /> Order History
          </button>
          
          {/* Wishlist tab toggle */}
          <button
            onClick={() => { setSearchParams({ tab: 'wishlist' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap focus:outline-none ${
              activeTab === 'wishlist'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <Heart size={16} /> Wishlist ({wishlist.length})
          </button>
          
          {/* Sustainability offsets tab toggle */}
          <button
            onClick={() => { setSearchParams({ tab: 'ledger' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap focus:outline-none ${
              activeTab === 'ledger'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <Leaf size={16} /> Carbon Ledger
          </button>
        </aside>

        {/* Tab display main content area */}
        <main className="lg:col-span-9">
          
          {/* 1. Order History Display */}
          {activeTab === 'orders' && <OrderHistory orders={orders} />}

          {/* 2. Wishlist Grid Display */}
          {activeTab === 'wishlist' && (
            <WishlistTab wishlist={wishlist} onRemove={toggleWishlist} />
          )}

          {/* 3. Carbon Sustainability calculations display */}
          {activeTab === 'ledger' && (
            <CarbonLedgerTab
              totalBagsOrdered={totalBagsOrdered}
              cumulativePlasticBagsSaved={cumulativePlasticBagsSaved}
              cumulativeCo2Offset={cumulativeCo2Offset}
            />
          )}

        </main>

      </div>

    </div>
  );
}
