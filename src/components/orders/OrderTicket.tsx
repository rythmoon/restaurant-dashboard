import React from 'react';
import { Order } from '../../types';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  // Estilos para el PDF - unificados con el diseño del ticket de impresión
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Courier',
      fontSize: 10, // Reducido ligeramente para formato ticket
      lineHeight: 1.1,
      padding: 8, // Padding reducido
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: '100%',
    },
    ticket: {
      width: '100%',
      maxWidth: '72mm', // Ancho estándar para tickets (72mm = ~203px)
    },
    center: {
      textAlign: 'center',
      marginBottom: 4,
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: 'Courier-Bold',
    },
    divider: {
      borderBottom: '1pt dashed #000000',
      marginVertical: 4,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    notes: {
      fontStyle: 'italic',
      fontSize: 8,
      marginLeft: 8,
    },
    orderNotesList: {
      marginVertical: 4,
      paddingLeft: 12,
    },
    orderNoteItem: {
      marginBottom: 1,
      fontSize: 9,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottom: '1pt solid #000000',
      paddingBottom: 2,
      marginBottom: 2,
    },
    tableRow: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    colQuantity: {
      width: '15%',
      fontWeight: 'bold',
    },
    colDescription: {
      width: '55%',
    },
    colPrice: {
      width: '30%',
      textAlign: 'right',
    },
    productName: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 1,
      fontSize: 9,
    },
    totalSection: {
      borderTop: '2pt solid #000000',
      paddingTop: 4,
      marginTop: 4,
    },
    calculationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 1,
      fontSize: 9,
    },
    footer: {
      textAlign: 'center',
      marginTop: 8,
    },
    smallText: {
      fontSize: 8,
    }
  });

  // Componente del documento PDF con tamaño de página para ticket
  const TicketDocument = () => (
    <Document>
      <Page 
        size={[203, 841.89]} // Ancho: 72mm (203px), Alto: automático
        style={styles.page}
        orientation="portrait"
      >
        <View style={styles.ticket}>
          {/* Encabezado */}
          <View style={styles.center}>
            <Text style={styles.bold}>MARY'S RESTAURANT</Text>
            <Text style={styles.smallText}>Av. Isabel La Católica 1254</Text>
            <Text style={styles.smallText}>Tel: 941 778 599</Text>
            <View style={styles.divider} />
          </View>

          {/* Información de la orden */}
          <View style={styles.itemRow}>
            <Text style={styles.bold}>ORDEN:</Text>
            <Text>{formatOrderId(order.id)}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.bold}>TIPO:</Text>
            <Text>{getSourceText(order.source.type)}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.bold}>FECHA:</Text>
            <Text>{order.createdAt.toLocaleDateString()}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.bold}>HORA:</Text>
            <Text>{order.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
          </View>

          <View style={styles.divider} />

          {/* Información del cliente */}
          <View style={[styles.itemRow, styles.bold]}>
            <Text>CLIENTE:</Text>
            <Text>{order.customerName}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text>TELÉFONO:</Text>
            <Text>{order.phone}</Text>
          </View>
          {order.tableNumber && (
            <View style={styles.itemRow}>
              <Text>MESA:</Text>
              <Text>{order.tableNumber}</Text>
            </View>
          )}
          {order.address && (
            <View style={styles.itemRow}>
              <Text>DIRECCIÓN:</Text>
              <Text>{order.address}</Text>
            </View>
          )}

          <View style={styles.divider} />

          {/* Tabla de productos */}
          <View style={styles.tableHeader}>
            <Text style={styles.colQuantity}>Cant</Text>
            <Text style={styles.colDescription}>Descripción</Text>
            <Text style={styles.colPrice}>Precio</Text>
          </View>

          {order.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colQuantity}>{item.quantity}x</Text>
              <View style={styles.colDescription}>
                <Text style={styles.productName}>{item.menuItem.name}</Text>
                {item.notes && (
                  <Text style={styles.notes}>Nota: {item.notes}</Text>
                )}
              </View>
              <Text style={styles.colPrice}>
                S/ {(item.menuItem.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Notas del pedido */}
          {order.notes && (
            <>
              <View style={styles.divider} />
              <View>
                <Text style={styles.bold}>NOTAS DEL PEDIDO:</Text>
                <View style={styles.orderNotesList}>
                  {formatOrderNotes(order.notes).map((note, index) => (
                    <Text key={index} style={styles.orderNoteItem}>• {note}</Text>
                  ))}
                </View>
              </View>
            </>
          )}

          <View style={styles.divider} />

          {/* Cálculos con IGV */}
          <View style={styles.calculationRow}>
            <Text>Subtotal:</Text>
            <Text>S/ {(order.total / 1.18).toFixed(2)}</Text>
          </View>
          <View style={styles.calculationRow}>
            <Text>IGV (18%):</Text>
            <Text>S/ {(order.total - (order.total / 1.18)).toFixed(2)}</Text>
          </View>
          <View style={[styles.itemRow, styles.bold, styles.totalSection]}>
            <Text>TOTAL:</Text>
            <Text>S/ {order.total.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* Pie de página */}
          <View style={styles.footer}>
            <Text style={styles.bold}>¡GRACIAS POR SU PEDIDO!</Text>
            <Text>*** {getSourceText(order.source.type)} ***</Text>
            <Text style={[styles.smallText, { marginTop: 6 }]}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  // Función para descargar PDF
  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<TicketDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Generar nombre del archivo con el formato: ORD-numero-de-orden-nombre-cliente-fecha.pdf
      const fileName = generateFileName(order);
      
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  };

  // Resto del código se mantiene igual...
  const generateFileName = (order: Order) => {
    const orderNumber = formatOrderId(order.id)
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase();
    
    const customerName = order.customerName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const date = order.createdAt.toISOString().split('T')[0];
    
    return `${orderNumber}-${customerName}-${date}.pdf`;
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

  const formatOrderId = (orderId: string) => {
    const numericId = parseInt(orderId.replace(/\D/g, ''));
    if (!isNaN(numericId)) {
      return `ORD-${String(numericId).padStart(8, '0')}`;
    }
    return orderId;
  };

  const formatOrderNotes = (notes: string): string[] => {
    if (!notes) return [];
    return notes.split(/[.,\n]/)
      .map(note => note.trim())
      .filter(note => note.length > 0);
  };

  // ... (las funciones handlePrint y generateTicketContent se mantienen igual)

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
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
            fontWeight: 'bold'
          }}
        >
          Imprimir Ticket {formatOrderId(order.id)}
        </button>

        <button
          onClick={handleDownloadPDF}
          className="download-pdf-button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Descargar PDF
        </button>
      </div>

      <div id={`ticket-${order.id}`} style={{ display: 'none' }}>
        <div>Ticket content for printing</div>
      </div>
    </>
  );
};

export default OrderTicket;
