import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModePicker from './views/ModePicker';
import Login from './views/Login';
import Register from './views/Register';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import PlayerLayout from './components/PlayerLayout';
import HostLayout from './components/HostLayout';
import ProfileLayout from './components/ProfileLayout';
import Logout from './views/Logout';
import GeneralLayout from './components/GeneralLayout';

function App() {
  return (
    <div className="flex h-full bg-stone-300 text-gray-900">
      <Routes>
        <Route path="/" element={<ModePicker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* Phone routes */}
        <Route path="/player/*" element={<PlayerLayout />} />

        {/* Host routes */}
        <Route element={<ProtectRoutes />}>
          <Route path="/host/*" element={<HostLayout />} />
          <Route path="/profile/*" element={<ProfileLayout />} />
        </Route>
        <Route path="/*" element={<GeneralLayout />} />
      </Routes>
    </div>
  );
}

export default App;
