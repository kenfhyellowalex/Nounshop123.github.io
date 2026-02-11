import React from 'react';
import { LayoutDashboard, ShoppingCart, ListOrdered, Package, Users, Megaphone, BrainCircuit, Truck, ChefHat, Globe, Smartphone } from 'lucide-react';

export type View = 'dashboard' | 'pos' | 'orders' | 'inventory' | 'customers' | 'riders' | 'marketing' | 'ai' | 'kitchen' | 'online_store' | 'rider_app' | 'customer_app';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const adminItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pos', label: 'POS Terminal', icon: ShoppingCart },
    { id: 'orders', label: 'Orders', icon: ListOrdered },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'riders', label: 'Delivery Riders', icon: Truck },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'ai', label: 'AI Insights', icon: BrainCircuit },
  ];

  const appItems = [
    { id: 'kitchen', label: 'Kitchen Screen', icon: ChefHat },
    { id: 'online_store', label: 'Online Store', icon: Globe },
    { id: 'rider_app', label: 'Rider App', icon: Smartphone },
    { id: 'customer_app', label: 'Customer App', icon: Smartphone },
  ];

  return (
    <aside className="w-64 bg-indigo-900 text-white flex flex-col h-screen fixed left-0 top-0 z-10 shadow-xl transition-all duration-300">
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
           NOUN<span className="text-indigo-400">CRM</span>
        </h1>
        <p className="text-xs text-indigo-300 mt-1 uppercase tracking-wider">All-in-One System</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">Management</div>
        <ul className="space-y-1 px-3 mb-6">
          {adminItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onChangeView(item.id as View)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white shadow-md'
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="px-4 mb-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">App Interfaces</div>
        <ul className="space-y-1 px-3">
          {appItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onChangeView(item.id as View)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white shadow-md'
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-indigo-300">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;