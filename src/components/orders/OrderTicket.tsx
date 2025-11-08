import React from 'react';
import { Order } from '../../types';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  const handlePrint = async () => {
    const printContent = document.getElementById(`ticket-${order.id}`);
    if (printContent) {
      const isMobile = window.innerWidth <= 768;
      const windowFeatures = isMobile 
        ? 'width=400,height=700,scrollbars=no,toolbar=no,location=no'
        : 'width=500,height=700,scrollbars=no,toolbar=no,location=no';
      
      const printWindow = window.open('', '_blank', windowFeatures);
      if (printWindow) {
        const ticketContent = generateTicketContent(order);
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Ticket ${order.id}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                /* ✅ ESTILOS PARA VISTA PREVIA (SCREEN) */
                @media screen {
                  body {
                    background: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                  }
                  
                  .ticket-preview {
                    background: white;
                    width: 300px; /* ✅ ANCHO FIJO PARA VISTA PREVIA */
                    min-height: 500px;
                    padding: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    transform: scale(1); /* ✅ SIN ZOOM NECESARIO */
                    transform-origin: top center;
                  }
                  
                  .preview-header {
                    text-align: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px dashed #ccc;
                  }
                  
                  .preview-header h2 {
                    margin: 0 0 5px 0;
                    color: #333;
                    font-size: 16px;
                  }
                  
                  .preview-info {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 10px;
                  }
                }

                /* ✅ ESTILOS PARA IMPRESIÓN (PRINT) */
                @media print {
                  @page {
                    margin: 0;
                    size: 80mm auto; /* ✅ TAMAÑO TICKET ESTÁNDAR */
                  }
                  
                  body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 80mm !important;
                    background: white !important;
                    font-family: 'Courier New', monospace !important;
                    font-size: 12px !important;
                    line-height: 1.2 !important;
                  }
                  
                  .ticket-preview {
                    width: 80mm !important;
                    min-height: auto !important;
                    padding: 5mm 3mm !important; /* ✅ MÁRGENES PARA CENTRADO */
                    box-shadow: none !important;
                    border: none !important;
                    border-radius: 0 !important;
                    background: white !important;
                    margin: 0 auto !important;
                  }
                  
                  .preview-header, 
                  .preview-info {
                    display: none !important;
                  }
                  
                  /* ✅ OCULTAR ELEMENTOS DE VISTA PREVIA EN IMPRESIÓN */
                  .no-print {
                    display: none !important;
                  }
                  
                  /* ✅ COMANDOS DE CORTE OCULTOS */
                  .cut-command {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                  }
                }

                /* ✅ ESTILOS COMUNES PARA TICKET */
                .ticket-content {
                  width: 100%;
                }
                
                .center {
                  text-align: center;
                }
                
                .bold {
                  font-weight: bold;
                }
                
                .divider {
                  border-top: 1px dashed #000;
                  margin: 8px 0;
                }
                
                .item-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 4px;
                  font-size: 12px;
                }
                
                .notes {
                  font-style: italic;
                  font-size: 10px;
                  margin-left: 10px;
                  color: #555;
                }
                
                .order-notes-list {
                  margin: 8px 0;
                  padding-left: 15px;
                }
                
                .order-notes-list div {
                  margin-bottom: 3px;
                  font-size: 11px;
                }
                
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 8px 0;
                }
                
                th, td {
                  padding: 3px 0;
                  text-align: left;
                  font-size: 11px;
                }
                
                th {
                  border-bottom: 1px solid #000;
                  font-weight: bold;
                }
                
                .total {
                  border-top: 2px solid #000;
                  padding-top: 8px;
                  margin-top: 8px;
                  font-weight: bold;
                }
                
                .product-name {
                  font-weight: bold;
                  text-transform: uppercase;
                  font-size: 11px;
                }
                
                .quantity {
                  font-weight: bold;
                  width: 20px;
                }
                
                .calculation-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 3px;
                  font-size: 11px;
                }
                
                /* ✅ ESPACIO PARA CORTE */
                .cut-space {
                  height: 40px;
                  border-top: 1px dashed transparent;
                  margin-top: 15px;
                }
                
                /* ✅ ESTILOS ESPECÍFICOS PARA IMPRESORA */
                .print-only {
                  display: none;
                }
                
                @media print {
                  .print-only {
                    display: block;
                  }
                }
              </style>
            </head>
            <body>
              <div class="ticket-preview">
                <!-- ✅ ENCABEZADO SOLO PARA VISTA PREVIA -->
                <div class="preview-header no-print">
                  <h2>🔍 Vista Previa del Ticket</h2>
                  <div class="preview-info">
                    Orden: ${formatOrderId(order.id)} | Cliente: ${order.customerName}
                  </div>
                  <div class="preview-info" style="font-size: 11px; color: #888;">
                    Esta vista es solo para previsualización. Al imprimir se ajustará al tamaño de ticket.
                  </div>
                  <div class="divider no-print"></div>
                </div>
                
                <!-- ✅ CONTENIDO PRINCIPAL DEL TICKET -->
                <div class="ticket-content">
                  <div class="center">
                    <div class="bold" style="font-size: 14px;">SABORES & SAZÓN</div>
                    <div style="font-size: 10px;">Av. Principal 123 - Lima</div>
                    <div style="font-size: 10px;">Tel: +51 123 456 789</div>
                    <div class="divider"></div>
                  </div>
                  
                  <div class="item-row">
                    <span class="bold">ORDEN:</span>
                    <span>${formatOrderId(order.id)}</span>
                  </div>
                  <div class="item-row">
                    <span class="bold">TIPO:</span>
                    <span>${getSourceText(order.source.type)}</span>
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
                        <th style="width: 15%;">Cant</th>
                        <th style="width: 55%;">Descripción</th>
                        <th style="width: 30%; text-align: right;">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${order.items.map(item => `
                        <tr>
                          <td class="quantity">${item.quantity}x</td>
                          <td>
                            <div class="product-name">${item.menuItem.name}</div>
                            ${item.notes ? `<div class="notes">Nota: ${item.notes}</div>` : ''}
                          </td>
                          <td style="text-align: right;">S/ ${(item.menuItem.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  
                  ${formatOrderNotes(order.notes || '')}
                  
                  <div class="divider"></div>
                  
                  <!-- Sección de cálculos con IGV -->
                  <div class="calculation-row">
                    <span>Subtotal:</span>
                    <span>S/ ${(order.total / 1.18).toFixed(2)}</span>
                  </div>
                  <div class="calculation-row">
                    <span>IGV (18%):</span>
                    <span>S/ ${(order.total - (order.total / 1.18)).toFixed(2)}</span>
                  </div>
                  
                  <div class="item-row total">
                    <span>TOTAL:</span>
                    <span>S/ ${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div class="divider"></div>
                  <div class="center">
                    <div class="bold">¡GRACIAS POR SU PEDIDO!</div>
                    <div>*** ${getSourceText(order.source.type)} ***</div>
                    <div style="margin-top: 10px; font-size: 9px;">
                      ${new Date().toLocaleString()}
                    </div>
                  </div>
                  
                  <!-- ✅ ESPACIO PARA CORTE -->
                  <div class="cut-space"></div>
                  
                  <!-- ✅ COMANDOS DE CORTE BIENEX (OCULTOS) -->
                  <div style="display: none; font-size: 0; line-height: 0;">
                    <span class="cut-command">${String.fromCharCode(27)}${String.fromCharCode(100)}${String.fromCharCode(7)}</span>
                    <span class="cut-command">${String.fromCharCode(29)}${String.fromCharCode(86)}${String.fromCharCode(65)}${String.fromCharCode(0)}</span>
                    <span class="cut-command">${String.fromCharCode(10)}${String.fromCharCode(10)}${String.fromCharCode(10)}</span>
                  </div>
                </div>
              </div>
              
              <script>
                // ✅ MEJOR VISUALIZACIÓN EN VISTA PREVIA
                window.onload = function() {
                  console.log('Vista previa cargada correctamente');
                  
                  // Configurar para impresión después de un breve delay
                  setTimeout(function() {
                    window.print();
                    
                    // Cerrar después de imprimir
                    setTimeout(function() {
                      window.close();
                    }, 1500);
                  }, 500);
                };
                
                // ✅ MANEJAR ERRORES
                window.onerror = function(msg, source, lineno, colno, error) {
                  console.log('Error en vista previa:', msg);
                  return true;
                };
              </script>
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
      'delivery': 'DELIVERY'
    };
    return sourceMap[sourceType] || sourceType;
  };

  const formatOrderNotes = (notes: string) => {
    if (!notes) return '';
    
    const notesArray = notes.split(/[.,\n]/)
      .map(note => note.trim())
      .filter(note => note.length > 0);
    
    if (notesArray.length === 0) return '';
    
    return `
      <div class="divider"></div>
      <div class="bold">NOTAS DEL PEDIDO:</div>
      <div class="order-notes-list">
        ${notesArray.map(note => `<div>• ${note}</div>`).join('')}
      </div>
    `;
  };

  const formatOrderId = (orderId: string) => {
    const numericId = parseInt(orderId.replace(/\D/g, ''));
    if (!isNaN(numericId)) {
      return `ORD-${String(numericId).padStart(8, '0')}`;
    }
    return orderId;
  };

  return (
    <>
      <button
        onClick={handlePrint}
        data-order-id={order.id}
        className="print-button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px 0',
          fontWeight: 'bold'
        }}
      >
        Imprimir Ticket {formatOrderId(order.id)}
      </button>

      <div id={`ticket-${order.id}`} style={{ display: 'none' }}>
        <div>Ticket content for printing</div>
      </div>
    </>
  );
};

export default OrderTicket;
