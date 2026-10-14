import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { donationService } from '../../services/donationService';
import { Truck, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const VolunteerDashboard = () => {
  const { currentUser } = useAuth();
  const [donations] = useState(donationService.getDonations());

  const assignedDeliveries = donations.filter(d => d.volunteerId === currentUser?.id || d.status === 'Accepted');
  const activeDeliveries = donations.filter(d => d.volunteerId === currentUser?.id && !d.status.includes('Delivered'));

  const handleUpdateStatus = (donationId, newStatus) => {
    donationService.updateDeliveryStatus(donationId, newStatus);
    window.location.reload();
  };

  const handleAcceptAssignment = (donationId) => {
    donationService.assignVolunteer(donationId, currentUser.id, currentUser.name);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Delivery Volunteer Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Welcome, {currentUser?.name}</h1>
          <p className="text-slate-600 text-sm">Accept delivery assignments, manage transit, and mark successful distributions.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-slate-900">
              {donations.filter(d => d.status === 'Accepted').length}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">Available Assignments</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-amber-600">{activeDeliveries.length}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">My Active Deliveries</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-green-600">
              {donations.filter(d => d.volunteerId === currentUser?.id && d.status.includes('Delivered')).length}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">Completed Deliveries</p>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Delivery Assignments & Workflow</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Donation & Details</th>
                  <th className="p-4">Pickup Address</th>
                  <th className="p-4">Destination NGO</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4">Actions / Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {donations.filter(d => d.status === 'Accepted' || d.volunteerId === currentUser?.id).map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{d.foodName}</span>
                      <span className="text-xs text-slate-500">Qty: {d.quantity} {d.quantityUnit} ({d.id})</span>
                    </td>
                    <td className="p-4 text-slate-600 text-xs">
                      <div>{d.donorName}</div>
                      <div className="text-slate-400">{d.address}, {d.city}</div>
                    </td>
                    <td className="p-4 text-slate-600 text-xs">
                      <div className="font-semibold">{d.ngoName || 'Assigned NGO'}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      {d.status === 'Accepted' && (
                        <button
                          onClick={() => handleAcceptAssignment(d.id)}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Accept Assignment
                        </button>
                      )}
                      {d.volunteerId === currentUser?.id && d.status === 'Assigned' && (
                        <button
                          onClick={() => handleUpdateStatus(d.id, 'Picked_Up')}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {d.volunteerId === currentUser?.id && d.status === 'Picked_Up' && (
                        <button
                          onClick={() => handleUpdateStatus(d.id, 'In_Transit')}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Start Transit
                        </button>
                      )}
                      {d.volunteerId === currentUser?.id && d.status === 'In_Transit' && (
                        <button
                          onClick={() => handleUpdateStatus(d.id, 'Delivered')}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {d.status.includes('Delivered') && (
                        <span className="text-xs text-green-600 font-semibold">Delivered ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
