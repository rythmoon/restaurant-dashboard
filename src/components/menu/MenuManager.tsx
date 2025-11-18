// MenuManager.tsx (versión simplificada)
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const MenuManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', 'Entradas', 'Platos de Fondo', 'Bebidas', 'Postres'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión del Menú</h1>
          <p className="text-gray-600">Administra los productos de tu restaurante</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              placeholder="Buscar productos..."
            />
          </div>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:shadow-md transition-all duration-300 font-medium">
            <Plus size={20} />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Categorías */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Ejemplo de producto */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">Lomo Saltado</h3>
                <p className="text-sm text-gray-500">Platos de Fondo</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              Tradicional plato peruano con lomo de res, tomate, cebolla y papas fritas
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  S/ 32.00
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  🍽️ Comida
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                Disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
