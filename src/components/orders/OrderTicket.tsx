import React from 'react';
import { Order } from '../../types';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface OrderTicketProps {
  order: Order;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ order }) => {
  // Estilos para el PDF (optimizado para impresora térmica 80mm)
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 15,
      fontSize: 10,
      fontFamily: 'Helvetica',
      width: '80mm',
    },
    header: {
      textAlign: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 9,
      marginBottom: 2,
    },
    divider: {
      borderBottom: '1pt solid #000000',
      marginVertical: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    bold: {
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 8,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottom: '1pt solid #000000',
      paddingBottom: 2,
      marginBottom: 2,
    },
    tableRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    colQuantity: {
      width: '15%',
    },
    colDescription: {
      width: '55%',
    },
    colPrice: {
      width: '30%',
      textAlign: 'right',
    },
    notes: {
      fontStyle: 'italic',
      fontSize: 7,
      marginLeft: 8,
    },
    orderNotes: {
      marginTop: 4,
      marginBottom: 8,
    },
    orderNoteItem: {
      marginBottom: 1,
      fontSize: 8,
    },
    totalSection: {
      borderTop: '2pt solid #000000',
      paddingTop: 4,
      marginTop: 4,
    },
    footer: {
      textAlign: 'center',
      marginTop: 12,
    },
    calculationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 1,
      fontSize: 8,
    }
  });

  // Componente del documento PDF
  const TicketDocument = () => (
    <Document>
      <Page size={[226.77, 841.89]} style={styles.page}> {/* 80mm de ancho */}
        <View style={styles.header}>
          <Text style={styles.title}>SABORES & SAZÓN</Text>
          <Text style={styles.subtitle}>Av. Principal 123 - Lima</Text>
          <Text style={styles.subtitle}>Tel: +51 123 456 789</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.bold}>ORDEN:</Text>
            <Text>{formatOrderId(order.id)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>TIPO:</Text>
            <Text>{getSourceText(order.source.type)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>FECHA:</Text>
            <Text>{order.createdAt.toLocaleDateString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>HORA:</Text>
            <Text>{order.createdAt.toLocaleTimeString()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.bold}>CLIENTE:</Text>
            <Text style={styles.bold}>{order.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text>TELÉFONO:</Text>
            <Text>{order.phone}</Text>
          </View>
          {order.tableNumber && (
            <View style={styles.row}>
              <Text>MESA:</Text>
              <Text>{order.tableNumber}</Text>
            </View>
          )}
          {order.address && (
            <View style={styles.row}>
              <Text>DIRECCIÓN:</Text>
              <Text>{order.address}</Text>
            </View>
          )}
        </View>

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
              <Text style={styles.bold}>{item.menuItem.name}</Text>
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
            <View style={styles.orderNotes}>
              <Text style={styles.bold}>NOTAS DEL PEDIDO:</Text>
              {formatOrderNotes(order.notes).map((note, index) => (
                <Text key={index} style={styles.orderNoteItem}>• {note}</Text>
              ))}
            </View>
          </>
        )}

        <View style={styles.divider} />

        {/* Cálculos con IGV */}
        <View style={styles.totalSection}>
          <View style={styles.calculationRow}>
            <Text>Subtotal:</Text>
            <Text>S/ {(order.total / 1.18).toFixed(2)}</Text>
          </View>
          <View style={styles.calculationRow}>
            <Text>IGV (18%):</Text>
            <Text>S/ {(order.total - (order.total / 1.18)).toFixed(2)}</Text>
          </View>
          <View style={[styles.row, styles.bold]}>
            <Text>TOTAL:</Text>
            <Text>S/ {order.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.bold}>¡GRACIAS POR SU PEDIDO!</Text>
          <Text>*** {getSourceText(order.source.type)} ***</Text>
          <Text style={{ marginTop: 8, fontSize: 7 }}>
            {new Date().toLocaleString()}
          </Text>
        </View>
      </Page>
    </Document>
  );

  // Función para IMPRIMIR el PDF
  const handlePrint = async () => {
    try {
      const blob = await pdf(<TicketDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Abrir el PDF en nueva ventana para imprimir
      const printWindow = window.open(url, '_blank');
      
      if (printWindow) {
        // Esperar a que cargue el PDF y luego imprimir
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } catch (error) {
      console.error('Error imprimiendo PDF:', error);
    }
  };

  // Función para DESCARGAR el PDF
  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<TicketDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Generar nombre del archivo con formato: ORD-numero-de-orden-nombre-cliente-fecha.pdf
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

  // Generar nombre del archivo con formato: ORD-numero-de-orden-nombre-cliente-fecha.pdf
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

  // Función para formatear el ID de la orden
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

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        {/* Botón para IMPRIMIR */}
        <button
          onClick={handlePrint}
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

        {/* Botón para DESCARGAR PDF */}
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
    </>
  );
};

export default OrderTicket;
