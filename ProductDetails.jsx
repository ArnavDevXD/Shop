import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, addToCart } from '../mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products/all')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg capitalize mb-6">{product.category}</p>
            <p className="text-3xl font-bold text-black mb-6">${product.price}</p>
            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-black mb-3">Color</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-black mb-3">Size</label>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-black mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-full"
              >
                <ShoppingBag className="mr-2" size={20} />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="px-6 py-6 border-2 border-gray-300 hover:border-black rounded-full"
              >
                <Heart size={20} />
              </Button>
            </div>

            {/* Product Features */}
            <Card className="mt-8 p-6 bg-gray-50">
              <h3 className="font-semibold text-black mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Premium quality materials</li>
                <li>• Moisture-wicking technology</li>
                <li>• Breathable and lightweight</li>
                <li>• Durable construction</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
