import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Heart, ArrowRight, ShieldCheck, Truck, Users, Activity, CheckCircle2 } from 'lucide-react';
import { donationService } from '../../services/donationService';

export const Home = () => {
  const donations = donationService.getDonations();
  const totalMeals = donations.reduce((acc, d) => acc + (Number(d.mealsCount) || Number(d.quantity) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-700/60 text-green-200 border border-green-600">
                🌱 Smart Food Waste Reduction & Donation Platform
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Rescue Food. <span className="text-green-400">Reduce Waste.</span> Feed Communities.
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                Connect surplus food with NGOs and communities through smarter food donation, coordinated delivery, and transparent tracking.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/donor/donations/new"
                  className="px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition flex items-center space-x-2"
                >
                  <span>Donate Food</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/available-food"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition"
                >
                  Find Available Food
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition"
                >
                  Join as NGO
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                  alt="Food Donation and Community"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Live Impact</p>
                    <p className="text-xl font-bold">{totalMeals}+ Meals Saved & Distributed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-3xl font-extrabold text-green-700">{donations.length}</p>
              <p className="text-sm font-medium text-slate-600 mt-1">Total Donations</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-3xl font-extrabold text-green-700">{totalMeals}</p>
              <p className="text-sm font-medium text-slate-600 mt-1">Meals Distributed</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-3xl font-extrabold text-green-700">12+</p>
              <p className="text-sm font-medium text-slate-600 mt-1">Registered NGOs</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-3xl font-extrabold text-green-700">98%</p>
              <p className="text-sm font-medium text-slate-600 mt-1">Successful Deliveries</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How Smart Food Rescue Works</h2>
          <p className="text-slate-600">A seamless 4-step workflow connecting surplus food providers directly with charitable organizations and delivery heroes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Donate Surplus Food', desc: 'Hotels, restaurants, and event organizers list surplus food with preparation time and pickup details.' },
            { step: '02', title: 'Find a Suitable NGO', desc: 'Our smart matching recommends nearby verified NGOs based on food category and quantity.' },
            { step: '03', title: 'Arrange Delivery', desc: 'Assigned delivery volunteers pick up the food securely and transport it to the NGO destination.' },
            { step: '04', title: 'Confirm Distribution', desc: 'NGOs receive the food safely, confirm distribution, and update impact statistics in real-time.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-4xl font-extrabold text-green-600/20 absolute top-4 right-6">{item.step}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 mt-4">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Benefits & Core Features</h2>
            <p className="text-slate-300">Engineered for reliability, transparency, and impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Reducing Food Waste', desc: 'Directly routing edible surplus away from landfills into hungry mouths.' },
              { icon: Users, title: 'Connecting Donors & NGOs', desc: 'Creating a trustworthy bridge between food establishments and charitable trusts.' },
              { icon: Activity, title: 'Smart Matching', desc: 'Automated distance and requirement matching for fast, efficient distribution.' },
              { icon: Truck, title: 'Delivery Coordination', desc: 'Real-time status tracking from pickup to final distribution receipt.' },
              { icon: CheckCircle2, title: 'Food Safety Standards', desc: 'Strict guidelines on best-before times, packaging condition, and temperature.' },
              { icon: Heart, title: 'Transparent Impact', desc: 'Detailed analytics on total food saved and meals served.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Available Donations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Available Donations</h2>
            <p className="text-slate-600 mt-1">Surplus food currently available for reservation by registered NGOs.</p>
          </div>
          <Link to="/available-food" className="text-green-600 font-semibold hover:text-green-700 flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {donations.slice(0, 2).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sm:flex-row">
              <img src={item.imageUrl} alt={item.foodName} className="sm:w-48 h-48 object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{item.category}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.foodName}</h3>
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-sm font-semibold text-green-700">Quantity: {item.quantity} {item.quantityUnit}</span>
                  <Link to="/available-food" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition">
                    View & Request
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
