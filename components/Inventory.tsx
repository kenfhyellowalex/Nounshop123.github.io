import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Edit, Trash2, Plus } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Cost</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">${product.cost_price.toFixed(2)}</td>
                <td className="px-6 py-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${product.stock < 50 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;