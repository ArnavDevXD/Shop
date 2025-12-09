export const mockProducts = [
  {
    id: '1',
    name: 'Air Sprint Pro',
    category: 'men',
    subcategory: 'shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    description: 'Engineered for speed and comfort. Premium cushioning meets responsive energy return.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red'],
    featured: true
  },
  {
    id: '2',
    name: 'Performance Tee',
    category: 'men',
    subcategory: 'tops',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
    ],
    description: 'Moisture-wicking fabric keeps you dry and comfortable during intense workouts.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    featured: true
  },
  {
    id: '3',
    name: 'Elite Runner',
    category: 'women',
    subcategory: 'shoes',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'
    ],
    description: 'Lightweight design with maximum support. Built for the modern athlete.',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Pink', 'White', 'Black'],
    featured: true
  },
  {
    id: '4',
    name: 'Training Shorts',
    category: 'men',
    subcategory: 'bottoms',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'
    ],
    description: 'Breathable fabric with secure pockets. Perfect for your toughest workouts.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    featured: false
  },
  {
    id: '5',
    name: 'Sport Leggings',
    category: 'women',
    subcategory: 'bottoms',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800'
    ],
    description: 'High-waisted design with compression fit. Sweat-wicking technology included.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Purple', 'Teal'],
    featured: true
  },
  {
    id: '6',
    name: 'Training Hoodie',
    category: 'men',
    subcategory: 'tops',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'
    ],
    description: 'Premium fleece with modern fit. Stay warm without sacrificing style.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy'],
    featured: false
  },
  {
    id: '7',
    name: 'Court Classic',
    category: 'unisex',
    subcategory: 'shoes',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    description: 'Timeless style meets modern comfort. Perfect for everyday wear.',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black'],
    featured: true
  },
  {
    id: '8',
    name: 'Sport Backpack',
    category: 'accessories',
    subcategory: 'bags',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
    ],
    description: 'Durable construction with multiple compartments. Perfect for gym or travel.',
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
    featured: false
  }
];

export const mockCategories = [
  { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800' },
  { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800' },
  { id: 'shoes', name: 'Shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?w=800' }
];

// Shopping cart functionality (localStorage-based)
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, size, color, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(
    item => item.id === product.id && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      selectedSize: size,
      selectedColor: color,
      quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId, size, color) => {
  let cart = getCart();
  cart = cart.filter(
    item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
  );
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateCartQuantity = (productId, size, color, quantity) => {
  const cart = getCart();
  const item = cart.find(
    item => item.id === productId && item.selectedSize === size && item.selectedColor === color
  );
  
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

