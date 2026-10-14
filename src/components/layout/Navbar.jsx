import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'donor': return '/donor/dashboard';
      case 'ngo': return '/ngo/dashboard';
      case 'volunteer': return '/volunteer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg text-white">
              <Utensils className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Smart Food Rescue</span>
              <span className="hidden sm:block text-xs text-green-600 font-medium">Rescue Food. Reduce Waste. Feed Communities.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-green-600 font-medium transition">Home</Link>
            <Link to="/how-it-works" className="text-slate-600 hover:text-green-600 font-medium transition">How It Works</Link>
            <Link to="/available-food" className="text-slate-600 hover:text-green-600 font-medium transition">Available Food</Link>
            <Link to="/about" className="text-slate-600 hover:text-green-600 font-medium transition">About Us</Link>
          </nav>

          {/* Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={getDashboardRoute(currentUser.role)}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard ({currentUser.role})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-slate-600 hover:text-red-600 rounded-lg font-medium transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 text-green-700 font-medium hover:text-green-800 transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
                  Register
                </Link>
                <Link to="/donor/donations/new" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition shadow-sm">
                  Donate Food
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 hover:text-green-600 font-medium py-1">Home</Link>
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 hover:text-green-600 font-medium py-1">How It Works</Link>
          <Link to="/available-food" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 hover:text-green-600 font-medium py-1">Available Food</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 hover:text-green-600 font-medium py-1">About Us</Link>
          
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            {currentUser ? (
              <>
                <Link
                  to={getDashboardRoute(currentUser.role)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>My Dashboard</span>
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center px-4 py-2 border border-green-600 text-green-700 rounded-lg font-medium">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium">
                  Register
                </Link>
                <Link to="/donor/donations/new" onClick={() => setMobileMenuOpen(false)} className="text-center px-4 py-2 bg-slate-900 text-white rounded-lg font-medium">
                  Donate Food
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
