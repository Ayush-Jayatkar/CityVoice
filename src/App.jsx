import { useState } from 'react';

import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FileComplain from './pages/FileComplain';
import AboutUs from './pages/AboutUs';

import AdminDash from './admin/AdminDash';
import AdminLogin from './admin/AdminLogin';
import AdminHome from './admin/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        {/* users pages */}
        <Route path="/" element={<Home />} />
        <Route path="/file-complain" element={<FileComplain />} />
        <Route path="/about" element={<AboutUs />} />

        {/* admin pages */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dash" element={<AdminDash />} />
        <Route path="/admin-home" element={<AdminHome />} />
        
        {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
