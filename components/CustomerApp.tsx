import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { Star, Clock, Home, Search, ShoppingBag, User } from 'lucide-react';

const CustomerApp: React.FC = () => {
  return (
    <div className="flex justify-center h-[calc(100vh-2rem)] bg-gray-100 py-4">
      {/* Mobile Frame */}
      <div className="w-[375px] bg-white rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden flex flex-col relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-xl z-20"></div>
        
        {/* Header */}
        <div className="p-6 pt-12 pb-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-sm text-gray-500 font-medium">Welcome back,</h2>
                    <h1 className="text-2xl font-bold text-gray-900">Sarah Connor</h1>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Loyalty Card */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Loyalty Balance</p>
                            <h3 className="text-3xl font-bold">1,250 <span className="text-sm font-normal text-gray-400">pts</span></h3>
                        </div>
                        <Star className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2">
                        <div className="bg-yellow-400 h-1.5 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-400">250 more points until free burger!</p>
                </div>
                <div className="absolute -right-4 -bottom-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-t-3xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
                <button className="text-indigo-600 text-sm font-medium">See All</button>
            </div>

            <div className="space-y-4">
                {MOCK_ORDERS.slice(0, 3).map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                            🍔
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-sm">Noun Burger</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{order.created_at.split(' ')[0]}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span className="text-xs font-medium text-green-600">{order.status}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-gray-900">${order.total.toFixed(2)}</span>
                            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mt-1">Reorder</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-4">Promotions</h3>
                <div className="bg-indigo-600 rounded-2xl p-4 text-white flex items-center justify-between">
                    <div>
                        <p className="font-bold text-lg">Free Delivery</p>
                        <p className="text-indigo-200 text-xs">On orders over $20</p>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold">
                        %
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center pb-8">
            <button className="flex flex-col items-center gap-1 text-indigo-600">
                <Home size={20} />
                <span className="text-[10px] font-bold">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
                <Search size={20} />
                <span className="text-[10px] font-medium">Browse</span>
            </button>
            <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg border-4 border-white">
                <ShoppingBag size={20} />
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
                <Clock size={20} />
                <span className="text-[10px] font-medium">History</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
                <User size={20} />
                <span className="text-[10px] font-medium">Account</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerApp;