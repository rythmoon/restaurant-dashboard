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
        setUser(userData);
        console.log('✅ Sesión recuperada:', userData.name);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      localStorage.removeItem('restaurant-user');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log('🔐 Iniciando login para:', username);

      // Buscar usuario por username
      const { data: employee, error } = await supabase
        .from('employees')
        .select('*')
        .eq('username', username.trim().toLowerCase())
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error de base de datos:', error);
        if (error.code === 'PGRST116') {
          throw new Error('Usuario no encontrado');
        } else {
          throw new Error(`Error de conexión: ${error.message}`);
        }
      }

      if (!employee) {
        throw new Error('Usuario no existe en el sistema');
      }

      // Verificar contraseña
      if (!employee.password_hash) {
        // Si no tiene contraseña, permitir login (para compatibilidad)
        console.log('⚠️ Usuario sin contraseña, permitiendo acceso');
      } else if (employee.password_hash !== password) {
        throw new Error('Contraseña incorrecta');
      }

      console.log('✅ Login exitoso:', employee.name);
      
      // Guardar sesión (sin la contraseña por seguridad)
      const { password_hash, ...userWithoutPassword } = employee;
      localStorage.setItem('restaurant-user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      return { success: true, error: null, user: userWithoutPassword };
      
    } catch (error: any) {
      console.error('Error en login:', error.message);
      return { success: false, error: error.message, user: null };
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
      console.log('✅ Sesión cerrada correctamente');
      
      // Forzar recarga para limpiar estado completo
      window.location.reload();
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
