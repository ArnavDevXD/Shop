import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateCartQuantity } from '../mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCart(getCart());
  };

  const handleRemove = (productId, size, color) => {
    removeFromCart(productId, size, color);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, size, color, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-3xl font-bold text-black mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Button 
              onClick={() => navigate('/products/all')}
              className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Continue Shopping
        </button>

        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="p-6">
                <div className="flex gap-6">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Color: {item.selectedColor}</p>
                        <p className="text-gray-600 text-sm">Size: {item.selectedSize}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-8 h-8 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-8 h-8 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-sm text-gray-600">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => toast.success('Checkout coming soon!')}
                className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-full"
              >
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
