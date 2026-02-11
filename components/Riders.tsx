import React from 'react';
import { MOCK_RIDERS } from '../constants';
import { RiderStatus } from '../types';
import { Bike, MapPin, Phone, Circle } from 'lucide-react';

const Riders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-gray-800">Delivery Fleet</h2>
            <p className="text-gray-500 text-sm">Monitor rider status and assignments</p>
         </div>
         <div className="flex gap-2">
            <span className="flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> {MOCK_RIDERS.filter(r => r.status === 'online').length} Online
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div> {MOCK_RIDERS.filter(r => r.status === 'busy').length} Busy
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RIDERS.map((rider) => (
          <div key={rider.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            {rider.status === RiderStatus.Busy && (
               <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                 ON DELIVERY
               </div>
            )}
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                 <Bike size={24} />
              </div>
              <div>
                 <h3 className="font-bold text-gray-900">{rider.name}</h3>
                 <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Phone size={14} /> {rider.phone}
                 </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Status</span>
                 <span className={`font-medium flex items-center gap-1 ${
                    rider.status === RiderStatus.Online ? 'text-green-600' : 
                    rider.status === RiderStatus.Busy ? 'text-orange-600' : 'text-gray-400'
                 }`}>
                   <Circle size={8} fill="currentColor" /> {rider.status.toUpperCase()}
                 </span>
               </div>
               
               <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Completed Today</span>
                 <span className="font-medium text-gray-900">{rider.deliveries_completed}</span>
               </div>

               {rider.current_order_id && (
                 <div className="mt-3 bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-start gap-2">
                    <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs text-orange-700 font-bold">Delivering Order #{rider.current_order_id}</p>
                        <p className="text-xs text-orange-600">Est. 15 mins</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
               <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                 View Log
               </button>
               {rider.status === RiderStatus.Online && (
                 <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                   Assign Order
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Riders;