import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-slate-600 mb-6">You do not have permission to view this {currentUser.role} dashboard.</p>
        <a href="/" className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
          Return to Home
        </a>
      </div>
    );
  }

  return children;
};
