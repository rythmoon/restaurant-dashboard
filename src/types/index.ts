export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  available: boolean;
  type: 'food' | 'drink';
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  createdAt: Date;
  total: number;
  customerName?: string;
}

export interface Table {
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  orderId?: string;
}