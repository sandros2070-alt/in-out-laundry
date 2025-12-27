import React from 'react';
import { Shirt, Wind, Clock, Sparkles, ShoppingBag, Layers } from 'lucide-react';
import { Service } from '../types';

const iconMap = {
  Shirt: Shirt,
  Wind: Wind,
  Clock: Clock,
  Sparkles: Sparkles,
  ShoppingBag: ShoppingBag,
  Layers: Layers
};

interface Props {
  service: Service;
}

const ServiceCard: React.FC<Props> = ({ service }) => {
  const Icon = iconMap[service.iconName];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>
      <div className="mt-auto">
        <p className="text-sm font-medium text-gray-500">Starts from</p>
        <p className="text-xl font-bold text-blue-600">{service.priceStart}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
