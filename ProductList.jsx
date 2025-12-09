import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../mock';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let products = category === 'all' 
      ? mockProducts 
      : mockProducts.filter(p => {
          if (category === 'shoes') return p.subcategory === 'shoes';
          if (category === 'accessories') return p.category === 'accessories';
          return p.category === category;
        });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [category, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black capitalize mb-2">
              {category === 'all' ? 'All Products' : category}
            </h1>
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
          <div className="w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-square overflow-hidden rounded-t-lg">
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
                {product.colors && product.colors.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-gray-200"
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase()
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

