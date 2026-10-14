import React from 'react';
import { Utensils, Heart, ShieldCheck, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
            About Smart Food Rescue
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4">Rescue Food. Reduce Waste. Feed Communities.</h1>
          <p className="text-slate-600 text-lg">
            Smart Food Rescue is a B.Tech Computer Science college project designed to bridge the gap between surplus food providers and communities in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Utensils className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To eliminate food wastage from hotels, weddings, and cafeterias by leveraging smart matching algorithms and real-time delivery coordination.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Food Safety First</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strict adherence to preparation timers, best-before deadlines, and proper storage conditions to guarantee safe distribution.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">B.Tech Project 2026</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built with React, Vite, Tailwind CSS, and structured for seamless integration with a Java Spring Boot backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
