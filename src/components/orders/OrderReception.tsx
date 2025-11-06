import React, { useState, useEffect } from 'react';
import { Phone, User, MapPin, Plus, Trash2, Search, Check, Printer } from 'lucide-react';
import { MenuItem, OrderItem, OrderSource, Order } from '../../types';
import OrderTicket from './OrderTicket';

const OrderReception: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'phone' | 'walk-in' | 'delivery'>('phone');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Cargar pedidos desde localStorage al iniciar
  useEffect(() => {
    const savedOrders = localStorage.getItem('restaurant-orders');
    if (savedOrders) {
      console.log('Pedidos cargados desde localStorage:', JSON.parse(savedOrders).length);
    }
  }, []);

  // Menú del día compacto
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

  // Todos los items para búsqueda
  const allMenuItems = Object.values(menuDelDia).flat();

  const filteredItems = allMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (menuItem: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1, notes: '' }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.menuItem.id !== itemId));
  };

  const updateItemNotes = (itemId: string, notes: string) => {
    setCart(prev =>
      prev.map(item =>
        item.menuItem.id === itemId ? { ...item, notes } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  const saveOrderToStorage = (order: Order) => {
    // Obtener pedidos existentes
    const existingOrders = localStorage.getItem('restaurant-orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    
    // Agregar nuevo pedido
    orders.push(order);
    
    // Guardar en localStorage
    localStorage.setItem('restaurant-orders', JSON.stringify(orders));
    
    console.log('Pedido guardado en localStorage:', order);
    console.log('Total de pedidos:', orders.length);
  };

  const createOrder = () => {
    const orderSource: OrderSource = {
      type: activeTab,
      ...(activeTab === 'delivery' && { deliveryAddress: address })
    };

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      status: 'pending',
      createdAt: new Date(),
      total: getTotal(),
      customerName: customerName,
      phone: phone,
      address: activeTab === 'delivery' ? address : undefined,
      source: orderSource,
      notes: orderNotes,
    };

    setLastOrder(newOrder);
    setShowConfirmation(true);
    
    return newOrder;
  };

  const confirmOrder = () => {
    if (lastOrder) {
      saveOrderToStorage(lastOrder);
      
      // Limpiar el formulario
      setCart([]);
      setCustomerName('');
      setPhone('');
      setAddress('');
      setOrderNotes('');
      setShowConfirmation(false);
      
      // Activar impresión automática
      setTimeout(() => {
        const printButton = document.querySelector(`[data-order-id="${lastOrder.id}"]`) as HTMLButtonElement;
        if (printButton) {
          printButton.click();
        }
      }, 500);
    }
  };

  const cancelOrder = () => {
    setShowConfirmation(false);
    setLastOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      {/* Modal de Confirmación */}
      {showConfirmation && lastOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto">
            <div className="text-center">
              <Check className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Confirmar Pedido?</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                Pedido <strong>{lastOrder.id}</strong> para <strong>{lastOrder.customerName}</strong>
              </p>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="font-semibold text-base sm:text-lg">Total: S/ {lastOrder.total.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-gray-600">{lastOrder.items.length} items</p>
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={cancelOrder}
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Revisar
                </button>
                <button
                  onClick={confirmOrder}
                  className="flex-1 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-sm"
                >
                  <Printer size={14} className="sm:hidden" />
                  <Printer size={16} className="hidden sm:block" />
                  <span>Confirmar</span>
                </button>
              </div>
            </div>
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
            
            <button
              onClick={() => setActiveTab('walk-in')}
              className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                activeTab === 'walk-in'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-orange-600" />
              <div className="font-semibold text-sm sm:text-base">Paso por Local</div>
              <div className="text-gray-600 text-xs sm:text-sm">Cliente recoge</div>
            </button>
            
            <button
              onClick={() => setActiveTab('delivery')}
              className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                activeTab === 'delivery'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-orange-600" />
              <div className="font-semibold text-sm sm:text-base">Delivery</div>
              <div className="text-gray-600 text-xs sm:text-sm">Envío a domicilio</div>
            </button>
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

      {/* Grid principal - SOLO el menú en recepción */}
      <div className="grid grid-cols-1">
        {/* Menú Compacto - Ocupa toda la pantalla */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-lg sm:rounded-xl p-3 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer"
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
                          className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-lg hover:shadow-md transition-all duration-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Resultados de búsqueda */}
            {searchTerm && filteredItems.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Resultados de Búsqueda</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
            
            {/* Mensaje cuando no hay resultados */}
            {searchTerm && filteredItems.length === 0 && (
              <div className="pt-4 border-t border-gray-100">
                <div className="text-center py-4">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300 mx-auto mb-2" />
                  <div className="text-gray-500 text-sm">No se encontraron productos</div>
                  <div className="text-gray-400 text-xs">Intenta con otros términos</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <button
                onClick={() => setSearchTerm('')}
                className="flex-1 text-xs bg-gray-100 text-gray-600 py-2 px-2 sm:px-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Limpiar Búsqueda
              </button>
              <button
                onClick={() => {
                  const combo = menuDelDia['🥗 Entradas'][0];
                  addToCart(combo);
                }}
                className="flex-1 text-xs bg-orange-100 text-orange-600 py-2 px-2 sm:px-3 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Combo Popular
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carrito de Pedido - FIXED en la parte inferior en móvil */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg lg:relative lg:bg-transparent lg:border-0 lg:shadow-none lg:mt-6">
          <div className="bg-white/95 backdrop-blur-lg lg:bg-white/80 lg:backdrop-blur-lg rounded-t-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-orange-100 lg:border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Pedido Actual</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-orange-600">
                  S/ {getTotal().toFixed(2)}
                </span>
                <button
                  onClick={() => setCart([])}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {item.quantity}x {item.menuItem.name}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex space-x-2">
                <button
                  onClick={createOrder}
                  disabled={!customerName || !phone}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <Check size={16} />
                  <span>Crear Pedido</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket oculto para impresión */}
      {lastOrder && <OrderTicket order={lastOrder} />}
    </div>
  );
};

export default OrderReception;
