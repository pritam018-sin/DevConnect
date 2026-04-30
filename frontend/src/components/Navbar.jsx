import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/feature/auth/authSlice.js';
import { useLogoutMutation } from '../redux/api/userApiSlice.js';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error("Logout failed", err);
      dispatch(logout());
      toast.error('Logout failed: ' + (err.data?.message || 'Unknown error'));
      navigate('/');
    }
  };

  const NavItem = ({ to, icon, label, isActive }) => (
    <Link
      to={to}
      className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all overflow-hidden ${isActive ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:bg-glass hover:text-white'}`}
      title={label}
    >
      <span className="material-symbols-outlined min-w-[24px] text-center">{icon}</span>
      <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
    </Link>
  );

  return (
    <aside className="fixed h-screen py-6 px-4 flex flex-col justify-between border-r border-primary/10 transition-all duration-300 w-20 hover:w-64 group z-50 bg-background-dark/95 backdrop-blur-md overflow-hidden">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex items-center gap-4 px-1" title="DevConnect">
          <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white">terminal</span>
          </div>
          <div className="whitespace-nowrap flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">DevConnect</h1>
            <p className="text-[10px] text-primary font-medium uppercase tracking-widest leading-tight">The Pulse</p>
          </div>
        </Link>

        <nav className="flex flex-col gap-2">
          <NavItem to="/" icon="explore" label="Feed" isActive={location.pathname === '/'} />
          <NavItem to="/network" icon="group" label="Network" isActive={location.pathname === '/network'} />
          <NavItem to="/projects" icon="layers" label="Projects" isActive={location.pathname === '/projects'} />
          <NavItem to="/communities" icon="public" label="Communities" isActive={location.pathname === '/communities'} />
          <NavItem to="/settings" icon="settings" label="Settings" isActive={location.pathname === '/settings'} />

          {!userInfo && (
            <Link to="/login" className="flex items-center gap-4 px-3 py-3 rounded-xl bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 transition-all mt-4 overflow-hidden" title="Login">
              <span className="material-symbols-outlined min-w-[24px] text-center">login</span>
              <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Login</span>
            </Link>
          )}
        </nav>
      </div>

      {userInfo && (
        <div className="glass-card rounded-full p-2 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors overflow-hidden" onClick={() => navigate(`/profile/${userInfo.username}`)} title="Profile">
          <div className="w-10 h-10 min-w-[40px] rounded-full bg-slate-800 bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${userInfo.avatar || 'https://via.placeholder.com/40'}')` }}></div>
          <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2">
            <span className="text-sm font-bold text-white block max-w-[120px] truncate">{userInfo.fullname || userInfo.username}</span>
            <span className="text-xs text-slate-500 truncate max-w-[120px]">@{userInfo.username}</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Navbar;