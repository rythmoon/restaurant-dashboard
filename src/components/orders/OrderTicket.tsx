import React from 'react';
import { Order } from '../../types';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  const handlePrint = () => {
    const printContent = document.getElementById(`ticket-${order.id}`);
    if (printContent) {
      const printWindow = window.open('', '_blank', 'width=80mm,height=600,scrollbars=no,toolbar=no,location=no');
      if (printWindow) {
        const ticketContent = generateTicketContent(order);
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Ticket ${order.id}</title>
              <style>
                @page {
                  margin: 0;
                  size: 80mm auto;
                }
                body {
                  font-family: 'Courier New', monospace;
                  font-size: 12px;
                  line-height: 1.2;
                  width: 80mm;
                  margin: 0;
                  padding: 10px;
                  background: white;
                  color: black;
                }
                .ticket {
                  width: 100%;
                  max-width: 80mm;
                }
                .center {
                  text-align: center;
                }
                .bold {
                  font-weight: bold;
                }
                .divider {
                  border-top: 1px dashed #000;
                  margin: 5px 0;
                }
                .item-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 3px;
                }
                .notes {
                  font-style: italic;
                  font-size: 10px;
                  margin-left: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  padding: 2px 0;
                  text-align: left;
                }
                th {
                  border-bottom: 1px solid #000;
                }
                .total {
                  border-top: 2px solid #000;
                  padding-top: 5px;
                  margin-top: 5px;
                }
              </style>
            </head>
            <body onload="window.print(); window.close();">
              ${ticketContent}
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const getSourceText = (sourceType: Order['source']['type']) => {
    const sourceMap = {
      'phone': 'POR TELÉFONO',
      'walk-in': 'RECOGE EN TIENDA', 
      'delivery': 'DELIVERY',
      'reservation': 'RESERVA'
    };
    return sourceMap[sourceType] || sourceType;
  };

  const generateTicketContent = (order: Order) => {
    const sourceText = getSourceText(order.source.type);
    
    return `
      <div class="ticket">
        <div class="center">
          <div class="bold">SABORES & SAZÓN</div>
          <div>Av. Principal 123 - Lima</div>
          <div>Tel: +51 123 456 789</div>
          <div class="divider"></div>
        </div>
        
        <div class="item-row">
          <span class="bold">ORDEN:</span>
          <span>${order.id}</span>
        </div>
        <div class="item-row">
          <span class="bold">TIPO:</span>
          <span>${sourceText}</span>
        </div>
        <div class="item-row">
          <span class="bold">FECHA:</span>
          <span>${order.createdAt.toLocaleDateString()}</span>
        </div>
        <div class="item-row">
          <span class="bold">HORA:</span>
          <span>${order.createdAt.toLocaleTimeString()}</span>
        </div>
        
        <div class="divider"></div>
        
        <div class="item-row bold">
          <span>CLIENTE:</span>
          <span>${order.customerName}</span>
        </div>
        <div class="item-row">
          <span>TELÉFONO:</span>
          <span>${order.phone}</span>
        </div>
        ${order.tableNumber ? `<div class="item-row">
          <span>MESA:</span>
          <span>${order.tableNumber}</span>
        </div>` : ''}
        ${order.address ? `<div class="item-row">
          <span>DIRECCIÓN:</span>
          <span>${order.address}</span>
        </div>` : ''}
        
        <div class="divider"></div>
        
        <table>
          <thead>
            <tr>
              <th>Cant</th>
              <th>Descripción</th>
              <th style="text-align: right;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.quantity}x</td>
                <td>
                  ${item.menuItem.name}
                  ${item.notes ? `<div class="notes">Nota: ${item.notes}</div>` : ''}
                </td>
                <td style="text-align: right;">S/ ${(item.menuItem.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        ${order.notes ? `
          <div class="divider"></div>
          <div class="bold">NOTAS DEL PEDIDO:</div>
          <div>${order.notes}</div>
        ` : ''}
        
        <div class="divider"></div>
        <div class="item-row total bold">
          <span>TOTAL:</span>
          <span>S/ ${order.total.toFixed(2)}</span>
        </div>
        
        <div class="divider"></div>
        <div class="center">
          <div class="bold">¡GRACIAS POR SU PEDIDO!</div>
          <div>*** ${sourceText} ***</div>
          <div style="margin-top: 10px; font-size: 10px;">
            ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;
  };

  return (
    <>
      {/* Botón para imprimir - oculto pero funcional */}
      <button
        onClick={handlePrint}
        data-order-id={order.id}
        className="hidden"
        aria-hidden="true"
      >
        Imprimir Ticket {order.id}
      </button>

      {/* Contenido del ticket optimizado para POS - Solo para referencia */}
      <div id={`ticket-${order.id}`} className="hidden">
        <div>Ticket content for printing</div>
      </div>
    </>
  );
};

export default OrderTicket;
