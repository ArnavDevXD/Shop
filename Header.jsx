import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { getCart } from '../mock';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight text-black">
              ANONYMOUS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products/men" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              MEN
            </Link>
            <Link to="/products/women" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              WOMEN
            </Link>
            <Link to="/products/shoes" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              SHOES
            </Link>
            <Link to="/products/accessories" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              ACCESSORIES
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-900 hover:text-gray-600 transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="relative text-gray-900 hover:text-gray-600 transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            <Link 
              to="/products/men" 
              className="block text-sm font-medium text-gray-900 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              MEN
            </Link>
            <Link 
              to="/products/women" 
              className="block text-sm font-medium text-gray-900 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              WOMEN
            </Link>
            <Link 
              to="/products/shoes" 
              className="block text-sm font-medium text-gray-900 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOES
            </Link>
            <Link 
              to="/products/accessories" 
              className="block text-sm font-medium text-gray-900 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              ACCESSORIES
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

