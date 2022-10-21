import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PhoneView from "./PhoneView/PhoneView";
import EnterGame from "./EnterGame/EnterGame";
import MainGame from "./MainGame/MainGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/phone-view",
    element: <PhoneView />,
  },
  {
    path: "/enter-game",
    element: <EnterGame />,
  },
  {
    path: "/main-game",
    element: <MainGame />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
