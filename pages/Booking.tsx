
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, MapPin, Calendar, Clock, 
  CheckCircle2, ShoppingBag, Shirt, Wind, Layers, Footprints, 
  Edit2, User, Mail, Phone, Truck, Info, Search, Crosshair
} from 'lucide-react';
import { BookingFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

// --- Constants & Helpers ---

const TIME_SLOTS = [
  "08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", 
  "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"
];

const COLLECTION_INSTRUCTIONS = [
  "Collect from me in person",
  "Collect from outside (Recommended)",
  "Collect from reception/porter"
];

const DELIVERY_INSTRUCTIONS = [
  "Deliver to me in person",
  "Leave at the door (Recommended)",
  "Deliver to the reception/porter"
];

const FREQUENCIES = [
  { id: 'once', label: 'Just once' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Every two weeks' },
  { id: 'monthly', label: 'Every four weeks' }
];

const BOOKING_SERVICES = [
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    price: 'From AED 65 (up to 6kg)',
    features: ['WASH', 'TUMBLE-DRY', 'FOLDED', 'IN A BAG'],
    description: 'For everyday laundry, bedsheets and towels.',
    icon: ShoppingBag
  },
  {
    id: 'clean-press',
    title: 'Clean & Press',
    price: 'From AED 4 per item',
    features: ['WASH', 'DRY CLEANING', 'PRESSING', 'ON HANGERS'],
    description: 'Everyday laundry that requires pressing after washing.',
    icon: Shirt
  },
  {
    id: 'press-only',
    title: 'Press Only',
    price: 'From AED 7 per item',
    features: ['PRESSING', 'ON HANGERS'],
    description: 'For items that are already clean.',
    icon: Wind
  },
  {
    id: 'duvets',
    title: 'Duvets & Bulky Items',
    price: 'From AED 18 per item',
    features: ['CUSTOM CLEANING', '3 DAY SERVICE'],
    description: 'Deep cleaning for heavy household items.',
    icon: Layers
  },
  {
    id: 'sneakers',
    title: 'Sneaker Cleaning',
    price: 'From AED 89 per item',
    features: ['CUSTOM CLEANING', '5 DAY SERVICE'],
    description: 'Professional sneaker cleaning.',
    icon: Footprints
  }
];

const getNextDays = (count: number, t: any) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      value: d.toISOString().split('T')[0],
      label: i === 0 ? t.booking.today : i === 1 ? t.booking.tomorrow : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    });
  }
  return dates;
};

// --- Component ---

