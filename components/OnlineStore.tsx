import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { ShoppingBag, Star, Plus, MapPin } from 'lucide-react';

interface CartItem extends Product {
    qty: number;
}

const OnlineStore: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState('All');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const categories = ['All', 'Burgers', 'Drinks', 'Sides', 'Salads'];
  const filteredProducts = category === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === category);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-8">
       {/* Main Content */}
       <div className="flex-1 overflow-y-auto pr-2">
          {/* Header */}
          <div className="bg-yellow-400 rounded-2xl p-8 mb-8 text-yellow-900 relative overflow-hidden">
             <div className="relative z-10">
                <h1 className="text-4xl font-extrabold mb-2">Hungry?</h1>
                <p className="text-yellow-800 font-medium">Order your favorites and get them delivered fast.</p>
                <div className="mt-6 flex gap-3">
                   <button className="bg-white text-yellow-900 px-6 py-2 rounded-full font-bold shadow-sm hover:bg-yellow-50">Start Order</button>
                   <button className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold shadow-sm hover:bg-yellow-600">Promotions</button>
                </div>
             </div>
             <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 bg-black transform skew-x-12"></div>
          </div>

          {/* Categories */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
             {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setCategory(cat)}
                   className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                       category === cat ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                     {cat}
                 </button>
             ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredProducts.map(product => (
                 <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <button 
                          onClick={() => addToCart(product)}
                          className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-900 hover:bg-yellow-400 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{product.name}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded">
                            <Star size={10} fill="currentColor" /> 4.8
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">Juicy beef patty with cheddar cheese, lettuce, tomato and house sauce.</p>
                    <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
                 </div>
             ))}
          </div>
       </div>

       {/* Checkout Sidebar */}
       <div className="w-96 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full sticky top-0">
          <div className="p-6 border-b border-gray-100">
             <h2 className="font-bold text-xl text-gray-900">Your Order</h2>
             <p className="text-gray-500 text-sm">Delivery to: <span className="text-indigo-600 font-medium">Home</span></p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             {cart.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                     <ShoppingBag size={48} className="mb-2" />
                     <p>Cart is empty</p>
                 </div>
             ) : (
                 cart.map(item => (
                     <div key={item.id} className="flex gap-4">
                         <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                         <div className="flex-1">
                             <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                             <p className="text-gray-500 text-xs mt-1">x{item.qty}</p>
                         </div>
                         <span className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                     </div>
                 ))
             )}
          </div>

          <div className="p-6 bg-gray-50 rounded-b-2xl">
             <div className="space-y-3 mb-6">
                 <div className="flex justify-between text-sm text-gray-600">
                     <span>Subtotal</span>
                     <span>${cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm text-gray-600">
                     <span>Delivery Fee</span>
                     <span>$2.00</span>
                 </div>
                 <div className="flex justify-between font-bold text-xl text-gray-900 pt-4 border-t border-gray-200">
                     <span>Total</span>
                     <span>${(cartTotal + 2).toFixed(2)}</span>
                 </div>
             </div>

             <div className="space-y-3">
                 <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                 <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                 <button className="w-full bg-yellow-400 text-yellow-900 font-bold py-4 rounded-xl shadow-sm hover:bg-yellow-500 transition-colors">
                     Checkout
                 </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default OnlineStore;