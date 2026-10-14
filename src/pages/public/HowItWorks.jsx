import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldAlert, Truck, Users } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Platform Workflow
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4">How Smart Food Rescue Works</h1>
          <p className="text-slate-600 text-lg">
            Our end-to-end transparent platform ensures safe, rapid, and verifiable food redistribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-green-100 text-green-700 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl">1</div>
            <h3 className="text-2xl font-bold text-slate-900">For Food Donors (Hotels, Caterers, Events)</h3>
            <p className="text-slate-600 leading-relaxed">
              Donors list surplus food with details such as preparation time, best-before timestamps, storage conditions, and pickup location. Once submitted, the donation becomes instantly visible to verified NGOs.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Quick 2-minute listing form</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Unique tracking ID generated</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Real-time status updates</span></li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-green-100 text-green-700 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl">2</div>
            <h3 className="text-2xl font-bold text-slate-900">For NGOs & Charities</h3>
            <p className="text-slate-600 leading-relaxed">
              NGOs browse available donations filtered by distance, category, and urgency. They submit requests specifying meal quantities and preferred pickup times. Upon donor acceptance, delivery is coordinated.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Smart distance & requirement matching</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Safe food handling verification</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Distribution confirmation upon receipt</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-green-900 text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Whether you are a food business with surplus or an NGO feeding communities, join Smart Food Rescue today.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition">
              Register Now
            </Link>
            <Link to="/login" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition">
              Login to Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
