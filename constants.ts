import { Service, Testimonial, PricingCategory } from './types';

export const SERVICES: Service[] = [
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    description: 'Everyday laundry washed, dried, and neatly folded.',
    priceStart: 'AED 45',
    iconName: 'ShoppingBag'
  },
  {
    id: 'wash-iron',
    title: 'Wash & Iron',
    description: 'Premium cleaning with crisp ironing for shirts and trousers.',
    priceStart: 'AED 15',
    iconName: 'Shirt'
  },
  {
    id: 'only-iron',
    title: 'Only Iron',
    description: 'Professional steam pressing for a wrinkle-free look.',
    priceStart: 'AED 7',
    iconName: 'Wind'
  },
  {
    id: 'dry-clean',
    title: 'Dry Cleaning',
    description: 'Expert care for delicate fabrics, suits, and dresses.',
    priceStart: 'AED 25',
    iconName: 'Sparkles'
  },
  {
    id: 'urgent',
    title: 'Urgent Service',
    description: 'Same day pickup and delivery for emergencies.',
    priceStart: '+50%',
    iconName: 'Clock'
  },
  {
    id: 'blankets-carpets',
    title: 'Blankets & Carpets',
    description: 'Deep cleaning for heavy household items.',
    priceStart: 'AED 60',
    iconName: 'Layers'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Regular Customer",
    comment: "The best laundry service in the city. Always on time and my clothes smell amazing.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Johnson",
    role: "Business Executive",
    comment: "The urgent service saved me before a big meeting. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Mother of two",
    comment: "I love the Wash & Fold bag service. Saves me so much time every week.",
    rating: 4
  }
];

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'tops',
    title: 'Tops',
    items: [
      {
        id: 'tshirt-hanger',
        name: 'T-Shirt on Hanger',
        price: 'AED 18',
        bundles: [
          { count: 20, label: '20 T-Shirts on Hangers', pricePerItem: 'AED 17' },
          { count: 50, label: '50 T-Shirts on Hangers', pricePerItem: 'AED 16.20' },
          { count: 100, label: '100 T-Shirts on Hangers', pricePerItem: 'AED 14.40' },
        ]
      },
      { id: 'tshirt-folded', name: 'T-Shirt Folded', price: 'AED 20' },
      { id: 'polo-hanger', name: 'Polo Shirt on Hanger', price: 'AED 18' },
      { id: 'polo-folded', name: 'Polo Shirt Folded', price: 'AED 20' },
      { id: 'pullover', name: 'Pullover', price: 'AED 45' },
      { id: 'cardigan', name: 'Cardigan', price: 'AED 35' },
      {
        id: 'blouse',
        name: 'Top / Blouse',
        price: 'AED 18',
        bundles: [
          { count: 5, label: '5 Blouses', pricePerItem: 'AED 17' },
          { count: 10, label: '10 Blouses', pricePerItem: 'AED 16.20' },
          { count: 20, label: '20 Blouses', pricePerItem: 'AED 14.40' },
        ]
      },
      { id: 'blouse-silk', name: 'Top / Blouse – Silk', price: 'AED 20' },
    ]
  },
  {
    id: 'bottoms',
    title: 'Bottoms',
    items: [
      { id: 'shorts', name: 'Shorts', price: 'AED 18' },
      { id: 'skirt', name: 'Skirt', price: 'AED 23' },
      { id: 'skirt-delicate', name: 'Skirt (Delicate)', price: 'AED 25', note: 'Silk or other delicate material' },
      {
        id: 'trousers',
        name: 'Trousers / Jeans',
        price: 'AED 23',
        bundles: [
          { count: 5, label: '5 Trousers', pricePerItem: 'AED 21.80' },
          { count: 10, label: '10 Trousers', pricePerItem: 'AED 20.70' },
          { count: 20, label: '20 Trousers', pricePerItem: 'AED 18.40' },
        ]
      },
    ]
  },
  {
    id: 'suits',
    title: 'Suits',
    items: [
      { id: 'suit-2pc', name: '2-Piece Suit', price: 'AED 75' },
      { id: 'suit-3pc', name: '3-Piece Suit', price: 'AED 95' },
    ]
  },
  {
    id: 'dresses',
    title: 'Dresses',
    items: [
      { id: 'dress', name: 'Dress', price: 'AED 45' },
      { id: 'dress-delicate', name: 'Dress (Delicate)', price: 'AED 75' },
      { id: 'dress-evening', name: 'Dress (Evening)', price: 'AED 75' },
      { id: 'jumpsuit', name: 'Jumpsuit', price: 'AED 45' },
    ]
  },
  {
    id: 'traditional',
    title: 'Traditional Items',
    items: [
      { id: 'abaya', name: 'Abaya', price: 'AED 18' },
      { id: 'dupatta', name: 'Dupatta / Shila', price: 'AED 15' },
      { id: 'ghutra', name: 'Ghutra', price: 'AED 10' },
      { id: 'kandura', name: 'Kandura / Dishdasha', price: 'AED 15' },
      { id: 'lungi', name: 'Lungi', price: 'AED 18' },
      { id: 'saree', name: 'Saree', price: 'AED 60' },
      { id: 'shalwar', name: 'Shalwar / Kurta', price: 'AED 28' },
    ]
  },
  {
    id: 'outerwear',
    title: 'Outerwear',
    items: [
      { id: 'jacket', name: 'Jacket / Blazer', price: 'AED 52' },
      { id: 'overcoat', name: 'Overcoat / Raincoat', price: 'AED 75' },
      { id: 'waistcoat', name: 'Waistcoat', price: 'AED 16' },
    ]
  },
  {
    id: 'accessories-homewear',
    title: 'Accessories & Homewear',
    items: [
      { id: 'socks', name: 'Pair of Socks', price: 'AED 4' },
      { id: 'scarf', name: 'Scarf', price: 'AED 16' },
      { id: 'underwear', name: 'Underwear', price: 'AED 4' },
      { id: 'cap', name: 'Cap', price: 'AED 16' },
      { id: 'tie', name: 'Tie', price: 'AED 5' },
    ]
  },
  {
    id: 'bedding',
    title: 'Bedding',
    items: [
      { id: 'bedsheet-big', name: 'Bed Sheet – Big', price: 'AED 15' },
      { id: 'bedsheet-small', name: 'Bed Sheet – Small', price: 'AED 10' },
      { id: 'duvet-king', name: 'Duvet Cover – King', price: 'AED 35' },
      { id: 'duvet-single', name: 'Duvet Cover – Single', price: 'AED 25' },
      { id: 'pillow-case', name: 'Pillow Case', price: 'AED 10' },
    ]
  },
  {
    id: 'bathroom',
    title: 'Bathroom Items',
    items: [
      { id: 'bath-mat', name: 'Bath Mat', price: 'AED 16' },
      { id: 'bath-robe', name: 'Bath Robe', price: 'AED 18' },
      { id: 'bath-towel', name: 'Bath Towel', price: 'AED 8' },
      { id: 'face-towel', name: 'Face Towel', price: 'AED 6' },
      { id: 'beach-towel', name: 'Beach / Pool Towel', price: 'AED 8' },
      { id: 'hand-towel', name: 'Hand Towel', price: 'AED 6' },
    ]
  },
];
