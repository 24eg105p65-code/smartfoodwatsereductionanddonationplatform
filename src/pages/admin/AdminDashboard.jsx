import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { donationService } from '../../services/donationService';
import { authService } from '../../services/authService';
import { ShieldCheck, Users, Package, Truck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users] = useState(authService.getUsers());
  const [donations] = useState(donationService.getDonations());

  const totalDonations = donations.length;
  const totalMeals = donations.reduce((acc, d) => acc + (Number(d.mealsCount) || Number(d.quantity) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
            System Administrator Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Admin Control Center</h1>
          <p className="text-slate-600 text-sm">Monitor platform users, oversee donations, and review system impact statistics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-slate-900">{users.length}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Users</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-green-600">{totalDonations}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Donations</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-blue-600">{totalMeals}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Total Meals Distributed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-purple-600">98.5%</p>
            <p className="text-xs font-medium text-slate-500 mt-1">Delivery Success Rate</p>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">User Management & Verification</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">{u.name}</td>
                    <td className="p-4 text-slate-600">{u.email}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{u.phone}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {u.status || 'Active'}
                      </span>
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
