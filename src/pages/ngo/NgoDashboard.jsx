import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { donationService } from '../../services/donationService';
import { CheckCircle2, Clock, Package, Truck, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const NgoDashboard = () => {
  const { currentUser } = useAuth();
  const [donations] = useState(donationService.getDonations());
  const [requests] = useState(donationService.getRequests());

  const myRequests = requests.filter(r => r.ngoId === currentUser?.id);
  const acceptedDonations = donations.filter(d => d.ngoName === currentUser?.name);

  const handleConfirmReceipt = (donationId) => {
    donationService.confirmReceipt(donationId);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
              NGO Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Welcome, {currentUser?.name}</h1>
            <p className="text-slate-600 text-sm">Request available food donations, monitor incoming deliveries, and confirm distribution.</p>
          </div>
          <Link
            to="/available-food"
            className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition flex items-center space-x-2 shadow-sm"
          >
            <span>Browse Available Food</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-slate-900">{myRequests.length}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Requests Submitted</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-green-600">{acceptedDonations.length}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Accepted Donations</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-amber-600">
              {acceptedDonations.filter(d => d.status === 'Assigned' || d.status === 'InTransit').length}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">Incoming Deliveries</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-blue-600">
              {acceptedDonations.filter(d => d.status.includes('Confirmed')).length}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">Completed Receipts</p>
          </div>
        </div>

        {/* Accepted Donations & Delivery Tracking */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">My Accepted Food Donations & Deliveries</h3>
          </div>

          {acceptedDonations.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No accepted donations yet. Browse available food to submit requests.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Donation ID & Food</th>
                    <th className="p-4">Donor</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Volunteer Assigned</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {acceptedDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{d.foodName}</span>
                        <span className="text-xs text-slate-500">{d.id}</span>
                      </td>
                      <td className="p-4 text-slate-600">{d.donorName}</td>
                      <td className="p-4 font-semibold text-green-700">{d.quantity} {d.quantityUnit}</td>
                      <td className="p-4 text-slate-600">{d.volunteerName || 'Pending Assignment'}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          d.status.includes('Confirmed') ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {d.status === 'Delivered' && (
                          <button
                            onClick={() => handleConfirmReceipt(d.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Confirm Receipt
                          </button>
                        )}
                        {d.status.includes('Confirmed') && (
                          <span className="text-xs text-green-600 font-semibold">Completed ✓</span>
                        )}
                        {!['Delivered', 'Delivered & Confirmed'].includes(d.status) && (
                          <span className="text-xs text-slate-400">Waiting for delivery</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
