import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login";
import Messages from "./screens/MessageUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "messages",
    element: <Messages />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="ssd-project-v1.us.auth0.com"
      clientId="ZTX7SqrTk7cBjkqD1KCKam90heNV2XP5"
      redirectUri={window.location.origin}
      audience="ssd-api"
      scope="openid profile email read:current_user update:current_user_metadata"
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
