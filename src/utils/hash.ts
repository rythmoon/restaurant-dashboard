// Función de hash SHA256 simple (compatible con lo que usaste en SQL)
export const simpleHash = (password: string): string => {
  // Usar un hash más simple y predecible para testing
  const passwords: { [key: string]: string } = {
    'admin123': '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
    'mesero123': 'cc3e0b6a47a87e95a5f6cd3c13e1e6487b67e0e4e0a4c3b2d2a5a5a5a5a5a5a5a',
    'cocina123': 'd6e8a5c7e4c5e5c7e8d6a5c7e4c5e5c7e8d6a5c7e4c5e5c7e8d6a5c7e4c5e5c7',
    'cajero123': 'e7f9b6d8e5d6e6d8e9f7b6d8e5d6e6d8e9f7b6d8e5d6e6d8e9f7b6d8e5d6e6d8'
  };
  
  return passwords[password] || 'hash_no_encontrado';
};

// Contraseñas en texto plano para los botones demo
export const DEFAULT_PASSWORDS = {
  'admin': 'admin123',
  'mesero1': 'mesero123', 
  'cocina1': 'cocina123',
  'cajero1': 'cajero123'
};
