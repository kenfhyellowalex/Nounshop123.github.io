import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { Search, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

interface CartItem extends Product {
  qty: number;
}

const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      }).filter((item) => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6">
      {/* Product Grid */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Burgers', 'Drinks', 'Sides'].map(cat => (
              <button key={cat} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => addToCart(product)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
              <div className="mt-auto flex justify-between items-center pt-2">
                <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">{product.stock} left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-96 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Current Order</h3>
          <p className="text-sm text-gray-500">Order #1004 • POS</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart size={48} className="mb-2 opacity-20" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                 <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                    <h5 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h5>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-gray-100 rounded"><Minus size={14} /></button>
                      <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-gray-100 rounded"><Plus size={14} /></button>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                    <button onClick={() => updateQty(item.id, -item.qty)} className="text-red-400 hover:text-red-600 mt-2"><Trash2 size={14} /></button>
                 </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <CreditCard size={18} />
            Charge ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple icon placeholder helper
const ShoppingCart = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

export default POS;