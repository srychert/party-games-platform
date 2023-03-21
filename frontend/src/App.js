import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModePicker from './views/ModePicker';
import Login from './views/Login';
import Register from './views/Register';
import QuizList from './views/HostViews/QuizList';
import QuizRoom from './views/HostViews/QuizRoom';
import MainQuiz from './views/HostViews/MainQuiz';
import FinalResults from './views/HostViews/FinalResults';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import Profile from './views/UserPanel/Profile';
import Security from './views/UserPanel/Security';
import AddQuiz from './views/UserPanel/AddQuiz';
import Yours from './views/UserPanel/Yours';
import PlayerLayout from './components/PlayerLayout';
import HostLayout from './components/HostLayout';

function App() {
  return (
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
        <Route path="/host" element={<QuizList />} />
        <Route path="/host/*" element={<HostLayout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/security" element={<Security />} />
        <Route path="/profile/yours" element={<Yours />} />
        <Route path="/addquiz" element={<AddQuiz />} />
      </Route>
    </Routes>
  );
}

export default App;
