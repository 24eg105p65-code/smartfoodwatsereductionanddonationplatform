import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { donationService } from '../../services/donationService';
import { Utensils, ArrowLeft } from 'lucide-react';

export const CreateDonation = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: '',
    category: 'Cooked Meals',
    description: '',
    quantity: '',
    quantityUnit: 'meals',
    dietType: 'Vegetarian',
    foodType: 'Cooked',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepDate: '',
    bestBefore: '',
    storageConditions: 'Refrigerated',
    packagingCondition: 'Sealed Containers',
    allergens: 'None',
    address: currentUser?.address || 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    landmark: 'Near Central Park',
    pickupDate: '',
    pickupTimeWindow: '18:00 - 20:00',
    contactPerson: currentUser?.name || 'Manager',
    contactPhone: currentUser?.phone || '+91 9876543210',
    mealsCount: '',
    specialInstructions: 'Handle with care.',
    urgency: 'Normal'
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      donationService.createDonation(formData, currentUser || { id: 'u1', name: 'Demo Donor' });
      setSuccess(true);
      setTimeout(() => {
        navigate(currentUser ? '/donor/dashboard' : '/available-food');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create donation.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-slate-100">
            <div className="bg-green-600 p-3 rounded-2xl text-white">
              <Utensils className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Create New Food Donation</h1>
              <p className="text-sm text-slate-600">List surplus food to connect with verified NGOs and volunteers.</p>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl font-medium">
              Donation successfully created! Redirecting to dashboard...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  required
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="e.g. Veg Biryani Packets"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Food Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="Cooked Meals">Cooked Meals</option>
                  <option value="Raw Ingredients">Raw Ingredients</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Packaged Foods">Packaged Foods</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Food Description</label>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the food items, preparation standards, etc."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Unit</label>
                <select
                  name="quantityUnit"
                  value={formData.quantityUnit}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="meals">Meals</option>
                  <option value="kilograms">Kilograms (kg)</option>
                  <option value="packets">Packets</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diet Type</label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preparation Date & Time</label>
                <input
                  type="datetime-local"
                  name="prepDate"
                  required
                  value={formData.prepDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Best Before / Expiry Time</label>
                <input
                  type="datetime-local"
                  name="bestBefore"
                  required
                  value={formData.bestBefore}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Time Window</label>
                <input
                  type="text"
                  name="pickupTimeWindow"
                  required
                  value={formData.pickupTimeWindow}
                  onChange={handleChange}
                  placeholder="e.g. 18:00 - 20:00"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Publish Donation Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
