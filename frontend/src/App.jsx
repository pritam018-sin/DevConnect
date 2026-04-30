import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Navbar from './components/Navbar.jsx';
import RightSidebar from './components/RightSidebar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
// import Profile from './pages/Profile.jsx';
// import EditProfile from './pages/EditProfile.jsx';
import './index.css';

import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div className="flex max-w-[1440px] mx-auto min-h-screen relative font-display text-slate-100">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1E143E', textShadow: 'none', color: '#fff', border: '1px solid #673AB7' } }} />
      <Navbar />
      <main className={`flex-1 ml-20 p-6 flex flex-col gap-8 ${isProfilePage ? '' : 'mr-80'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      {!isProfilePage && <RightSidebar />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
