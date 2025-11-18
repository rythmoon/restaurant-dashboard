// StatsCards.tsx
import React from 'react';
import { Coffee, TrendingUp } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Órdenes Activas',
      value: '12',
      change: '+2',
      icon: Coffee,
      color: 'bg-blue-500',
    },
    {
      title: 'Clientes Hoy',
      value: '48',
      change: '+8',
      icon: Coffee,
      color: 'bg-green-500',
    },
    {
      title: 'Tiempo Promedio',
      value: '18min',
      change: '-2min',
      icon: Coffee,
      color: 'bg-purple-500',
    },
    {
      title: 'Ingresos Hoy',
      value: 'S/ 1,240',
      change: '+15%',
      icon: Coffee,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                  <TrendingUp size={8} className="mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${stat.color} transition-all duration-1000`}
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
