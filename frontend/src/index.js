import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import PhoneView from "./PhoneView/GameVoting/PhoneView";
import EnterGamePhone from "./PhoneView/EnterGame/EnterGamePhone";
import GameForm from "./Host/AddGame/GameForm";
import Login from "./Login/Login";
import SelectGame from "./Host/SelectGame/SelectGame";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/join",
    element: <EnterGamePhone />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/host",
    element: <SelectGame />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/add-game",
    element: <GameForm />,
    errorElement: <div>Error 404</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
