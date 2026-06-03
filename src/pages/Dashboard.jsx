import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { User, LogOut, Package, Heart, Leaf, Settings, History, Calendar, Trash2 } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const { wishlist, toggleWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState(tabParam || 'orders');

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Sync tab with query parameters
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    // Authenticate user check
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(savedUser));

    // Load orders
    let savedOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    if (savedOrders.length === 0) {
      // Seed initial mock orders to make dashboard look rich and complete
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
    setOrders(savedOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (!user) return null;

  // Calculate cumulative offsets
  const totalBagsOrdered = orders.reduce((sum, order) => 
    sum + order.items.reduce((s, i) => s + i.quantity, 0)
  , 0);
  const cumulativePlasticBagsSaved = totalBagsOrdered * 150; 
  const cumulativeCo2Offset = (cumulativePlasticBagsSaved * 0.08).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Profile Banner */}
      <div className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest font-bold text-2xl rounded-full flex items-center justify-center shadow-md uppercase">
            {user.name.charAt(0)}
          </div>
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

        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-earth-olive/30 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 dark:border-earth-sand/35 dark:hover:bg-red-500/15 rounded-lg text-xs font-bold text-earth-olive dark:text-earth-sand flex items-center gap-1.5 transition-all"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Tabs */}
        <aside className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-earth-olive/10 lg:pr-6">
          <button
            onClick={() => { setActiveTab('orders'); setSearchParams({ tab: 'orders' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <History size={16} /> Order History
          </button>
          
          <button
            onClick={() => { setActiveTab('wishlist'); setSearchParams({ tab: 'wishlist' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <Heart size={16} /> Wishlist ({wishlist.length})
          </button>
          
          <button
            onClick={() => { setActiveTab('ledger'); setSearchParams({ tab: 'ledger' }); }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'bg-earth-olive text-white dark:bg-earth-amber dark:text-earth-forest'
                : 'text-earth-olive/70 hover:bg-earth-olive/5 dark:text-earth-sand/70 dark:hover:bg-white/5'
            }`}
          >
            <Leaf size={16} /> Carbon Ledger
          </button>
        </aside>

        {/* Tab Contents */}
        <main className="lg:col-span-9">
          
          {/* 1. Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
                <Package size={20} /> Your Orders
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-earth-olive/10 dark:border-earth-sand/10 pb-3 gap-2">
                        <div className="flex gap-4 text-xs font-semibold text-earth-olive/60 dark:text-earth-sand/65">
                          <div>
                            <span>ORDER ID</span>
                            <p className="font-bold text-sm text-earth-olive dark:text-earth-sand mt-0.5">{order.orderId}</p>
                          </div>
                          <div>
                            <span>DATE PLACED</span>
                            <p className="font-bold text-sm text-earth-olive dark:text-earth-sand mt-0.5">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0 justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                            {order.status}
                          </span>
                          <span className="font-display font-bold text-earth-crimson dark:text-earth-amber text-lg sm:mt-1">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-earth-olive/85 dark:text-earth-sand/85">
                              {item.name} <span className="text-xs text-gray-500 font-semibold">x{item.quantity}</span>
                              <span className="block text-[10px] text-gray-400">Color: {item.color} | Size: {item.size}</span>
                            </span>
                            <span className="font-bold text-earth-olive dark:text-earth-sand">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-earth-olive/60 dark:text-earth-sand/60">No orders found.</p>
              )}

            </div>
          )}

          {/* 2. Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
                <Heart size={20} /> Your Wishlist
              </h2>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard product={product} />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute bottom-5 right-16 p-2.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                        title="Remove from Wishlist"
                        aria-label="Remove from Wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-earth-olive/5 rounded-xl border border-dashed border-earth-olive/15">
                  <span className="text-3xl">❤️</span>
                  <h4 className="font-bold mt-3 text-earth-olive dark:text-earth-sand">Your Wishlist is empty</h4>
                  <p className="text-xs text-earth-olive/60 dark:text-earth-sand/65 mt-1 mb-4">Save items you like for later purchase.</p>
                  <Link to="/shop" className="px-6 py-2 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest text-xs font-bold rounded-full">
                    Shop Collection
                  </Link>
                </div>
              )}

            </div>
          )}

          {/* 3. Carbon Ledger */}
          {activeTab === 'ledger' && (
            <div className="space-y-6">
              
              <div className="p-6 bg-earth-olive/10 dark:bg-earth-charcoal/30 border border-earth-olive/10 dark:border-earth-sand/5 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
                  <Leaf size={20} className="text-green-600 animate-pulse" /> Your Personal Sustainability Offset
                </h2>
                <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
                  Every Soulajute bag replaces hundreds of single-use carrier bags. Below is a calculation of the net savings and carbon offsets your purchases have made possible.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
                  
                  <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
                    <span className="text-3xl font-extrabold text-earth-olive dark:text-earth-amber">{totalBagsOrdered}</span>
                    <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">Bags Purchased</p>
                  </div>

                  <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
                    <span className="text-3xl font-extrabold text-earth-crimson dark:text-earth-amber">{cumulativePlasticBagsSaved}</span>
                    <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">Plastic Bags Prevented</p>
                  </div>

                  <div className="bg-white/70 dark:bg-earth-forest/70 p-5 rounded-xl border border-earth-olive/10">
                    <span className="text-3xl font-extrabold text-earth-olive dark:text-earth-amber">{cumulativeCo2Offset} kg</span>
                    <p className="text-[10px] uppercase font-bold text-earth-olive/60 dark:text-earth-sand/65 mt-2">Net Carbon Offset</p>
                  </div>

                </div>
              </div>

              <div className="bg-white/60 dark:bg-earth-charcoal/40 p-6 rounded-xl border border-earth-olive/10 dark:border-earth-sand/10 space-y-3 text-xs leading-relaxed text-earth-olive/80 dark:text-earth-sand/80">
                <h4 className="font-bold text-sm text-earth-olive dark:text-earth-sand">How are these offsets computed?</h4>
                <p>1. <strong>Plastic Savings:</strong> Jute bags are reuse-rated for over 150 trips, replacing standard plastic carrier bags.</p>
                <p>2. <strong>CO₂ Equation:</strong> Prevents landfill accumulation and offsets approximately 0.08 kg of CO₂ emission equivalent per plastic bag omitted.</p>
              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}
