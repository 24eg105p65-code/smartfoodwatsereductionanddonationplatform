import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { donationService } from '../../services/donationService';
import { PlusCircle, Utensils, CheckCircle, Clock, Package } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const DonorDashboard = () => {
  const { currentUser } = useAuth();
  const [donations] = useState(donationService.getDonations());

  const myDonations = donations.filter(d => d.donorId === currentUser?.id);
  const totalDonations = myDonations.length;
  const availableDonations = myDonations.filter(d => d.status === 'Available').length;
  const acceptedDonations = myDonations.filter(d => d.status === 'Accepted' || d.status === 'Assigned').length;
  const completedDonations = myDonations.filter(d => d.status.includes('Delivered')).length;
  const totalFoodQuantity = myDonations.reduce((acc, d) => acc + (Number(d.quantity) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Food Donor Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Welcome, {currentUser?.name}</h1>
            <p className="text-slate-600 text-sm">Manage your surplus food donations and track NGO collection status.</p>
          </div>
          <Link
            to="/donor/donations/new"
            className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition flex items-center space-x-2 shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create New Donation</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-slate-900">{totalDonations}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Donations</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-green-600">{availableDonations}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Available</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-amber-600">{acceptedDonations}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">In Progress</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl font-extrabold text-blue-600">{completedDonations}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
            <p className="text-2xl font-extrabold text-purple-600">{totalFoodQuantity}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Units Donated</p>
          </div>
        </div>

        {/* My Donations Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">My Surplus Food Donations</h3>
          </div>

          {myDonations.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">You have not created any food donations yet.</p>
              <Link to="/donor/donations/new" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
                Create First Donation
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">ID & Food Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Best Before</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Assigned NGO / Volunteer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {myDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{d.foodName}</span>
                        <span className="text-xs text-slate-500">{d.id}</span>
                      </td>
                      <td className="p-4 text-slate-600">{d.category}</td>
                      <td className="p-4 font-semibold text-green-700">{d.quantity} {d.quantityUnit}</td>
                      <td className="p-4 text-slate-600">{formatDate(d.bestBefore)}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          d.status === 'Available' ? 'bg-green-100 text-green-800' :
                          d.status.includes('Delivered') ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-600">
                        {d.ngoName ? <div><strong>NGO:</strong> {d.ngoName}</div> : <span className="text-slate-400">No NGO requested yet</span>}
                        {d.volunteerName && <div><strong>Volunteer:</strong> {d.volunteerName}</div>}
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
