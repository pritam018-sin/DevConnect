import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../redux/api/userApiSlice.js';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'avatar') {
      setAvatar(e.target.files[0]);
    } else if (e.target.name === 'coverImage') {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error('Avatar is required');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    data.append('avatar', avatar);
    if (coverImage) data.append('coverImage', coverImage);

    try {
      const res = await register(data).unwrap();
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error('Signup failed: ' + (err.data?.message || 'Unknown error'));
    }
  };

  const inputClass = "w-full px-4 py-3 bg-background/50 border border-surface focus:border-primary text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium";
  const labelClass = "block text-secondary text-sm font-semibold mb-2 ml-1";

  return (
    <div className="max-w-2xl mx-auto mt-6 mb-12 p-8 rounded-3xl bg-surface/80 backdrop-blur-md border border-primary/20 shadow-[0_0_50px_rgba(138,43,226,0.1)]">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-primary/20 rounded-2xl">
          <UserPlus className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h2 className="text-4xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">Join DevConnects</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className={inputClass} placeholder="John Doe" required />
          </div>
          <div>
            <label className={labelClass}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className={inputClass} placeholder="johndoe" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" required />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className={`${inputClass} min-h-[100px] resize-y`} placeholder="Tell us about yourself..." />
        </div>

        <div>
          <label className={labelClass}>Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} className={inputClass} placeholder="React, Node.js, Python..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Avatar <span className="text-red-400">*</span></label>
            <input type="file" name="avatar" onChange={handleFileChange} className={`${inputClass} text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30`} required />
          </div>
          <div>
            <label className={labelClass}>Cover Image</label>
            <input type="file" name="coverImage" onChange={handleFileChange} className={`${inputClass} text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30`} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-4 rounded-xl font-bold text-xl shadow-[0_4px_20px_rgba(138,43,226,0.4)] disabled:opacity-50 transition-all active:scale-[0.98]"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-surface/50 text-center">
        <p className="text-secondary font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-white font-bold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;