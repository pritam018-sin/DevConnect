import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/userApiSlice.js';
import { setCredentials } from '../redux/feature/auth/authSlice.js';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmail = formData.email.includes('@');
      const payload = {
        password: formData.password,
        ...(isEmail ? { email: formData.email } : { username: formData.email })
      };

      const res = await login(payload).unwrap();
      dispatch(setCredentials({
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }));
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed: ' + (err.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 rounded-3xl bg-surface/80 backdrop-blur-md border border-primary/20 shadow-[0_0_50px_rgba(138,43,226,0.1)]">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-primary/20 rounded-2xl">
          <LogIn className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h2 className="text-3xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-secondary text-sm font-semibold mb-2 ml-1">Email or Username</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background/50 border border-surface focus:border-primary text-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            placeholder="JohnDoe"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-secondary text-sm font-semibold mb-2 ml-1">Cipher Key</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-4 pr-12 py-3 bg-background/50 border border-surface focus:border-primary text-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-primary transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(138,43,226,0.4)] disabled:opacity-50 transition-all active:scale-[0.98] mt-2"
        >
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-surface/50 text-center">
        <p className="text-secondary font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-white font-bold transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;