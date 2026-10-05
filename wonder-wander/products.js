// Product catalog for the Shop All page.
// TODO: replace with the full catalog (223 items), ideally pulled live from Square.
// price: number in dollars, or null if not known yet. img: optional photo path.
window.CATEGORIES = [
  { id: 'games',   name: 'Games & Puzzles',     art: 'bird',     tint: 'tint-yellow' },
  { id: 'outdoor', name: 'Outdoor & Nature',    art: 'leaf',     tint: 'tint-green' },
  { id: 'crafts',  name: 'Arts & Crafts',       art: 'mushroom', tint: 'tint-pink' },
  { id: 'books',   name: 'Books',               art: 'frog',     tint: 'tint-sky' },
  { id: 'baby',    name: 'Baby & Toddler',      art: 'ladybug',  tint: 'tint-cream' },
  { id: 'science', name: 'Science & Building',  art: 'bird',     tint: 'tint-sky' }
];

window.PRODUCTS = [
  { id: 'huckleberry-paint-kit', name: 'Huckleberry Landscape Paint Kit', price: 20.00, cat: 'crafts', ages: '6+', featured: 1 },
  { id: 'magna-tiles-combo-62', name: 'Magna-Tiles Combo 62-Piece Set', price: 49.99, cat: 'science', ages: '3+', lowStock: true, featured: 2 },
  { id: 'tiny-ice-cream', name: 'Tiny Ice Cream!', price: null, cat: 'science', ages: '8+', featured: 3 },
  { id: 'magna-tiles-castle-25', name: 'Magna-Tiles Castle 25-Piece Set', price: null, cat: 'science', ages: '3+', featured: 4 },
  { id: 'leaf-lantern-kit', name: 'Leaf Lantern Kit', price: null, cat: 'outdoor', featured: 5 },
  { id: 'snug-as-a-bug', name: 'Snug as a Bug in a Rug', price: null, cat: 'games', featured: 6 }
];
