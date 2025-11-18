// OrderReception.tsx (versión corregida)
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const OrderReception: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'phone' | 'walk-in' | 'delivery'>('phone');
  const [cart] = useState<any[]>([]); // Removí setCart ya que no se usa en esta versión simplificada

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recepción de Pedidos</h1>
        <p className="text-gray-600">Gestiona los pedidos del restaurante</p>
      </div>

      {/* Tipo de Pedido */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Pedido</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { type: 'phone', label: '📞 Cocina', desc: 'Pedidos por teléfono' },
            { type: 'walk-in', label: '👤 Local', desc: 'Clientes en el local' },
            { type: 'delivery', label: '📍 Delivery', desc: 'Envíos a domicilio' }
          ].map(({ type, label, desc }) => (
            <button
              key={type}
              onClick={() => setActiveTab(type as any)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                activeTab === type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg font-semibold mb-1">{label}</div>
              <div className="text-sm text-gray-600">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del cliente *"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="Teléfono *"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Carrito Flotante */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
          <ShoppingBag size={20} />
          <div className="text-left">
            <div className="text-sm font-medium">Ver pedido</div>
            <div className="text-xs opacity-90">{totalItems} items</div>
          </div>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderReception;
