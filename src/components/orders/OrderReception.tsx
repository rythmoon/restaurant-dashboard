// ... (código anterior se mantiene igual)

// Menú del día compacto - máximo 4 por categoría
const menuDelDia: { [key: string]: MenuItem[] } = {
  '🥗 Entradas': [
    { id: 'E001', name: 'Papa a la Huancaina', category: 'Entradas', price: 18.00, type: 'food', available: true, description: 'Papa amarilla con salsa huancaina' },
    { id: 'E002', name: 'Causa Rellena', category: 'Entradas', price: 16.00, type: 'food', available: true, description: 'Causa de pollo o atún' },
    { id: 'E003', name: 'Tequeños', category: 'Entradas', price: 15.00, type: 'food', available: true, description: '12 unidades con salsa de ají' },
    { id: 'E004', name: 'Anticuchos', category: 'Entradas', price: 22.00, type: 'food', available: true, description: 'Brochetas de corazón' },
  ],
  '🍽️ Platos de Fondo': [
    { id: 'P001', name: 'Lomo Saltado de Pollo', category: 'Platos de Fondo', price: 28.00, type: 'food', available: true, description: 'Salteado con cebolla, tomate' },
    { id: 'P002', name: 'Lomo Saltado de Res', category: 'Platos de Fondo', price: 32.00, type: 'food', available: true, description: 'Salteado con cebolla, tomate' },
    { id: 'P003', name: 'Arroz con Mariscos', category: 'Platos de Fondo', price: 35.00, type: 'food', available: true, description: 'Arroz verde con mix de mariscos' },
    { id: 'P004', name: 'Aji de Gallina', category: 'Platos de Fondo', price: 25.00, type: 'food', available: true, description: 'Pollo en salsa de ají amarillo' },
  ],
  '🥤 Bebidas': [
    { id: 'B001', name: 'Inca Kola 500ml', category: 'Bebidas', price: 6.00, type: 'drink', available: true },
    { id: 'B002', name: 'Coca Cola 500ml', category: 'Bebidas', price: 6.00, type: 'drink', available: true },
    { id: 'B003', name: 'Chicha Morada', category: 'Bebidas', price: 8.00, type: 'drink', available: true },
    { id: 'B004', name: 'Limonada', category: 'Bebidas', price: 7.00, type: 'drink', available: true },
  ]
};

// ... (código anterior se mantiene igual hasta la sección del menú)

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Menú Compacto en Tarjetas */}
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/20">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Menú del Día</h3>
    
    <div className="space-y-6">
      {Object.entries(menuDelDia).map(([category, items]) => (
        <div key={category}>
          {/* Header de categoría */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 text-lg">{category}</h4>
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              {items.length} opciones
            </span>
          </div>
          
          {/* Grid compacto de productos */}
          <div className="grid grid-cols-1 gap-2">
            {items.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-3 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => addToCart(item)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm leading-tight">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-1 leading-tight">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className="font-semibold text-gray-900 text-sm">
                          S/ {item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="ml-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-110"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Resultados de búsqueda - Solo se muestra si hay búsqueda */}
      {searchTerm && filteredItems.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">Resultados de Búsqueda</h4>
          <div className="space-y-2">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100 group hover:bg-orange-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.category} - S/ {item.price.toFixed(2)}</div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Mensaje cuando no hay resultados de búsqueda */}
      {searchTerm && filteredItems.length === 0 && (
        <div className="pt-4 border-t border-gray-100">
          <div className="text-center py-4">
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <div className="text-gray-500 text-sm">No se encontraron productos</div>
            <div className="text-gray-400 text-xs">Intenta con otros términos</div>
          </div>
        </div>
      )}
    </div>
    
    {/* Quick Actions */}
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex space-x-2">
        <button
          onClick={() => setSearchTerm('')}
          className="flex-1 text-xs bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Limpiar Búsqueda
        </button>
        <button
          onClick={() => {
            // Agregar combo popular
            const combo = menuDelDia['🥗 Entradas'][0];
            addToCart(combo);
          }}
          className="flex-1 text-xs bg-orange-100 text-orange-600 py-2 px-3 rounded-lg hover:bg-orange-200 transition-colors"
        >
          Combo Popular
        </button>
      </div>
    </div>
  </div>

  {/* Carrito de Pedido (se mantiene igual) */}
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/20">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedido Actual</h3>
    
    {cart.length === 0 ? (
      <div className="text-center text-gray-500 py-8">
        <div className="text-lg mb-2">No hay items en el pedido</div>
        <div className="text-sm">Selecciona productos del menú</div>
      </div>
    ) : (
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">
                  {item.menuItem.name}
                </div>
                <div className="text-xs text-gray-600">
                  S/ {item.menuItem.price.toFixed(2)} c/u
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.menuItem.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Notas:</label>
              <input
                type="text"
                value={item.notes || ''}
                onChange={(e) => updateItemNotes(item.menuItem.id, e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: Sin cebolla, bien cocido..."
              />
            </div>
          </div>
        ))}
        
        {/* Notas generales del pedido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas Generales del Pedido
          </label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Instrucciones especiales para el pedido..."
          />
        </div>
        
        {/* Total y acciones */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-orange-600">
              S/ {getTotal().toFixed(2)}
            </span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCart([])}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={createOrder}
              disabled={cart.length === 0 || !customerName || !phone}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
            >
              <Check size={16} />
              <span>Crear Pedido</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

// ... (código posterior se mantiene igual)
