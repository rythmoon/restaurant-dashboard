import React from 'react';
import { Order } from '../../types';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  const handlePrint = () => {
    const printContent = document.getElementById(`ticket-${order.id}`);
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <>
      {/* Botón para imprimir - no se imprime */}
      <button
        onClick={handlePrint}
        className="no-print bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
      >
        Imprimir Ticket
      </button>

      {/* Contenido del ticket - solo visible al imprimir */}
      <div id={`ticket-${order.id}`} className="print-ticket hidden">
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg">RESTAURANTE EJEMPLO</h2>
          <p className="text-sm">Dirección: Calle Principal 123</p>
          <p className="text-sm">Tel: +123 456 7890</p>
        </div>
        
        <div className="border-t border-b border-black py-2 my-2">
          <p><strong>Orden #:</strong> {order.id}</p>
          <p><strong>Mesa:</strong> {order.tableNumber}</p>
          <p><strong>Fecha:</strong> {order.createdAt.toLocaleString()}</p>
          {order.customerName && <p><strong>Cliente:</strong> {order.customerName}</p>}
        </div>
        
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left">Cant</th>
              <th className="text-left">Descripción</th>
              <th className="text-right">Precio</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-1">{item.quantity}x</td>
                <td className="py-1">
                  {item.menuItem.name}
                  {item.notes && <div className="text-xs">Nota: {item.notes}</div>}
                </td>
                <td className="text-right py-1">
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="border-t border-black pt-2">
          <div className="flex justify-between font-bold">
            <span>TOTAL:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p>¡Gracias por su visita!</p>
        </div>
      </div>
    </>
  );
};

export default OrderTicket;