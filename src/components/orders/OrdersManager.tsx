import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Order } from '../../types';
import OrderTicket from './OrderTicket';

const OrdersManager: React.FC = () => {
  // Datos de ejemplo - reemplazar con datos de Google Sheets
  const orders: Order[] = [
    {
      id: 'ORD-001',
      tableNumber: 1,
      items: [
        {
          menuItem: {
            id: '1',
            name: 'Hamburguesa Clásica',
            category: 'Platos Principales',
            price: 12.99,
            available: true,
            type: 'food'
          },
          quantity: 2,
          notes: 'Sin cebolla'
        },
        {
          menuItem: {
            id: '2',
            name: 'Coca Cola',
            category: 'Bebidas',
            price: 2.50,
            available: true,
            type: 'drink'
          },
          quantity: 2
        }
      ],
      status: 'pending',
      createdAt: new Date(),
      total: 31.98,
      customerName: 'Juan Pérez',
      phone: '123-456-7890',
      source: {
        type: 'walk-in'
      }
    },
    {
      id: 'ORD-002',
      items: [
        {
          menuItem: {
            id: 'P001',
            name: 'Lomo Saltado de Pollo',
            category: 'Platos de Fondo',
            price: 28.00,
            available: true,
            type: 'food'
          },
          quantity: 1
        },
        {
          menuItem: {
            id: 'E001',
            name: 'Papa a la Huancaina',
            category: 'Entradas',
            price: 18.00,
            available: true,
            type: 'food'
          },
          quantity: 1
        }
      ],
      status: 'preparing',
      createdAt: new Date(),
      total: 46.00,
      customerName: 'María García',
      phone: '987-654-3210',
      source: {
        type: 'phone'
      }
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      served: 'bg-purple-100 text-purple-800',
      paid: 'bg-gray-100 text-gray-800',
      delivered: 'bg-indigo-100 text-indigo-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'Pendiente',
      preparing: 'Preparando',
      ready: 'Listo',
      served: 'Servido',
      paid: 'Pagado',
      delivered: 'Entregado',
    };
    return statusMap[status] || status;
  };

  const getSourceText = (sourceType: Order['source']['type']) => {
    const sourceMap = {
      'phone': 'Teléfono',
      'walk-in': 'Presencial',
      'delivery': 'Delivery',
      'reservation': 'Reserva'
    };
    return sourceMap[sourceType] || sourceType;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Órdenes</h2>
        <button 
          onClick={() => window.location.href = '#reception'}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-600 transition-colors"
        >
          <Plus size={20} />
          <span>Nueva Orden</span>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar órdenes por cliente o ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="preparing">Preparando</option>
            <option value="ready">Listo</option>
            <option value="served">Servido</option>
            <option value="paid">Pagado</option>
            <option value="delivered">Entregado</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">Todos los tipos</option>
            <option value="phone">Teléfono</option>
            <option value="walk-in">Presencial</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>

      {/* Lista de órdenes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {order.createdAt.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.phone}</div>
                    {order.tableNumber && (
                      <div className="text-sm text-gray-500">Mesa {order.tableNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {getSourceText(order.source.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.length} items
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.map(item => item.menuItem.name).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      S/ {order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <OrderTicket order={order} />
                    <button className="text-primary-600 hover:text-primary-900">
                      Editar
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Siguiente Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManager;
