import React from 'react';
import { Bell, Settings, User, ChefHat, Sparkles } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header moderno */}
      <header className="glass-card border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 warm-gradient rounded-2xl flex items-center justify-center shadow-medium">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-black text-gradient">
                  Sabores & Sazón
                </h1>
                <p className="text-warm-600 text-sm font-medium">Dashboard Restaurant</p>
              </div>
            </div>

            {/* Navegación y acciones */}
            <div className="flex items-center space-x-6">
              {/* Stats rápidos */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-warm-900">12</div>
                  <div className="text-warm-600 text-xs">Órdenes Hoy</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-success-600">S/ 1,240</div>
                  <div className="text-warm-600 text-xs">Ingresos</div>
                </div>
              </div>

              {/* Iconos de acción */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-warm-600 hover:text-primary-600 transition-colors duration-200">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-warm-600 hover:text-primary-600 transition-colors duration-200">
                  <Settings size={20} />
                </button>
                <button className="flex items-center space-x-3 p-2 pl-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 border border-white/30">
                  <div className="w-8 h-8 warm-gradient rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-warm-900">Admin</div>
                    <div className="text-xs text-warm-600">Restaurant</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content con padding mejorado */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer sutil */}
      <footer className="glass-card border-t border-white/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-warm-600 text-sm">
            © 2024 Sabores & Sazón. Hecho con ❤️ para tu restaurant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
