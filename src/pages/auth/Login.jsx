import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      switch (user.role) {
        case 'donor': navigate('/donor/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'admin': navigate('/admin/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    try {
      const user = await login(demoEmail, 'password123');
      switch (user.role) {
        case 'donor': navigate('/donor/dashboard'); break;
        case 'ngo': navigate('/ngo/dashboard'); break;
        case 'volunteer': navigate('/volunteer/dashboard'); break;
        case 'admin': navigate('/admin/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-green-600 p-3 rounded-2xl text-white">
            <Utensils className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Sign in to Smart Food Rescue
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or <Link to="/register" className="font-medium text-green-600 hover:text-green-500">register a new account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. donor@demo.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-sm"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
              Quick Demo Logins (Click to instant login)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('donor@demo.com')}
                className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-semibold transition text-left"
              >
                🏨 Donor Account
              </button>
              <button
                onClick={() => handleDemoLogin('ngo@demo.com')}
                className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-semibold transition text-left"
              >
                🤝 NGO Account
              </button>
              <button
                onClick={() => handleDemoLogin('volunteer@demo.com')}
                className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-semibold transition text-left"
              >
                🛵 Volunteer Account
              </button>
              <button
                onClick={() => handleDemoLogin('admin@demo.com')}
                className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-semibold transition text-left"
              >
                🛡️ Admin Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
