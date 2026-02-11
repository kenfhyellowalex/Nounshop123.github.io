import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { RiderStatus } from '../types';
import { MapPin, Navigation, Phone, CheckCircle, Package } from 'lucide-react';

const RiderApp: React.FC = () => {
  const [status, setStatus] = useState<RiderStatus>(RiderStatus.Online);
  const [activeTab, setActiveTab] = useState<'available' | 'active'>('available');

  // Mock active order for demo
  const activeOrder = MOCK_ORDERS[1];

  return (
    <div className="flex justify-center h-[calc(100vh-2rem)] bg-gray-100 py-4">
      {/* Mobile Frame */}
      <div className="w-[375px] bg-white rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden flex flex-col relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-xl z-20"></div>
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6 pt-12">
           <div className="flex justify-between items-center mb-4">
               <h2 className="font-bold text-lg">Rider Dashboard</h2>
               <div className={`w-3 h-3 rounded-full ${status === RiderStatus.Online ? 'bg-green-400' : 'bg-red-400'} shadow`}></div>
           </div>
           
           <div className="flex bg-indigo-700 p-1 rounded-lg">
               <button 
                 onClick={() => setStatus(RiderStatus.Online)}
                 className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${status === RiderStatus.Online ? 'bg-white text-indigo-700' : 'text-indigo-200'}`}
               >
                 ONLINE
               </button>
               <button 
                 onClick={() => setStatus(RiderStatus.Offline)}
                 className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${status === RiderStatus.Offline ? 'bg-white text-indigo-700' : 'text-indigo-200'}`}
               >
                 OFFLINE
               </button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Tabs */}
            <div className="flex bg-white border-b border-gray-100">
               <button 
                 onClick={() => setActiveTab('available')}
                 className={`flex-1 py-4 text-sm font-bold border-b-2 ${activeTab === 'available' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
               >
                 Available (2)
               </button>
               <button 
                 onClick={() => setActiveTab('active')}
                 className={`flex-1 py-4 text-sm font-bold border-b-2 ${activeTab === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
               >
                 Active Job
               </button>
            </div>

            <div className="p-4 space-y-4">
               {activeTab === 'available' ? (
                   <>
                       {[1005, 1006].map(id => (
                           <div key={id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                               <div className="flex justify-between items-start mb-3">
                                   <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">
                                       ${(Math.random() * 5 + 2).toFixed(2)} Earnings
                                   </div>
                                   <span className="text-xs text-gray-400">2.5 km</span>
                               </div>
                               <h3 className="font-bold text-gray-800 mb-1">Order #{id}</h3>
                               <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                                   <MapPin size={16} className="mt-0.5 shrink-0" />
                                   <p>123 Main St, Central District</p>
                               </div>
                               <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-700">
                                   ACCEPT DELIVERY
                               </button>
                           </div>
                       ))}
                   </>
               ) : (
                   <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                       <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                           <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                               <Package size={20} />
                           </div>
                           <div>
                               <h3 className="font-bold text-gray-800">Order #{activeOrder.id}</h3>
                               <p className="text-xs text-gray-500">Pick up from: Noun Burger</p>
                           </div>
                       </div>
                       
                       <div className="space-y-4 mb-6 relative">
                           {/* Timeline line */}
                           <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>
                           
                           <div className="flex gap-4">
                               <div className="w-7 h-7 bg-green-500 rounded-full border-4 border-white shadow flex items-center justify-center shrink-0">
                                   <CheckCircle size={12} className="text-white" />
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-800">Order Accepted</p>
                                   <p className="text-xs text-gray-500">10:30 AM</p>
                               </div>
                           </div>
                           <div className="flex gap-4">
                               <div className="w-7 h-7 bg-indigo-600 rounded-full border-4 border-white shadow flex items-center justify-center shrink-0">
                                   <Navigation size={12} className="text-white" />
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-800">Heading to Store</p>
                                   <p className="text-xs text-indigo-600 font-bold">In Progress</p>
                               </div>
                           </div>
                           <div className="flex gap-4 opacity-50">
                               <div className="w-7 h-7 bg-gray-200 rounded-full border-4 border-white shrink-0"></div>
                               <div>
                                   <p className="text-sm font-bold text-gray-800">Pickup</p>
                               </div>
                           </div>
                           <div className="flex gap-4 opacity-50">
                               <div className="w-7 h-7 bg-gray-200 rounded-full border-4 border-white shrink-0"></div>
                               <div>
                                   <p className="text-sm font-bold text-gray-800">Delivery</p>
                               </div>
                           </div>
                       </div>

                       <div className="flex gap-3">
                           <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                               <Phone size={16} /> Call
                           </button>
                           <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm">
                               ARRIVED
                           </button>
                       </div>
                   </div>
               )}
            </div>
        </div>

        {/* Bottom Nav Mock */}
        <div className="bg-white border-t border-gray-100 p-4 pb-8 flex justify-around">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RiderApp;