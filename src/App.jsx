import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { Home } from './pages/public/Home';
import { HowItWorks } from './pages/public/HowItWorks';
import { AvailableFood } from './pages/public/AvailableFood';
import { About } from './pages/public/About';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Role Dashboards
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { CreateDonation } from './pages/donor/CreateDonation';
import { NgoDashboard } from './pages/ngo/NgoDashboard';
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/available-food" element={<AvailableFood />} />
              <Route path="/about" element={<About />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Donor Routes */}
              <Route path="/donor/dashboard" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/donor/donations/new" element={<CreateDonation />} />

              {/* NGO Routes */}
              <Route path="/ngo/dashboard" element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NgoDashboard />
                </ProtectedRoute>
              } />

              {/* Volunteer Routes */}
              <Route path="/volunteer/dashboard" element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-32">
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">404 - Page Not Found</h1>
                  <p className="text-slate-600 mb-6">The page you are looking for does not exist.</p>
                  <a href="/" className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                    Return to Home
                  </a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
