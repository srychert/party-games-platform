import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import PhoneView from "./PhoneView/GameVoting/PhoneView";
import EnterGame from "./Host/CreateGame/CreateGame";
import CreateGame from "./Host/CreateGame/CreateGame";
import EnterGamePhone from "./PhoneView/EnterGame/EnterGamePhone";
import GameForm from "./Host/AddGame/GameForm";
import Login from "./Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EnterGamePhone />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/logged",
    element: <App />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/phone-view",
    element: <PhoneView />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/phone-enter",
    element: <EnterGamePhone />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: "/enter-game/:id",
    element: <EnterGame />,
    errorElement: <div>Error 404</div>,
    useParams: true,
  },
  {
    path: "/main-game/:id",
    element: <CreateGame />,
    errorElement: <div>Error 404</div>,
    useParams: true,
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
