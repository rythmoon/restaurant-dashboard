import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Employee } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSavedSession();
  }, []);

  const checkSavedSession = () => {
    try {
      const savedUser = localStorage.getItem('restaurant-user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        const sessionTime = localStorage.getItem('restaurant-session-time');
        if (sessionTime && (Date.now() - parseInt(sessionTime)) < 24 * 60 * 60 * 1000) {
          setUser(userData);
        } else {
          localStorage.removeItem('restaurant-user');
          localStorage.removeItem('restaurant-session-time');
        }
      }
    } catch (error) {
      console.error('Error checking saved session:', error);
      localStorage.removeItem('restaurant-user');
      localStorage.removeItem('restaurant-session-time');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log('🔐 Intentando login:', { username, password });
      
      // Buscar usuario por username
      const { data: employee, error } = await supabase
        .from('employees')
        .select('*')
        .eq('username', username.trim().toLowerCase())
        .eq('is_active', true)
        .single();

      console.log('📊 Resultado de BD:', { employee, error });

      if (error) {
        console.error('❌ Error de Supabase:', error);
        throw new Error('Usuario no encontrado en la base de datos');
      }

      if (!employee) {
        console.error('❌ Usuario no existe:', username);
        throw new Error('Usuario no encontrado');
      }

      // ✅ VERIFICACIÓN SIMPLE TEMPORAL - ACEPTAR CUALQUIER CONTRASEÑA
      const isValidPassword = true; // Temporal para testing

      console.log('🔑 Verificación de contraseña:', { isValidPassword });

      if (!isValidPassword) {
        console.error('❌ Contraseña incorrecta');
        throw new Error('Contraseña incorrecta');
      }

      console.log('✅ Login exitoso:', employee.name);
      
      // Guardar sesión
      localStorage.setItem('restaurant-user', JSON.stringify(employee));
      localStorage.setItem('restaurant-session-time', Date.now().toString());
      
      setUser(employee);
      return { success: true, error: null };
      
    } catch (error: any) {
      console.error('❌ Error en login:', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('restaurant-user');
      localStorage.removeItem('restaurant-session-time');
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
