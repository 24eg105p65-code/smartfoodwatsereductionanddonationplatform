export const initialUsers = [
  { id: 'u1', name: 'Fresh Meals Hotel', email: 'donor@demo.com', role: 'donor', phone: '+91 9876543210', address: 'Banjara Hills, Hyderabad', status: 'Active' },
  { id: 'u2', name: 'Hope Foundation NGO', email: 'ngo@demo.com', role: 'ngo', phone: '+91 9123456789', address: 'Ameerpet, Hyderabad', status: 'Active' },
  { id: 'u3', name: 'Ravi Kumar', email: 'volunteer@demo.com', role: 'volunteer', phone: '+91 9988776655', address: 'Madhapur, Hyderabad', status: 'Active' },
  { id: 'u4', name: 'System Administrator', email: 'admin@demo.com', role: 'admin', phone: '+91 9000000000', address: 'Hyderabad', status: 'Active' },
];

export const initialDonations = [
  {
    id: 'FD-2026-0001',
    donorId: 'u1',
    donorName: 'Fresh Meals Hotel',
    foodName: 'Vegetarian Thali Packets',
    category: 'Cooked Meals',
    description: 'Freshly prepared executive veg meals packed in eco-friendly boxes.',
    quantity: 50,
    quantityUnit: 'meals',
    dietType: 'Vegetarian',
    foodType: 'Cooked',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepDate: '2026-10-14T12:00',
    bestBefore: '2026-10-14T22:00',
    storageConditions: 'Refrigerated',
    packagingCondition: 'Sealed Containers',
    allergens: 'None',
    address: 'Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    landmark: 'Near City Center',
    pickupDate: '2026-10-14',
    pickupTimeWindow: '18:00 - 20:00',
    contactPerson: 'Rajesh Sharma',
    contactPhone: '+91 9876543210',
    mealsCount: 50,
    specialInstructions: 'Handle with care. Packed in cardboard boxes.',
    urgency: 'Normal',
    status: 'Available', // Available, Requested, Accepted, Assigned, PickedUp, InTransit, Delivered, Confirmed, Cancelled
    ngoRequestId: null,
    ngoName: null,
    volunteerId: null,
    volunteerName: null,
    createdAt: '2026-10-14T13:00:00Z',
    timeline: [
      { step: 'Donation Created', time: '2026-10-14 13:00', completed: true }
    ]
  },
  {
    id: 'FD-2026-0002',
    donorId: 'u1',
    donorName: 'Fresh Meals Hotel',
    foodName: 'Assorted Bakery Bread & Pastries',
    category: 'Bakery',
    description: 'Fresh whole wheat loaves and soft buns baked this morning.',
    quantity: 30,
    quantityUnit: 'kilograms',
    dietType: 'Vegetarian',
    foodType: 'Packaged',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    prepDate: '2026-10-14T08:00',
    bestBefore: '2026-10-15T08:00',
    storageConditions: 'Room Temperature',
    packagingCondition: 'Paper Bags',
    allergens: 'Gluten',
    address: 'Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    landmark: 'Near City Center',
    pickupDate: '2026-10-14',
    pickupTimeWindow: '16:00 - 18:00',
    contactPerson: 'Rajesh Sharma',
    contactPhone: '+91 9876543210',
    mealsCount: 40,
    specialInstructions: 'Keep dry.',
    urgency: 'Normal',
    status: 'Accepted',
    ngoRequestId: 'req-1',
    ngoName: 'Hope Foundation NGO',
    volunteerId: 'u3',
    volunteerName: 'Ravi Kumar',
    createdAt: '2026-10-14T09:00:00Z',
    timeline: [
      { step: 'Donation Created', time: '2026-10-14 09:00', completed: true },
      { step: 'NGO Request Submitted', time: '2026-10-14 09:30', completed: true },
      { step: 'NGO Accepted', time: '2026-10-14 10:00', completed: true },
      { step: 'Volunteer Assigned', time: '2026-10-14 10:15', completed: true }
    ]
  }
];

export const initialRequests = [
  {
    id: 'req-1',
    donationId: 'FD-2026-0002',
    ngoId: 'u2',
    ngoName: 'Hope Foundation NGO',
    mealsNeeded: 40,
    preferredTime: '16:30',
    status: 'Accepted',
    createdAt: '2026-10-14T09:30:00Z'
  }
];
