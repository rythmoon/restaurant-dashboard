// ... (imports se mantienen igual)

const OrderReception: React.FC = () => {
  // ... (estados se mantienen igual)

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      {/* Modal de Confirmación */}
      {showConfirmation && lastOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto">
            {/* ... contenido del modal igual pero con textos responsive */}
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-white/20 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recepción de Pedidos</h2>
        
        {/* Tipo de Pedido - Grid responsive */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Tipo de Pedido</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('phone')}
              className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                activeTab === 'phone'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-orange-600" />
              <div className="font-semibold text-sm sm:text-base">Por Teléfono</div>
              <div className="text-gray-600 text-xs sm:text-sm">Cliente llama</div>
            </button>
            
            {/* ... otros botones similares */}
          </div>
        </div>

        {/* Información del Cliente - Grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Nombre del Cliente *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Nombre del cliente"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Teléfono"
              required
            />
          </div>

          {activeTab === 'delivery' && (
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Dirección de Envío *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Dirección completa"
                required
              />
            </div>
          )}
        </div>

        {/* Búsqueda de Productos */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Buscar Productos
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Buscar productos..."
            />
          </div>
        </div>
      </div>

      {/* Grid principal - Cambia a columna en móvil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Menú Compacto */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Menú del Día</h3>
          
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(menuDelDia).map(([category, items]) => (
              <div key={category}>
                {/* Header de categoría */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{category}</h4>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                </div>
                
                {/* Grid compacto de productos */}
                <div className="grid grid-cols-1 gap-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer"
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
                                <div className="text-xs text-gray-500 mt-1 leading-tight line-clamp-1">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            <div className="text-right ml-2 flex-shrink-0">
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
                          className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-1 sm:p-2 rounded-lg hover:shadow-md transition-all duration-200"
                        >
                          <Plus size={12} className="sm:hidden" />
                          <Plus size={14} className="hidden sm:block" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* ... resto del código del menú con clases responsive similares */}
          </div>
        </div>

        {/* Carrito de Pedido */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Pedido Actual</h3>
          
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-6 sm:py-8">
              <div className="text-sm sm:text-lg mb-2">No hay items en el pedido</div>
              <div className="text-xs sm:text-sm">Selecciona productos del menú</div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {item.menuItem.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        S/ {item.menuItem.price.toFixed(2)} c/u
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-medium text-xs sm:text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.menuItem.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={12} className="sm:hidden" />
                        <Trash2 size={14} className="hidden sm:block" />
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
                      placeholder="Ej: Sin cebolla..."
                    />
                  </div>
                </div>
              ))}
              
              {/* ... resto del carrito con clases responsive */}
            </div>
          )}
        </div>
      </div>

      {/* Ticket oculto para impresión */}
      {lastOrder && <OrderTicket order={lastOrder} />}
    </div>
  );
};

export default OrderReception;
