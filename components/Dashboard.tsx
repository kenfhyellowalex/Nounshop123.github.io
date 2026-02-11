import React from 'react';
import { TrendingUp, Users, DollarSign, ShoppingBag, Server, Database, Smartphone, Wifi } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_AI_PREDICTIONS } from '../constants';

const StatsCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      <div className={`flex items-center mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp size={16} className="mr-1" />
        <span className="font-medium">{Math.abs(trend)}%</span>
        <span className="text-gray-400 ml-1">vs last week</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

const SystemNode = ({ label, icon: Icon, status }: { label: string, icon: any, status: 'online' | 'busy' | 'offline' }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 min-w-[120px]">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${status === 'online' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
      <Icon size={20} />
    </div>
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="flex items-center gap-1 mt-1">
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
      <span className="text-xs text-gray-500 uppercase">{status}</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value="$12,450" 
          trend={12.5} 
          icon={DollarSign} 
          color="bg-indigo-500" 
        />
        <StatsCard 
          title="Total Orders" 
          value="1,245" 
          trend={8.2} 
          icon={ShoppingBag} 
          color="bg-blue-500" 
        />
        <StatsCard 
          title="New Customers" 
          value="342" 
          trend={-2.4} 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatsCard 
          title="Avg. Order Value" 
          value="$24.50" 
          trend={4.1} 
          icon={TrendingUp} 
          color="bg-green-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Performance (Actual vs Predicted)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_AI_PREDICTIONS}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="actual_sales" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" name="Actual Sales" />
                <Area type="monotone" dataKey="predicted_sales" stroke="#9333ea" strokeDasharray="5 5" fill="none" name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Products</h3>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      🍔
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Classic Burger</p>
                      <p className="text-xs text-gray-500">120 sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700">$890</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Server size={16} className="text-indigo-600"/> System Health
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
               <SystemNode label="API Server" icon={Server} status="online" />
               <SystemNode label="Database" icon={Database} status="online" />
               <SystemNode label="Rider App" icon={Smartphone} status="online" />
               <SystemNode label="Online Store" icon={Wifi} status="online" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
              Architecture Version 2.0.1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;