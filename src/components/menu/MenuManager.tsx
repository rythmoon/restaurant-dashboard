import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { MenuItem } from '../../types';

const MenuManager: React.FC = () => {
  // Datos de ejemplo - reemplazar con datos de Google Sheets
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      category: 'Platos Principales',
      price: 12.99,
      description: 'Carne de res, lechuga, tomate, queso',
      available: true,
      type: 'food'
    },
    {
      id: '2',
      name: 'Coca Cola',
      category: 'Bebidas',
      price: 2.50,
      available: true,
      type: 'drink'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión del Menú</h2>
        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-600 transition-colors">
          <Plus size={20} />
          <span>Nuevo Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {item.description && (
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                item.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Disponible' : 'No disponible'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;