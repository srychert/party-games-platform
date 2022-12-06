import React from "react";
import { Route, Routes } from "react-router-dom";

import Common from "./components/Common/Common";
import Host from "./components/Host/Host";
import Join from "./components/PhoneView/Join/Join";
import Login from "./components/Host/Login/Login";
import { ProtectRoutes } from "./components/Common/ProtectRoutes";
import ChoosenGame from "./components/Host/ChoosenGame/ChoosenGame";
import PhoneView from "./components/PhoneView/GameVoting/PhoneView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Common />} />
      <Route
        path="/login"
        element={<Login field1="login" field2="password" passtype="password" />}
      />
      <Route path="/join" exact element={<Join />} />
      <Route path="/join/:pin" element={<PhoneView />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/host" element={<Host />} />
        <Route path="/host/:gameID" element={<ChoosenGame />} />
      </Route>
    </Routes>
  );
}

export default App;
