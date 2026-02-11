import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus, OrderType } from '../types';
import { Clock, CheckCircle, ChefHat, Flame } from 'lucide-react';

const Kitchen: React.FC = () => {
  // Filter for active kitchen orders
  const [orders, setOrders] = useState(
    MOCK_ORDERS.filter(o => [OrderStatus.Pending, OrderStatus.Cooking, OrderStatus.Paid].includes(o.status))
  );

  const updateStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    // In a real app, you would also filter it out if it moves to 'Ready' or 'Done' depending on the view
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <ChefHat className="text-orange-500" /> Kitchen Display System
           </h2>
           <p className="text-gray-500 text-sm">Manage preparation and cooking status</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Pending
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span> Cooking
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span> Ready
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className={`border-l-4 rounded-r-xl shadow-sm bg-white overflow-hidden flex flex-col ${
                order.status === OrderStatus.Cooking ? 'border-orange-500' : 
                order.status === OrderStatus.Ready ? 'border-green-500' : 'border-yellow-400'
            }`}
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-lg text-gray-800">#{order.id}</h3>
                  <span className={`text-xs font-bold uppercase ${order.order_type === OrderType.Online ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {order.order_type}
                  </span>
               </div>
               <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                     <Clock size={12} /> 12:45
                  </div>
                  <span className="text-xs text-gray-400">10m ago</span>
               </div>
            </div>

            <div className="p-4 flex-1">
               <ul className="space-y-3">
                  {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between items-start">
                         <span className="font-bold text-gray-800 text-lg">{item.qty}x</span>
                         <span className="flex-1 ml-3 text-gray-700 font-medium">{item.product_name}</span>
                      </li>
                  ))}
               </ul>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100">
               {order.status === OrderStatus.Cooking ? (
                   <button 
                     onClick={() => updateStatus(order.id, OrderStatus.Ready)}
                     className="w-full bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700"
                   >
                     <CheckCircle size={20} /> MARK READY
                   </button>
               ) : (
                   <button 
                     onClick={() => updateStatus(order.id, OrderStatus.Cooking)}
                     className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-600"
                   >
                     <Flame size={20} /> START COOKING
                   </button>
               )}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
            <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <ChefHat size={48} className="mb-2 opacity-20" />
                <p>All caught up! No pending orders.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;