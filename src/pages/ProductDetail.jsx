/**
 * @file ProductDetail.jsx
 * @path src/pages/ProductDetail.jsx
 * @description Product Detail page view. Resolves the active route product ID,
 * manages quantity incrementing, syncs color/size attributes selections, handles addition to the global
 * cart/wishlist context, and aggregates related product suggestions.
 * Uses a nested component pattern with standard React `key` props to handle clean state resetting.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Product data source and reusable card UI element
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

// Global hooks for item cart and wishlist management
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Modular feature components extracted from this page
import ProductGallery from '../components/features/product/ProductGallery';
import ProductMeta from '../components/features/product/ProductMeta';
import ProductTabs from '../components/features/product/ProductTabs';

/* ==========================================================================
   2. DETAIL CONTENT INNER COMPONENT DEFINITION
   ========================================================================== */
/**
 * Renders the primary details page contents. Using a unique `key` prop on
 * mount resets this inner state automatically without requiring state synchronizer effects.
 */
function ProductDetailContent({ product }) {
  /* --- ROUTER HOOKS --- */
  const navigate = useNavigate();

  /* --- GLOBAL CONTEXT STATES --- */
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  /* --- LOCAL COMPONENT STATES --- */
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState('Natural');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');

  // Triggers scroll reset to the top on product loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* --- WISHLIST CHECKER --- */
  const favorited = isInWishlist(product.id);

  /* --- CONFIG DATA MAPS --- */
  const colors = [
    { name: 'Natural', class: 'bg-[#eadaab] border-amber-800/20' },
    { name: 'Forest Olive', class: 'bg-[#5c6339] border-emerald-950/20' },
    { name: 'Earth Crimson', class: 'bg-[#a3243c] border-red-950/20' }
  ];

  const sizes = ['Standard', 'Large'];

  // Filter 3 related products (matching category or fallback index)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || products.indexOf(p) < 3))
    .slice(0, 3);

  /* --- EVENT HANDLERS --- */
  /**
   * Dispatches the addToCart context callback and shows a temporary success notification.
   */
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /* ==========================================================================
     3. INNER RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* 3.1. Go Back Button Link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-earth-olive/75 hover:text-earth-crimson dark:text-earth-sand/75 dark:hover:text-earth-amber mb-8 focus:outline-none"
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      {/* 3.2. Primary Content Container Grid (Gallery + Meta & Options) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* Interactive Image Gallery */}
        <ProductGallery
          images={product.images}
          name={product.name}
          activeImage={activeImage}
          onActiveImageChange={setActiveImage}
        />

        {/* Product Configurations and Actions */}
        <div className="lg:col-span-6 space-y-6">
          <ProductMeta
            product={product}
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            added={added}
            favorited={favorited}
            onToggleWishlist={() => toggleWishlist(product)}
          />

          {/* Sizing, ecological indicators and care instructions panel */}
          <ProductTabs
            product={product}
            activeAccordion={activeAccordion}
            onActiveAccordionChange={setActiveAccordion}
          />
        </div>

      </div>

      {/* 3.3. Bottom Related Products Section */}
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

/* ==========================================================================
   4. OUTER WRAPPER COORDINATOR COMPONENT
   ========================================================================== */
export default function ProductDetail() {
  /* --- ROUTER HOOKS --- */
  const { id } = useParams();

  /* --- RETRIEVE ACTIVE PRODUCT --- */
  const product = products.find(p => p.id === parseInt(id));

  // Fallback view when catalog lookup fails
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

  // Mount inner content with a unique key based on product id
  return <ProductDetailContent key={id} product={product} />;
}
