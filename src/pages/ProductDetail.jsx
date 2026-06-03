import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowLeft, Check, Leaf, HelpCircle, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-earth-olive dark:text-earth-sand">Product not found</h2>
        <Link to="/shop" className="mt-4 inline-block bg-earth-olive text-white px-6 py-2.5 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState('Natural');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');

  // Reset page parameters when ID changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setQuantity(1);
    setSelectedColor('Natural');
    setSelectedSize('Standard');
    window.scrollTo(0, 0);
  }, [id, product]);

  const favorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Find related products (same category or general list, excluding active product)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || products.indexOf(p) < 3))
    .slice(0, 3);

  const colors = [
    { name: 'Natural', class: 'bg-[#eadaab] border-amber-800/20' },
    { name: 'Forest Olive', class: 'bg-[#5c6339] border-emerald-950/20' },
    { name: 'Earth Crimson', class: 'bg-[#a3243c] border-red-950/20' }
  ];

  const sizes = ['Standard', 'Large'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Back to Shop Nav Link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-earth-olive/75 hover:text-earth-crimson dark:text-earth-sand/75 dark:hover:text-earth-amber mb-8"
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      {/* Main Grid: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* Left: Interactive Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-earth-sand/20 rounded-2xl overflow-hidden aspect-[4/5] border border-earth-olive/10 dark:border-earth-sand/10">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 aspect-square flex-shrink-0 ${
                  activeImage === img
                    ? 'border-earth-crimson dark:border-earth-amber'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-earth-olive dark:text-earth-sand mt-2">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-earth-amber">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(product.rating) ? 'text-earth-amber' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-earth-olive dark:text-earth-sand">
              {product.rating} / 5
            </span>
            <span className="text-xs text-earth-olive/50 dark:text-earth-sand/50">
              ({product.reviewsCount} verified customers)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-display font-bold text-earth-crimson dark:text-earth-amber border-b border-earth-olive/10 pb-4">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed text-sm">
            {product.description}
          </p>

          {/* Configuration Selection */}
          <div className="space-y-4 pt-2">
            
            {/* Color Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
                Fiber Dye / Color: <span className="text-earth-olive dark:text-earth-sand">{selectedColor}</span>
              </span>
              <div className="flex gap-3 mt-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all ${color.class} ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-earth-crimson dark:ring-earth-amber'
                        : 'hover:scale-105'
                    }`}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
                Size: <span className="text-earth-olive dark:text-earth-sand">{selectedSize}</span>
              </span>
              <div className="flex gap-3 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-earth-olive text-white border-earth-olive dark:bg-earth-amber dark:text-earth-forest dark:border-earth-amber'
                        : 'bg-white/40 dark:bg-earth-charcoal/40 text-earth-olive dark:text-earth-sand border-earth-olive/20'
                    }`}
                  >
                    {size === 'Large' ? 'Large (+$15)' : 'Standard'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
                Quantity
              </span>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-earth-olive/20 rounded-lg overflow-hidden bg-white/40 dark:bg-earth-charcoal/40">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2.5 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-earth-olive dark:text-earth-sand min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2.5 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Add to Cart / Wishlist Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 py-4 px-6 rounded-full font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest'
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="flex-1 py-4 px-6 rounded-full bg-earth-olive/10 text-earth-olive/45 font-bold cursor-not-allowed border border-earth-olive/10 flex items-center justify-center gap-2"
              >
                Out of Stock
              </button>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-4 border rounded-full transition-all flex items-center justify-center ${
                favorited
                  ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
                  : 'border-earth-olive/20 text-earth-olive hover:bg-earth-olive/5 dark:text-earth-sand'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={20} fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Detailed specifications tab accordions */}
          <div className="border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl overflow-hidden bg-white/30 dark:bg-earth-charcoal/20">
            
            {/* Spec Tab headers */}
            <div className="flex border-b border-earth-olive/10 dark:border-earth-sand/10 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveAccordion('details')}
                className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
                  activeAccordion === 'details'
                    ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
                    : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
                }`}
              >
                Spec Details
              </button>
              <button
                onClick={() => setActiveAccordion('eco')}
                className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
                  activeAccordion === 'eco'
                    ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
                    : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
                }`}
              >
                Eco Impact
              </button>
              <button
                onClick={() => setActiveAccordion('shipping')}
                className={`flex-1 py-3 px-2 border-b-2 text-center transition-all ${
                  activeAccordion === 'shipping'
                    ? 'border-earth-crimson text-earth-crimson dark:border-earth-amber dark:text-earth-amber'
                    : 'border-transparent text-earth-olive/60 dark:text-earth-sand/60'
                }`}
              >
                Shipping & Care
              </button>
            </div>

            {/* Spec content block */}
            <div className="p-4 text-xs space-y-3 leading-relaxed text-earth-olive/80 dark:text-earth-sand/80">
              {activeAccordion === 'details' && (
                <div className="grid grid-cols-2 gap-y-2.5">
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Materials:</span>
                  <span>{product.details.material}</span>
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Dimensions:</span>
                  <span>{product.details.dimensions} (H x W x D)</span>
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Weaving Origin:</span>
                  <span>{product.details.origin}</span>
                </div>
              )}
              {activeAccordion === 'eco' && (
                <div className="grid grid-cols-2 gap-y-2.5">
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Plastic Saved Annual:</span>
                  <span className="flex items-center gap-1 text-green-600 font-bold">
                    <Leaf size={12} /> {product.impact.plasticSaved} bags/yr
                  </span>
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Carbon Offset:</span>
                  <span>{product.impact.co2Offset} CO₂ eq.</span>
                  <span className="font-semibold text-earth-olive dark:text-earth-sand">Artisan Hours Funded:</span>
                  <span>{product.impact.weaverHours} hours of weaving wages</span>
                </div>
              )}
              {activeAccordion === 'shipping' && (
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5"><Truck size={14} className="text-earth-crimson dark:text-earth-amber" /> Carbon-neutral shipping on orders above $100.</p>
                  <p className="flex items-center gap-1.5"><HelpCircle size={14} className="text-earth-crimson dark:text-earth-amber" /> <strong>Care:</strong> {product.details.care}</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Related Products Footer Panel */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-earth-olive/15 dark:border-earth-sand/15 pt-16">
          <h2 className="text-2xl font-bold text-earth-olive dark:text-earth-sand mb-8">
            Complete the Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
