export const products = [
  {
    id: 1,
    name: "The Sylvan Tote",
    category: "Tote Bags",
    price: 79.00,
    rating: 4.8,
    reviewsCount: 32,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A luxurious, spacious tote bag with organic cotton lining and internal zippered pockets. Handcrafted by local artisans using 100% natural organic jute. Perfect for daily commutes, luxury beach outings, or weekend shopping.",
    details: {
      material: "100% Organic Jute Fiber, GOTS-Certified Cotton Lining",
      dimensions: "16\" W x 14\" H x 6\" D",
      origin: "Hooghly River Delta, West Bengal",
      care: "Spot clean only with a damp cloth. Do not submerge."
    },
    impact: {
      plasticSaved: 150, // bags per year
      co2Offset: "4.8 kg",
      weaverHours: 12
    },
    inStock: true,
    tag: "Artisan Craft"
  },
  {
    id: 2,
    name: "Aurelia Handbag",
    category: "Luxury Handbags",
    price: 125.00,
    rating: 4.9,
    reviewsCount: 48,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Elegant dual-toned luxury handbag featuring hand-braided jute handles, structured bottom feet, and premium rust-proof brass hardware. Features magnetic closures and premium inner dividers.",
    details: {
      material: "Premium Fine-Woven Golden Jute, Natural Vegetable Dye",
      dimensions: "12\" W x 10\" H x 4\" D",
      origin: "Kolkata Craft Guild",
      care: "Keep away from prolonged dampness. Air dry if wet."
    },
    impact: {
      plasticSaved: 90,
      co2Offset: "3.2 kg",
      weaverHours: 24
    },
    inStock: true,
    tag: "Best Seller"
  },
  {
    id: 3,
    name: "Virdis Travel Duffel",
    category: "Travel Bags",
    price: 149.00,
    rating: 4.7,
    reviewsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Heavy-duty woven jute travel duffel, reinforced with vegetable-tanned olive leather accents and water-resistant lining. Includes adjustable woven shoulder strap and external utility pockets.",
    details: {
      material: "Thick Jute Canvas, Vegetable-Tanned Eco Leather, YKK Zippers",
      dimensions: "22\" W x 11\" H x 10\" D",
      origin: "Sundarbans Eco Initiative",
      care: "Treat leather parts with wax. Wipe jute with a soft brush."
    },
    impact: {
      plasticSaved: 200,
      co2Offset: "6.5 kg",
      weaverHours: 18
    },
    inStock: true,
    tag: "New Arrival"
  },
  {
    id: 4,
    name: "The Terra Clutch",
    category: "Clutch & Pouches",
    price: 35.00,
    rating: 4.6,
    reviewsCount: 64,
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A minimalist zippered clutch bag with gold-weave jute thread and organic canvas border. Features a removable wristlet strap and smooth running internal silk lining.",
    details: {
      material: "Lurex-infused Golden Jute Thread, Cotton Canvas",
      dimensions: "9\" W x 6\" H x 1.5\" D",
      origin: "Murshidabad Weaver Society",
      care: "Gently wipe with dry cloth. Do not wash."
    },
    impact: {
      plasticSaved: 75,
      co2Offset: "1.9 kg",
      weaverHours: 6
    },
    inStock: true,
    tag: "Artisan Craft"
  },
  {
    id: 5,
    name: "Hooghly Shopper",
    category: "Utility Bags",
    price: 29.00,
    rating: 4.8,
    reviewsCount: 120,
    images: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "High-capacity utility shopping bag with comfortable padded cotton handles and a flat rigid base. Fully laminated inside with starch-based biodegradable coating to resist damp items.",
    details: {
      material: "Raw Dense-Woven Jute, Starch-Laminated Lining, Cotton Webbing Handles",
      dimensions: "15\" W x 16\" H x 8\" D",
      origin: "Hooghly River Delta",
      care: "Wipe interior clean with a damp sponge. Hang dry."
    },
    impact: {
      plasticSaved: 300,
      co2Offset: "9.2 kg",
      weaverHours: 4
    },
    inStock: true,
    tag: "Value Pack"
  },
  {
    id: 6,
    name: "Bacchus Wine Tote",
    category: "Specialty Bags",
    price: 45.00,
    rating: 4.9,
    reviewsCount: 24,
    images: [
      "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A padded 4-bottle wine carrier with removable dividers, woven in dense premium jute to insulate and protect your bottles. Ideal for picnics, catering, or gifting.",
    details: {
      material: "Heavy-Woven Insulated Jute, Felt Compartments",
      dimensions: "8\" W x 14\" H x 8\" D",
      origin: "Sundarbans Eco Initiative",
      care: "Spot clean dividers. Dry thoroughly after use."
    },
    impact: {
      plasticSaved: 110,
      co2Offset: "3.8 kg",
      weaverHours: 8
    },
    inStock: false,
    tag: "Limited Stock"
  }
];
