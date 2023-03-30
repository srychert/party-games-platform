import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModePicker from './views/ModePicker';
import Login from './views/Login';
import Register from './views/Register';
import QuizList from './views/HostViews/QuizList';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import Profile from './views/UserPanel/Profile';
import Security from './views/UserPanel/Security';
import AddQuiz from './views/UserPanel/AddQuiz';
import Yours from './views/UserPanel/Yours';
import PlayerLayout from './components/PlayerLayout';
import HostLayout from './components/HostLayout';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    // TODO make a default container for all routes with default styles like h-screen
    // update all routes styles
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
        {/* <Route
          path="/host"
          element={
            <>
              {/* same as in HostLayout */}
        {/* TODO: move to HostLayout but do not start WS connection on this route */}
        {/* <NavigationBar showNavbarInit={true} loggedIn={true} />
              <QuizList />
            </>
          }
        /> 
        */}
        <Route path="/host/*" element={<HostLayout />} />
        {/* TODO make layout for profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/security" element={<Security />} />
        <Route path="/profile/yours" element={<Yours />} />
        <Route path="/addquiz" element={<AddQuiz />} />
      </Route>
    </Routes>
  );
}

export default App;
