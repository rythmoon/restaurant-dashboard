// Función simple de hash (para desarrollo - en producción usarías bcrypt)
export const simpleHash = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

// Contraseñas pre-hasheadas para los usuarios de ejemplo
export const DEFAULT_PASSWORDS = {
  'admin': 'admin123',
  'mesero1': 'mesero123',
  'cocina1': 'cocina123',
  'cajero1': 'cajero123'
};
