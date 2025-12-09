import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { mockProducts, mockCategories } from '../mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Just Do It
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Unleash your potential with premium athletic wear. Engineered for performance, designed for life.
            </p>
            <Button 
              onClick={() => navigate('/products/all')}
              className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              Shop Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-black mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/products/${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold uppercase tracking-wide">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-black">Featured Products</h2>
            <Link 
              to="/products/all" 
              className="text-black hover:text-gray-600 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-black mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 capitalize">{product.category}</p>
                  <p className="text-black font-bold text-lg">${product.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $100</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-performance materials built to last</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
