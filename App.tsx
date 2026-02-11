import React, { useState } from 'react';
import Sidebar, { View } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import AIInsights from './components/AIInsights';
import Marketing from './components/Marketing';
import Customers from './components/Customers';
import Riders from './components/Riders';
import Kitchen from './components/Kitchen';
import OnlineStore from './components/OnlineStore';
import RiderApp from './components/RiderApp';
import CustomerApp from './components/CustomerApp';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'pos': return <POS />;
      case 'orders': return <Orders />;
      case 'inventory': return <Inventory />;
      case 'ai': return <AIInsights />;
      case 'marketing': return <Marketing />;
      case 'customers': return <Customers />;
      case 'riders': return <Riders />;
      case 'kitchen': return <Kitchen />;
      case 'online_store': return <OnlineStore />;
      case 'rider_app': return <RiderApp />;
      case 'customer_app': return <CustomerApp />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        {renderView()}
      </main>
    </div>
  );
};

export default App;