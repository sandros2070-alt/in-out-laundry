
export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  iconName: 'Shirt' | 'Wind' | 'Clock' | 'Sparkles' | 'ShoppingBag' | 'Layers';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface PricingBundle {
  count: number;
  pricePerItem: string;
  label: string;
  originalTotal?: string; // Optional for display logic if needed
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  note?: string;
  bundles?: PricingBundle[];
}

export interface PricingCategory {
  id: string;
  title: string;
  items: PricingItem[];
}

export interface BookingFormData {
  // Step 1: Address
  address: string;
  area: string;
  
  // Step 2: Collection
  collectionDate: string;
  collectionTime: string;
  collectionInstruction: string;
  
  // Step 3: Delivery
  deliveryDate: string;
  deliveryTime: string;
  deliveryInstruction: string;
  driverNote: string;
  
  // Step 4: Frequency
  frequency: string;
  
  // Step 5: Services
  selectedServices: string[];
  
  // Step 6: Contact
  name: string;
  phone: string;
  email: string;
}

export interface OrderStats {
  name: string;
  orders: number;
  revenue: number;
}
