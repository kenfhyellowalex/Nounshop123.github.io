import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus, OrderType } from '../types';
import { Filter, Eye } from 'lucide-react';

const statusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Paid: return 'bg-green-100 text-green-700';
    case OrderStatus.Pending: return 'bg-yellow-100 text-yellow-700';
    case OrderStatus.Cooking: return 'bg-orange-100 text-orange-700';
    case OrderStatus.Cancelled: return 'bg-red-100 text-red-700';
    case OrderStatus.Done: return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
        <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-gray-500">#{order.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.customer_name || 'Guest'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.created_at}</td>
                <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${order.order_type === OrderType.Online ? 'text-indigo-600' : 'text-gray-600'}`}>
                        {order.order_type}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-end gap-1">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;