import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Common from './components/Common/Common';
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import Join from './components/Join/Join';
import PhoneView from './components/PhoneView/PhoneView';
import Host from './components/Host/Host';
import ChoosenGame from './components/ChoosenGame/ChoosenGame';
import MainGame from './components/MainGame/MainGame';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Common />} />
      <Route
        path="/login"
        element={<Login field1="username" field2="password" passtype="password" />}
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="/join" exact element={<Join />} />
      <Route path="/join/:pin" element={<PhoneView />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/host" element={<Host />} />
      </Route>
      <Route element={<ProtectRoutes />}>
        <Route path="/host/:id" element={<ChoosenGame />} />
      </Route>
      <Route element={<ProtectRoutes />}>
        <Route path="/host/:id/:pin" element={<MainGame />} />
      </Route>
    </Routes>
  );
}

export default App;
