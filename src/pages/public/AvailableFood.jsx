import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { donationService } from '../../services/donationService';
import { calculateUrgency, formatDate } from '../../utils/formatters';
import { Search, Filter, MapPin, Clock, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AvailableFood = () => {
  const { currentUser } = useAuth();
  const [donations] = useState(donationService.getDonations());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [mealsNeeded, setMealsNeeded] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || d.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const isAvailable = d.status === 'Available';
    return matchesSearch && matchesCategory && isAvailable;
  });

  const handleRequest = (e) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'ngo') {
      setErrorMsg('You must be logged in as an NGO to request donations.');
      return;
    }
    try {
      donationService.requestDonation(selectedDonation.id, currentUser, mealsNeeded, preferredTime);
      setSuccessMsg('Donation request submitted successfully!');
      setSelectedDonation(null);
      setMealsNeeded('');
      setPreferredTime('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Available Surplus Food</h1>
            <p className="text-slate-600 mt-1">Browse live surplus food donations ready for NGO reservation and pickup.</p>
          </div>
          {currentUser && currentUser.role === 'ngo' && (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
              Logged in as NGO: {currentUser.name}
            </span>
          )}
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl font-medium">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by food name, donor, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Cooked Meals">Cooked Meals</option>
              <option value="Raw Ingredients">Raw Ingredients</option>
              <option value="Bakery">Bakery</option>
              <option value="Packaged Foods">Packaged Foods</option>
            </select>
          </div>
        </div>

        {/* Donations Grid */}
        {filteredDonations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-lg font-medium text-slate-600">No available food donations found at the moment.</p>
            <p className="text-sm text-slate-400 mt-1">Check back later or test by creating a new donation as a donor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredDonations.map((item) => {
              const urgency = calculateUrgency(item.bestBefore);
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-48">
                      <img src={item.imageUrl} alt={item.foodName} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-bold shadow">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${urgency.color}`}>
                          {urgency.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                        <span>Donor: {item.donorName}</span>
                        <span>{item.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.foodName}</h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{item.address}, {item.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>Best Before: {formatDate(item.bestBefore)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                        Qty: {item.quantity} {item.quantityUnit}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.dietType}</span>
                    </div>
                    <button
                      onClick={() => setSelectedDonation(item)}
                      className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                    >
                      View Details & Request
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Donation Details Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{selectedDonation.id}</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">{selectedDonation.foodName}</h2>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <img src={selectedDonation.imageUrl} alt={selectedDonation.foodName} className="w-full h-64 object-cover rounded-2xl" />

                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div><strong>Donor:</strong> {selectedDonation.donorName}</div>
                  <div><strong>Category:</strong> {selectedDonation.category}</div>
                  <div><strong>Quantity:</strong> {selectedDonation.quantity} {selectedDonation.quantityUnit}</div>
                  <div><strong>Diet Type:</strong> {selectedDonation.dietType}</div>
                  <div><strong>Storage:</strong> {selectedDonation.storageConditions}</div>
                  <div><strong>Packaging:</strong> {selectedDonation.packagingCondition}</div>
                  <div><strong>Allergens:</strong> {selectedDonation.allergens}</div>
                  <div><strong>Best Before:</strong> {formatDate(selectedDonation.bestBefore)}</div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Pickup Location</h4>
                  <p className="text-sm text-slate-600">{selectedDonation.address}, {selectedDonation.city} ({selectedDonation.landmark})</p>
                  <p className="text-xs text-slate-500 mt-1">Time Window: {selectedDonation.pickupTimeWindow}</p>
                </div>

                {currentUser && currentUser.role === 'ngo' ? (
                  <form onSubmit={handleRequest} className="space-y-4 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900">Submit Request for this Donation</h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Meals Needed / Quantity Required</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max={selectedDonation.quantity}
                        value={mealsNeeded}
                        onChange={(e) => setMealsNeeded(e.target.value)}
                        placeholder="e.g., 25"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Pickup Time</label>
                      <input
                        type="text"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder="e.g., 18:30"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex space-x-4 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
                      >
                        Submit Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDonation(null)}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium">
                    Please log in as an NGO account to submit a request for this donation. <Link to="/login" className="underline font-bold">Login here</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
