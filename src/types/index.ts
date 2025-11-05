export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
}

export interface OrderSource {
  type: 'phone' | 'walk-in' | 'delivery' | 'reservation';
  customer?: Customer;
  deliveryAddress?: string;
}

export interface Order {
  id: string;
  tableNumber?: number; // Opcional para pedidos por teléfono
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid' | 'delivered';
  createdAt: Date;
  total: number;
  customerName?: string;
  phone?: string;
  address?: string;
  source: OrderSource;
  notes?: string;
}
