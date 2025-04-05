import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FileComplain from './pages/FileComplain';
import AdminDash from './pages/AdminDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-complain" element={<FileComplain />} />
        <Route path="/admin-dash" element={<AdminDash />} />
      </Routes>
    </Router>
  );
}

export default App;
