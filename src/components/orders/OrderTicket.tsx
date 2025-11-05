import React, { useRef } from 'react';
import { Order } from '../../types';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = ticketRef.current;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  // Función para obtener texto del tipo de pedido
  const getSourceText = (sourceType: Order['source']['type']) => {
    const sourceMap = {
      'phone': 'POR TELÉFONO',
      'walk-in': 'RECOGE EN TIENDA', 
      'delivery': 'DELIVERY',
      'reservation': 'RESERVA'
    };
    return sourceMap[sourceType] || sourceType;
  };

  return (
    <>
      {/* Botón para imprimir - oculto pero funcional */}
      <button
        ref={ticketRef}
        onClick={handlePrint}
        data-order-id={order.id}
        className="hidden"
        aria-hidden="true"
      >
        Imprimir Ticket {order.id}
      </button>

      {/* Contenido del ticket - solo visible al imprimir */}
      <div className="hidden">
        <div id={`ticket-${order.id}`} className="print-ticket">
          <div className="text-center mb-3">
            <h2 className="font-bold text-lg uppercase">RESTAURANTE EJEMPLO</h2>
            <p className="text-sm">Av. Principal 123 - Lima</p>
            <p className="text-sm">Tel: +51 123 456 789</p>
            <div className="border-t border-black my-2"></div>
          </div>
          
          <div className="mb-3">
            <p><strong>ORDEN #:</strong> {order.id}</p>
            <p><strong>TIPO:</strong> {getSourceText(order.source.type)}</p>
            <p><strong>FECHA:</strong> {order.createdAt.toLocaleDateString()}</p>
            <p><strong>HORA:</strong> {order.createdAt.toLocaleTimeString()}</p>
          </div>
          
          <div className="border-t border-b border-black py-2 my-2">
            <p><strong>CLIENTE:</strong> {order.customerName}</p>
            <p><strong>TELÉFONO:</strong> {order.phone}</p>
            {order.tableNumber && <p><strong>MESA:</strong> {order.tableNumber}</p>}
            {order.address && <p><strong>DIRECCIÓN:</strong> {order.address}</p>}
          </div>
          
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left py-1">Cant</th>
                <th className="text-left py-1">Descripción</th>
                <th className="text-right py-1">Precio</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-1 align-top">{item.quantity}x</td>
                  <td className="py-1 align-top">
                    {item.menuItem.name}
                    {item.notes && (
                      <div className="text-xs italic">Nota: {item.notes}</div>
                    )}
                  </td>
                  <td className="text-right py-1 align-top">
                    S/ {(item.menuItem.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {order.notes && (
            <div className="mb-3 p-2 border border-dashed border-gray-400">
              <strong>NOTAS DEL PEDIDO:</strong>
              <div className="text-sm">{order.notes}</div>
            </div>
          )}
          
          <div className="border-t border-black pt-2">
            <div className="flex justify-between font-bold">
              <span>TOTAL:</span>
              <span>S/ {order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="text-center mt-4 pt-3 border-t border-black">
            <p className="font-semibold">¡GRACIAS POR SU PEDIDO!</p>
            <p className="text-sm">*** {getSourceText(order.source.type)} ***</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTicket;
