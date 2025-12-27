import React, { useState } from 'react';
import { SERVICES, PRICING_CATEGORIES } from '../constants';
import { Shirt, Wind, Clock, Sparkles, ShoppingBag, Layers, ChevronDown, ChevronRight, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Shirt: Shirt,
  Wind: Wind,
  Clock: Clock,
  Sparkles: Sparkles,
  ShoppingBag: ShoppingBag,
  Layers: Layers
};

// Mapping of Service IDs to relevant Pricing Categories for display purposes
const SERVICE_CATEGORY_MAP: Record<string, string[]> = {
  'wash-fold': ['tops', 'bottoms', 'children'],
  'wash-iron': ['tops', 'bottoms', 'accessories-homewear'],
  'only-iron': ['tops', 'bottoms', 'traditional'],
  'dry-clean': ['suits', 'dresses', 'outerwear', 'traditional'],
  'urgent': ['tops', 'bottoms', 'suits'],
  'blankets-carpets': ['bedding', 'bathroom'],
};

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(SERVICES[0].id);
  const navigate = useNavigate();

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handlePickupClick = (serviceId: string, itemName?: string) => {
    // Navigate to booking page with pre-filled service and note
    let url = `/booking?service=${serviceId}`;
    if (itemName) {
      url += `&item=${encodeURIComponent(itemName)}`;
    }
    navigate(url);
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a service to view details and schedule a pickup. We offer a wide range of cleaning options tailored to your needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName];
            const isExpanded = expandedService === service.id;
            
            // Get relevant pricing items for this service
            const relevantCategoryIds = SERVICE_CATEGORY_MAP[service.id] || [];
            const relevantCategories = PRICING_CATEGORIES.filter(cat => 
              relevantCategoryIds.includes(cat.id)
            );

            return (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleService(service.id)}
                  className={`w-full flex items-center p-6 text-left transition-colors ${
                    isExpanded ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-3 rounded-lg mr-4 ${isExpanded ? 'bg-blue-200 text-blue-700' : 'bg-blue-100 text-blue-600'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500 md:hidden">{service.description}</p>
                    <p className="hidden md:block text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Starts From</span>
                        <p className="text-lg font-bold text-blue-600">{service.priceStart}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-white">
                    {/* Main Service Action */}
                    <div className="p-6 bg-blue-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100">
                        <div className="text-center sm:text-left">
                           <p className="text-gray-900 font-medium">Ready to book {service.title}?</p>
                           <p className="text-sm text-gray-500">Schedule a general pickup for this service type.</p>
                        </div>
                        <button
                          onClick={() => handlePickupClick(service.id)}
                          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                        >
                           <Truck className="h-4 w-4" />
                           Request {service.title} Pickup
                        </button>
                    </div>

                    {/* Detailed Items Table */}
                    <div className="p-0 sm:p-6">
                      {relevantCategories.length > 0 ? (
                        <div className="space-y-8">
                           {relevantCategories.map(category => (
                             <div key={category.id}>
                                <h4 className="px-6 sm:px-0 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4 sm:mt-0">{category.title}</h4>
                                <div className="border rounded-xl overflow-hidden border-gray-100">
                                   <table className="min-w-full divide-y divide-gray-100">
                                      <thead className="bg-gray-50 hidden sm:table-header-group">
                                         <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                         </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-100">
                                         {category.items.map(item => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors flex flex-col sm:table-row p-4 sm:p-0">
                                               <td className="sm:px-6 sm:py-4 text-sm font-medium text-gray-900 flex justify-between sm:block">
                                                  <span>{item.name}</span>
                                                  <span className="sm:hidden font-bold text-gray-900">{item.price}</span>
                                               </td>
                                               <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-500">
                                                  {item.price}
                                               </td>
                                               <td className="sm:px-6 sm:py-4 text-right mt-3 sm:mt-0">
                                                  <button 
                                                    onClick={() => handlePickupClick(service.id, item.name)}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-xs sm:text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                  >
                                                     Pickup
                                                  </button>
                                               </td>
                                            </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                           <p>General pricing applies. Please proceed to booking to specify your items.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-6">Not sure which service you need?</p>
          <button
             onClick={() => navigate('/contact')} 
             className="text-blue-600 font-medium hover:text-blue-800 underline"
          >
             Contact us for assistance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
