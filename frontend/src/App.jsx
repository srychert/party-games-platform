import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModePicker from './views/ModePicker';
import Login from './views/Login';
import Register from './views/Register';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import PlayerLayout from './components/PlayerLayout';
import HostLayout from './components/HostLayout';
import ProfileLayout from './components/ProfileLayout';
import Loading from './views/Loading';
import Error from './views/Error';
import Game from './views/PlayerViews/Game';

function App() {
  return (
    // TODO make a default container for all routes with default styles like h-screen
    // update all routes styles
    <div className="default-container">
      <Routes>
        <Route path="/" element={<ModePicker />} />
        <Route
          path="/login"
          element={<Login field1="username" field2="password" passtype="password" />}
        />
        <Route path="/register" element={<Register />} />

        {/* Phone routes */}
        <Route path="/player/*" element={<PlayerLayout />} />

        {/* Host routes */}
        <Route element={<ProtectRoutes />}>
          <Route path="/host/*" element={<HostLayout />} />
          <Route path="/profile/*" element={<ProfileLayout />} />
        </Route>
        <Route path="/test" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
