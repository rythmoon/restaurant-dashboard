// App.tsx
import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import OrdersManager from './components/orders/OrdersManager';
import MenuManager from './components/menu/MenuManager';
import OrderReception from './components/orders/OrderReception';
import CustomersManager from './components/customers/CustomersManager';
import KitchenManager from './components/kitchen/KitchenManager';
import UserManager from './components/users/UserManager';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = React.useState('reception');
  const { user } = useAuth();

  // Tabs base para todos los usuarios
  const baseTabs = [
    { id: 'reception', name: '🎯 Recepción', shortName: '🎯' },
    { id: 'orders', name: '📋 Órdenes', shortName: '📋' },
    { id: 'menu', name: '🍽️ Menú', shortName: '🍽️' },
    { id: 'kitchen', name: '👨‍🍳 Cocina', shortName: '👨‍🍳' },
    { id: 'customers', name: '👥 Clientes', shortName: '👥' },
    { id: 'dashboard', name: '📊 Dashboard', shortName: '📊' },
  ];

  // Solo administradores ven la pestaña de Usuarios
  const adminTabs = user?.role === 'admin' 
    ? [{ id: 'users', name: '🔧 Usuarios', shortName: '🔧' }]
    : [];

  const tabs = [...baseTabs, ...adminTabs];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Navigation Tabs Modern */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-1.5 w-full max-w-4xl mx-auto border border-gray-100 shadow-sm">
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden text-base">{tab.shortName}</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Órdenes Recientes
                </h3>
                <div className="text-center text-gray-500 py-8">
                  <div className="text-lg mb-2">No hay órdenes recientes</div>
                  <div className="text-sm">Las órdenes aparecerán aquí</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
        {activeTab === 'customers' && <CustomersManager />}
        {activeTab === 'kitchen' && <KitchenManager />}
        {activeTab === 'users' && <UserManager />}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default App;
