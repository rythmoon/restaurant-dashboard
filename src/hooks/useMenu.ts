import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<{ [key: string]: MenuItem[] }>({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Cargar menú desde Supabase
  const loadMenuData = async () => {
    try {
      setLoading(true);
      
      // Cargar productos
      const { data: menuItemsData, error: menuItemsError } = await supabase
        .from('menu_items')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (menuItemsError) throw menuItemsError;

      // Organizar productos por categoría
      const organizedMenu: { [key: string]: MenuItem[] } = {};
      
      if (menuItemsData) {
        menuItemsData.forEach(item => {
          if (!organizedMenu[item.category]) {
            organizedMenu[item.category] = [];
          }
          
          organizedMenu[item.category].push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            category: item.category,
            type: item.type,
            available: item.available
          });
        });
      }

      // Obtener categorías únicas
      const uniqueCategories = [...new Set(menuItemsData?.map(item => item.category) || [])];
      setCategories(uniqueCategories);
      setMenuItems(organizedMenu);
      
    } catch (error) {
      console.error('Error loading menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo producto
  const createItem = async (itemData: {
    name: string;
    description?: string;
    price: number;
    category: string;
    type: 'food' | 'drink';
    available?: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([{
          name: itemData.name.trim(),
          description: itemData.description?.trim(),
          price: itemData.price,
          category: itemData.category,
          type: itemData.type,
          available: itemData.available ?? true
        }])
        .select()
        .single();

      if (error) throw error;

      // Actualizar estado local
      const newItem: MenuItem = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        type: data.type,
        available: data.available
      };

      setMenuItems(prev => ({
        ...prev,
        [itemData.category]: [...(prev[itemData.category] || []), newItem]
      }));

      // Actualizar categorías si es nueva
      if (!categories.includes(itemData.category)) {
        setCategories(prev => [...prev, itemData.category]);
      }

      return { success: true, data: newItem };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Actualizar producto
  const updateItem = async (itemId: string, updates: Partial<{
    name: string;
    description?: string;
    price: number;
    category: string;
    type: 'food' | 'drink';
    available: boolean;
  }>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;

      // Recargar el menú completo para reflejar cambios
      await loadMenuData();

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Eliminar producto
  const deleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      // Recargar el menú
      await loadMenuData();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Obtener todos los items del menú
  const getAllItems = () => {
    return Object.values(menuItems).flat();
  };

  // Obtener items por categoría
  const getItemsByCategory = (category: string) => {
    return menuItems[category] || [];
  };

  // Obtener todas las categorías
  const getCategories = () => {
    return categories;
  };

  // Cargar datos al iniciar
  useEffect(() => {
    loadMenuData();
  }, []);

  return {
    menuItems,
    categories,
    loading,
    getAllItems,
    getItemsByCategory,
    getCategories,
    createItem,
    updateItem,
    deleteItem,
    refreshMenu: loadMenuData
  };
};
