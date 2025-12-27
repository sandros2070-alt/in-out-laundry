import React, { useState, useEffect } from 'react';
import { PRICING_CATEGORIES } from '../constants';
import { Search, ChevronDown, ChevronRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { PricingItem } from '../types';

const Pricing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(PRICING_CATEGORIES[0].id);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(PRICING_CATEGORIES[0].id);

  // Scroll spy effect to update activeCategory based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const categories = PRICING_CATEGORIES.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = categories.length - 1; i >= 0; i--) {
        const section = categories[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(PRICING_CATEGORIES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    setExpandedCategory(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Offset for fixed headers
        behavior: 'smooth'
      });
    }
  };

  const toggleCategory = (id: string) => {
      setExpandedCategory(expandedCategory === id ? null : id);
  };

  const filteredCategories = PRICING_CATEGORIES.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-blue-200 max-w-2xl mx-auto mb-6">
            Transparent pricing with no hidden fees. Special discounts on bulk orders.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for an item (e.g. Shirt, Dress, Blanket)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 border-2 border-transparent focus:border-blue-400 focus:ring-0 outline-none shadow-lg"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation (Desktop) / Horizontal Scroll (Mobile) */}
          <aside className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24 z-30 bg-gray-50 pt-2 lg:pt-0">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 no-scrollbar">
                {PRICING_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`whitespace-nowrap px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-6">
             {/* Info Banner */}
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-sm text-blue-800 mb-6">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                   <p className="font-semibold">Urgent Service Available</p>
                   <p>Need it faster? Get same-day service for an additional 50% on the standard rates below.</p>
                </div>
             </div>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  id={category.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Category Header */}
                  <button 
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                    {expandedCategory === category.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  {/* Items List */}
                  {expandedCategory === category.id && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {category.items.map((item) => (
                        <PricingItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try searching for something else like "Shirt" or "Suit".</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const PricingItemRow: React.FC<{ item: PricingItem }> = ({ item }) => {
  const [showBundles, setShowBundles] = useState(false);
  const hasBundles = item.bundles && item.bundles.length > 0;

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{item.name}</span>
            {hasBundles && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                 Save up to 30%
               </span>
            )}
          </div>
          {item.note && (
            <p className="text-sm text-gray-500 mt-1 italic">{item.note}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
           <span className="font-bold text-gray-900">{item.price}</span>
           {hasBundles && (
             <button 
                onClick={() => setShowBundles(!showBundles)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
             >
                {showBundles ? 'Hide deals' : 'See deals'}
                <ChevronDown className={`h-4 w-4 transition-transform ${showBundles ? 'rotate-180' : ''}`} />
             </button>
           )}
        </div>
      </div>

      {/* Bundle Details */}
      {showBundles && item.bundles && (
        <div className="mt-4 pl-4 border-l-2 border-blue-100 space-y-3 bg-blue-50/50 p-4 rounded-r-lg">
           {item.bundles.map((bundle, idx) => (
             <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{bundle.label}</span>
                <div className="flex items-center gap-2">
                   <span className="text-gray-400 line-through text-xs">{item.price}</span>
                   <span className="font-bold text-blue-600">{bundle.pricePerItem} <span className="text-xs font-normal text-gray-500">/ item</span></span>
                   <ChevronRight className="h-4 w-4 text-blue-300" />
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Pricing;
