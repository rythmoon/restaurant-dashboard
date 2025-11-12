import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore  
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de datos basados en tu esquema
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

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  type: 'food' | 'drink';
  available: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  emoji?: string;
  sort_order: number;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  customer_name: string;
  phone: string;
  address?: string;
  table_number?: string;
  source_type: 'phone' | 'walk-in' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  menu_item_name: string;
  menu_item_price: number;
  quantity: number;
  notes?: string;
  created_at: string;
}

export interface Employee {
  id: string;
  email?: string;
  username: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  display_role?: string;
  created_at: string;
  is_active: boolean;
  password_hash?: string;
}

// Servicios de Base de Datos adaptados a tu esquema
export const supabaseService = {
  // ===== ITEMS DEL MENÚ =====
  async getMenuItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as MenuItem[];
  },

  async getMenuItemsByCategory(category: string) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('available', true)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as MenuItem[];
  },

  async getDailyMenuItems(menuType: 'default' | 'alternative' = 'default') {
    // Para el menú del día, filtramos por categorías de comida
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .in('category', ['Entradas', 'Platos de Fondo'])
      .eq('available', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as MenuItem[];
  },

  async updateMenuItemPrice(id: string, price: number) {
    const { data, error } = await supabase
      .from('menu_items')
      .update({ 
        price, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0] as MenuItem;
  },

  async updateMenuItemAvailability(id: string, available: boolean) {
    const { data, error } = await supabase
      .from('menu_items')
      .update({ 
        available, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0] as MenuItem;
  },

  async deleteMenuItem(id: string) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  async createMenuItem(item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([
        {
          ...item,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) throw error;
    return data[0] as MenuItem;
  },

  // ===== MENÚ DEL DÍA =====
  async getCurrentDailyMenu() {
    // Usamos localStorage como fallback para el menú del día
    // Puedes crear una tabla daily_menus después si lo necesitas
    const saved = localStorage.getItem('current-daily-menu');
    return saved ? parseInt(saved) : 0;
  },

  async setDailyMenu(menuIndex: number) {
    localStorage.setItem('current-daily-menu', menuIndex.toString());
    return menuIndex;
  },

  // ===== CLIENTES =====
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Customer[];
  },

  async searchCustomers(searchTerm: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
      .limit(10);
    
    if (error) throw error;
    return data as Customer[];
  },

  async createCustomer(customer: Omit<Customer, 'id' | 'orders_count' | 'total_spent' | 'last_order' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          ...customer,
          orders_count: 0,
          total_spent: 0,
          last_order: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) throw error;
    return data[0] as Customer;
  },

  async updateCustomerStats(customerId: string, orderTotal: number) {
    const { data, error } = await supabase
      .from('customers')
      .update({
        orders_count: supabase.sql`orders_count + 1`,
        total_spent: supabase.sql`total_spent + ${orderTotal}`,
        last_order: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', customerId)
      .select();
    
    if (error) throw error;
    return data[0] as Customer;
  },

  // ===== PEDIDOS =====
  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>, items: Omit<OrderItem, 'id' | 'created_at'>[]) {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          ...order,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (orderError) throw orderError;

    // Crear items del pedido
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id,
      created_at: new Date().toISOString()
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;

    // Actualizar estadísticas del cliente si existe
    if (order.customer_id) {
      await this.updateCustomerStats(order.customer_id, order.total);
    }

    return orderData as Order;
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Order[];
  },

  // ===== EMPLEADOS =====
  async getEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Employee[];
  },

  async verifyEmployee(username: string, password: string) {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('username', username)
      .eq('password_hash', password)
      .eq('is_active', true)
      .single();
    
    if (error) return null;
    return data as Employee;
  }
};
