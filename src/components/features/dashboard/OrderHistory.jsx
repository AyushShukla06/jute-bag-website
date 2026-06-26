/**
 * @file OrderHistory.jsx
 * @path src/components/features/dashboard/OrderHistory.jsx
 * @description Lists completed or processing orders. Formats order items summaries,
 * prices, dates, statuses, and ids in clear list cards.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Package } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function OrderHistory({
  orders
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="space-y-6">
      
      {/* 3.1. Tab Header Title */}
      <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
        <Package size={20} /> Your Orders
      </h2>

      {/* 3.2. Orders List check */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4"
            >
              
              {/* Order Metadata Row */}
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

              {/* Order Items list details */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-earth-olive/85 dark:text-earth-sand/85">
                      {item.name} <span className="text-xs text-gray-500 font-semibold">x{item.quantity}</span>
                      <span className="block text-[10px] text-gray-400">Color: {item.color} | Size: {item.size}</span>
                    </span>
                    <span className="font-bold text-earth-olive dark:text-earth-sand">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      ) : (
        // Empty history state
        <p className="text-sm text-earth-olive/60 dark:text-earth-sand/60">
          No orders found.
        </p>
      )}

    </div>
  );
}
