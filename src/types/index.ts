export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string; // Para compatibilidad con el sistema existente
  category_id?: string; // Para el nuevo sistema
  category_name?: string;
  category_emoji?: string;
  type: 'food' | 'drink';
  available: boolean;
  image_url?: string;
  sort_order?: number;
  is_daily_special?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface OrderSource {
  type: 'phone' | 'walk-in' | 'delivery';
  deliveryAddress?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  total: number;
  customerName: string;
  phone: string;
  address?: string;
  tableNumber?: string;
  source: OrderSource;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  email?: string;
  orders_count: number;
  total_spent: number;
  last_order: string | null;
  created_at: string;
  updated_at: string;
}
