import React from 'react';
import { Users, Coffee, Clock, DollarSign } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Órdenes Hoy',
      value: '24',
      icon: Coffee,
      color: 'bg-blue-500',
    },
    {
      title: 'Clientes Activos',
      value: '8',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Tiempo Promedio',
      value: '15min',
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      title: 'Ingresos Hoy',
      value: '$1,240',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;