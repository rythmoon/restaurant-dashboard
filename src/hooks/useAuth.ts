import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Employee } from '../lib/supabase';
import { simpleHash, DEFAULT_PASSWORDS } from '../utils/hash';

export const useAuth = () => {
  const [user, setUser] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    checkSavedSession();
  }, []);

  const checkSavedSession = () => {
    try {
      const savedUser = localStorage.getItem('restaurant-user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Verificar que la sesión no haya expirado (24 horas)
        const sessionTime = localStorage.getItem('restaurant-session-time');
        if (sessionTime && (Date.now() - parseInt(sessionTime)) < 24 * 60 * 60 * 1000) {
          setUser(userData);
        } else {
          // Sesión expirada
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
      
      // Buscar usuario por username
      const { data: employee, error } = await supabase
        .from('employees')
        .select('*')
        .eq('username', username.trim().toLowerCase())
        .eq('is_active', true)
        .single();

      if (error || !employee) {
        throw new Error('Usuario no encontrado');
      }

      // ✅ Verificación de contraseña
      let isValidPassword = false;

      // Primero verificar si tiene password_hash en la base de datos
      if (employee.password_hash) {
        isValidPassword = simpleHash(password) === employee.password_hash;
      } 
      // Si no tiene password_hash, usar contraseñas por defecto
      else if (DEFAULT_PASSWORDS[employee.username as keyof typeof DEFAULT_PASSWORDS]) {
        const defaultPassword = DEFAULT_PASSWORDS[employee.username as keyof typeof DEFAULT_PASSWORDS];
        isValidPassword = password === defaultPassword;
      }

      if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
      }

      // Guardar sesión en localStorage
      localStorage.setItem('restaurant-user', JSON.stringify(employee));
      localStorage.setItem('restaurant-session-time', Date.now().toString());
      
      setUser(employee);
      return { success: true, error: null };
      
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Limpiar sesión local
      localStorage.removeItem('restaurant-user');
      localStorage.removeItem('restaurant-session-time');
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar contraseña
  const changePassword = async (newPassword: string) => {
    if (!user) throw new Error('No hay usuario autenticado');

    try {
      const passwordHash = simpleHash(newPassword);
      
      const { error } = await supabase
        .from('employees')
        .update({ password_hash: passwordHash })
        .eq('id', user.id);

      if (error) throw error;

      // Actualizar usuario local
      const updatedUser = { ...user, password_hash: passwordHash };
      localStorage.setItem('restaurant-user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    changePassword,
    isAuthenticated: !!user,
  };
};
