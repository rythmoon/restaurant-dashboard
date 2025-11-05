import React from 'react';
import { Users, Coffee, Clock, DollarSign, TrendingUp } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Órdenes Activas',
      value: '12',
      change: '+2',
      icon: Coffee,
      color: 'from-primary-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-primary-50 to-orange-50',
    },
    {
      title: 'Clientes Hoy',
      value: '48',
      change: '+8',
      icon: Users,
      color: 'from-secondary-500 to-amber-500',
      bgColor: 'bg-gradient-to-br from-secondary-50 to-amber-50',
    },
    {
      title: 'Tiempo Promedio',
      value: '18min',
      change: '-2min',
      icon: Clock,
      color: 'from-success-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-success-50 to-emerald-50',
    },
    {
      title: 'Ingresos Hoy',
      value: 'S/ 1,240',
      change: '+15%',
      icon: DollarSign,
      color: 'from-warm-600 to-warm-700',
      bgColor: 'bg-gradient-to-br from-warm-50 to-warm-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card group animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-600 mb-1">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-warm-900">{stat.value}</p>
                <span className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full flex items-center">
                  <TrendingUp size={10} className="mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <div className={`w-6 h-6 ${stat.color} bg-gradient-to-br rounded-full flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-warm-100">
            <div className="w-full bg-warm-100 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                style={{ width: `${70 + (index * 10)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