const Booking: React.FC = () => {
  const { t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    address: '',
    area: '',
    collectionDate: '',
    collectionTime: '',
    collectionInstruction: COLLECTION_INSTRUCTIONS[1],
    deliveryDate: '',
    deliveryTime: '',
    deliveryInstruction: DELIVERY_INSTRUCTIONS[1],
    driverNote: '',
    frequency: 'once',
    selectedServices: [],
    name: '',
    phone: '',
    email: ''
  });

  const datesOptions = getNextDays(7, t);

  // Local state for Step 1 (Address details split)
  const [addressDetails, setAddressDetails] = useState({
    building: '',
    flat: '',
    street: ''
  });
  const [mapOffset, setMapOffset] = useState({ x: -200, y: -150 }); // Initial center-ish offset
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Consolidate address on change
  useEffect(() => {
    const fullAddress = [
      addressDetails.flat ? `Flat ${addressDetails.flat}` : '',
      addressDetails.building,
      addressDetails.street,
      formData.area
    ].filter(Boolean).join(', ');
    
    // Only update if we have meaningful data to avoid overwriting with empty string on mount if coming back
    if (addressDetails.building || addressDetails.flat || addressDetails.street) {
        setFormData(prev => ({ ...prev, address: fullAddress }));
    }
  }, [addressDetails, formData.area]);

  const updateData = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (id: string) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(id);
      if (exists) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== id) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, id] };
      }
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: 
        // Require at least building or address text
        return addressDetails.building.trim().length > 0 || formData.address.trim().length > 3;
      case 2: return !!formData.collectionDate && !!formData.collectionTime;
      case 3: return !!formData.deliveryDate && !!formData.deliveryTime;
      case 4: return !!formData.frequency;
      case 5: return formData.selectedServices.length > 0;
      case 6: return formData.name.trim().length > 2 && formData.phone.trim().length > 5;
      default: return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Generate WhatsApp Message
    const serviceNames = formData.selectedServices
      .map(id => `• ${BOOKING_SERVICES.find(s => s.id === id)?.title}`)
      .join('\n');

    const frequencyLabel = FREQUENCIES.find(f => f.id === formData.frequency)?.label;

    const message = `*New Pickup Request | طلب استلام جديد* 🧺

👤 *Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}

📍 *Location:*
${formData.address}
${formData.area ? `Area: ${formData.area}` : ''}

🚚 *Collection:*
📅 ${formData.collectionDate}
⏰ ${formData.collectionTime}
ℹ️ ${formData.collectionInstruction}

📦 *Delivery:*
📅 ${formData.deliveryDate}
⏰ ${formData.deliveryTime}
ℹ️ ${formData.deliveryInstruction}

📋 *Order Details:*
Frequency: ${frequencyLabel}
Services:
${serviceNames}

${formData.driverNote ? `📝 *Note:* ${formData.driverNote}` : ''}`;

    // Encode and Open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "971501234567"; // Replace with actual business number
    
    // Open in new tab
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    setIsSuccess(true);
  };

  // Map Drag Logic
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setStartPan({ x: clientX - mapOffset.x, y: clientY - mapOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setMapOffset({
      x: clientX - startPan.x,
      y: clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.booking.successTitle}</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {t.booking.successMsg}
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors"
        >
          {t.nav.home}
        </button>
      </div>
    );
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8 rtl:space-x-reverse">
      {[1, 2, 3, 4, 5, 6, 7].map(step => (
        <div 
          key={step} 
          className={`h-2 rounded-full transition-all duration-300 ${
            step === currentStep ? 'w-8 bg-blue-600' : 
            step < currentStep ? 'w-2 bg-blue-400' : 'w-2 bg-gray-200'
          }`}
        />
      ))}
      <span className="text-xs font-medium text-gray-500 mx-2">{t.booking.next} {currentStep}/7</span>
    </div>
  );

  const iconRotateClass = dir === 'rtl' ? 'rotate-180' : '';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={currentStep === 1 ? () => window.history.back() : handleBack}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className={`h-6 w-6 ${iconRotateClass}`} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{t.booking.title}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {renderStepIndicator()}

        {/* Step 1: Address (Map & Details) */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step1}</h2>
            
            {/* Search */}
            <div className="relative z-10">
              <Search className="absolute top-3.5 left-4 rtl:left-auto rtl:right-4 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder={t.booking.searchPlaceholder}
                className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm outline-none"
              />
            </div>

            {/* Interactive Map Container */}
            <div className="relative w-full h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-inner border border-gray-200 group">
               {/* Draggable Map Image */}
               <div 
                 ref={mapRef}
                 className="absolute w-[1000px] h-[1000px] cursor-grab active:cursor-grabbing"
                 style={{ 
                    transform: `translate(${mapOffset.x}px, ${mapOffset.y}px)`,
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/Dubai_OpenStreetMap.png")', // Placeholder map
                    backgroundSize: 'cover',
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                 }}
                 onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 onTouchStart={handleMouseDown}
                 onTouchMove={handleMouseMove}
                 onTouchEnd={handleMouseUp}
               >
                 <div className="w-full h-full opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
               </div>

               {/* Center Pin */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
                  <div className={`text-blue-600 filter drop-shadow-lg transition-transform ${isDragging ? '-translate-y-4 scale-110' : ''}`}>
                    <MapPin className="h-10 w-10 fill-blue-600 text-white" />
                  </div>
                  <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px]"></div>
               </div>
               
               {/* Controls Overlay */}
               <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 flex flex-col gap-2">
                  <button className="p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-blue-600" title="Use current location">
                     <Crosshair className="h-6 w-6" />
                  </button>
               </div>

               {/* Instruction Overlay */}
               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-xs font-medium text-gray-600 pointer-events-none">
                  {t.booking.dragMap}
               </div>
            </div>

            {/* Address Details Form */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <MapPin className="h-4 w-4 text-blue-600" />
                 {t.booking.step1}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.booking.building} *</label>
                    <input 
                      type="text" 
                      value={addressDetails.building}
                      onChange={(e) => setAddressDetails({...addressDetails, building: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.booking.flat} *</label>
                    <input 
                      type="text" 
                      value={addressDetails.flat}
                      onChange={(e) => setAddressDetails({...addressDetails, flat: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                 </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.booking.street}</label>
                 <input 
                   type="text" 
                   value={formData.area}
                   onChange={(e) => updateData('area', e.target.value)}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                 />
              </div>

               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.booking.landmark}</label>
                 <input 
                   type="text" 
                   value={addressDetails.street}
                   onChange={(e) => setAddressDetails({...addressDetails, street: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                 />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Collection Time */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step2}</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.booking.selectDay} *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {datesOptions.slice(0, 6).map((date) => (
                  <button
                    key={date.value}
                    onClick={() => updateData('collectionDate', date.value)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.collectionDate === date.value
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.booking.selectTime} *</label>
              <div className="relative">
                <Clock className="absolute top-3.5 left-3 rtl:left-auto rtl:right-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={formData.collectionTime}
                  onChange={(e) => updateData('collectionTime', e.target.value)}
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none"
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Driver Instructions</label>
              <div className="space-y-3">
                {COLLECTION_INSTRUCTIONS.map((option) => (
                  <label key={option} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="collectionInstruction"
                      value={option}
                      checked={formData.collectionInstruction === option}
                      onChange={(e) => updateData('collectionInstruction', e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="mx-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Delivery Time */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step3}</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.booking.selectDay} *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {datesOptions.slice(1).map((date) => (
                  <button
                    key={date.value}
                    onClick={() => updateData('deliveryDate', date.value)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.deliveryDate === date.value
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.booking.selectTime} *</label>
              <div className="relative">
                <Clock className="absolute top-3.5 left-3 rtl:left-auto rtl:right-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={formData.deliveryTime}
                  onChange={(e) => updateData('deliveryTime', e.target.value)}
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none"
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Driver Instructions</label>
              <div className="space-y-3">
                {DELIVERY_INSTRUCTIONS.map((option) => (
                  <label key={option} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="deliveryInstruction"
                      value={option}
                      checked={formData.deliveryInstruction === option}
                      onChange={(e) => updateData('deliveryInstruction', e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="mx-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">{t.booking.driverNote}</label>
               <textarea
                 value={formData.driverNote}
                 onChange={(e) => updateData('driverNote', e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                 rows={2}
               />
            </div>
          </div>
        )}

        {/* Step 4: Frequency */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step4}</h2>
            
            <div className="space-y-3">
              {FREQUENCIES.map((freq) => (
                <label key={freq.id} className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${
                  formData.frequency === freq.id 
                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
                }`}>
                  <span className="font-medium text-gray-900">{freq.label}</span>
                  <input
                    type="radio"
                    name="frequency"
                    value={freq.id}
                    checked={formData.frequency === freq.id}
                    onChange={(e) => updateData('frequency', e.target.value)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>

            {formData.frequency === 'once' && (
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                 <Info className="h-5 w-5 flex-shrink-0" />
                 <p>You're booking a single order. We can send you a reminder next week if you like!</p>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Services */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step5}</h2>
            
            <div className="space-y-4">
              {BOOKING_SERVICES.map((service) => {
                const isSelected = formData.selectedServices.includes(service.id);
                return (
                  <div 
                    key={service.id} 
                    className={`border rounded-xl p-5 transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <service.icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                          <h3 className="font-bold text-gray-900">{service.title}</h3>
                       </div>
                       <button 
                         onClick={() => toggleService(service.id)}
                         className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                           isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                         }`}
                       >
                         {isSelected ? t.booking.added : t.booking.add}
                       </button>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{service.price}</p>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {service.features.map(feat => (
                         <span key={feat} className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">
                           {feat}
                         </span>
                       ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Contact */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step6}</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.name} *</label>
              <div className="relative">
                <User className="absolute top-3.5 left-3 rtl:left-auto rtl:right-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.phone} *</label>
              <div className="relative">
                <Phone className="absolute top-3.5 left-3 rtl:left-auto rtl:right-3 h-5 w-5 text-gray-400" />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => updateData('phone', e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.email}</label>
              <div className="relative">
                <Mail className="absolute top-3.5 left-3 rtl:left-auto rtl:right-3 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => updateData('email', e.target.value)}
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Review */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{t.booking.step7}</h2>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
               {/* Location */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.booking.step1}</h3>
                     <button onClick={() => setCurrentStep(1)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Edit2 className="h-3 w-3" />
                     </button>
                  </div>
                  <p className="text-gray-900 font-medium">{formData.address}</p>
               </div>

               {/* Collection */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.booking.step2}</h3>
                     <button onClick={() => setCurrentStep(2)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Edit2 className="h-3 w-3" />
                     </button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-1">
                     <Calendar className="h-4 w-4 text-gray-400" />
                     {formData.collectionDate}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-1">
                     <Clock className="h-4 w-4 text-gray-400" />
                     {formData.collectionTime}
                  </div>
                  <p className="text-gray-500 text-sm italic">{formData.collectionInstruction}</p>
               </div>

               {/* Delivery */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.booking.step3}</h3>
                     <button onClick={() => setCurrentStep(3)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                         <Edit2 className="h-3 w-3" />
                     </button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-1">
                     <Calendar className="h-4 w-4 text-gray-400" />
                     {formData.deliveryDate}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium mb-1">
                     <Clock className="h-4 w-4 text-gray-400" />
                     {formData.deliveryTime}
                  </div>
                  <p className="text-gray-500 text-sm italic">{formData.deliveryInstruction}</p>
               </div>

               {/* Services */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.booking.step5}</h3>
                     <button onClick={() => setCurrentStep(5)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Edit2 className="h-3 w-3" />
                     </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {formData.selectedServices.map(id => {
                        const service = BOOKING_SERVICES.find(s => s.id === id);
                        return (
                           <span key={id} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                              {service?.title}
                           </span>
                        );
                     })}
                  </div>
               </div>

               {/* Contact */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.booking.step6}</h3>
                     <button onClick={() => setCurrentStep(6)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Edit2 className="h-3 w-3" />
                     </button>
                  </div>
                  <p className="text-gray-900 font-medium">{formData.name}</p>
                  <p className="text-gray-600">{formData.phone}</p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg z-50">
        <div className="container mx-auto max-w-2xl flex gap-4">
           {currentStep === 7 ? (
             <button 
               onClick={handleSubmit}
               className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center text-lg"
             >
               {t.booking.confirm} <Truck className="mx-2 h-5 w-5" />
             </button>
           ) : (
             <button 
               onClick={handleNext}
               className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center text-lg"
             >
               {t.booking.next} <ChevronRight className={`mx-2 h-5 w-5 ${iconRotateClass}`} />
             </button>
           )}
        </div>
      </div>

    </div>
  );
};

export default Booking;
