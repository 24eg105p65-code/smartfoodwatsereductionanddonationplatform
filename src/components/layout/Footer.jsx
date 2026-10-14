import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Heart, Github } from 'lucide-react';
import { donationService } from '../../services/donationService';

export const Footer = () => {
  const handleResetData = () => {
    if (window.confirm('Reset all demo data and restore initial mock records?')) {
      donationService.resetDemoData();
      window.location.reload();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg text-white">
                <Utensils className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">Smart Food Rescue</span>
            </div>
            <p className="text-sm text-slate-400">
              Rescue Food. Reduce Waste. Feed Communities. Connecting surplus food with NGOs and communities through smart tracking.
            </p>
            <div className="text-xs text-slate-500">
              College Project Prototype (B.Tech CSE) • Java Spring Boot Backend Ready
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/how-it-works" className="hover:text-green-400 transition">How It Works</Link></li>
              <li><Link to="/available-food" className="hover:text-green-400 transition">Available Food</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">User Roles</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-green-400 transition">Food Donor Portal</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition">NGO Portal</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition">Volunteer Portal</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Demo Controls</h4>
            <p className="text-xs text-slate-400 mb-3">
              Need to restart or test fresh scenarios? Reset all local demo donations and requests instantly.
            </p>
            <button
              onClick={handleResetData}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-green-400 border border-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Reset Demo Data
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Smart Food Rescue Platform. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
