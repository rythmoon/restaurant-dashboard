import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import OrdersManager from './components/orders/OrdersManager';
import MenuManager from './components/menu/MenuManager';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <DashboardLayout>
      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'orders', name: 'Órdenes' },
              { id: 'menu', name: 'Menú' },
              { id: 'tables', name: 'Mesas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div>
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Órdenes Recientes
              </h3>
              {/* Aquí iría el componente de órdenes recientes */}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Productos Populares
              </h3>
              {/* Aquí iría el componente de productos populares */}
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