import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import OrdersManager from './components/orders/OrdersManager';
import MenuManager from './components/menu/MenuManager';
import OrderReception from './components/orders/OrderReception';

function App() {
  const [activeTab, setActiveTab] = React.useState('reception');

  return (
    <DashboardLayout>
      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 w-fit mx-auto shadow-sm border border-white/20">
          <nav className="flex space-x-1">
            {[
              { id: 'reception', name: '🎯 Recepción' },
              { id: 'dashboard', name: '📊 Dashboard' },
              { id: 'orders', name: '📋 Órdenes' },
              { id: 'menu', name: '🍽️ Menú' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-white/50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'reception' && <OrderReception />}
      
      {activeTab === 'dashboard' && (
        <div>
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Órdenes Recientes
              </h3>
              <div className="text-center text-gray-500 py-8">
                <div className="text-lg mb-2">No hay órdenes recientes</div>
                <div className="text-sm">Las órdenes aparecerán aquí</div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Productos Populares
              </h3>
              <div className="text-center text-gray-500 py-8">
                <div className="text-lg mb-2">No hay datos disponibles</div>
                <div className="text-sm">Los productos populares aparecerán aquí</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && <OrdersManager />}
      {activeTab === 'menu' && <MenuManager />}
    </DashboardLayout>
  );
}

export default App;
