import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

import TrendsHome from "./Pages/TrendsHome.jsx";
import MoviePreview from "./Pages/MoviePreview.jsx";
import MakeATake from "./Pages/MakeATake.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout with Navbar + <Outlet />
    children: [
      { index: true, element: <TrendsHome /> },
      { path: "movie/:id", element: <MoviePreview /> },
      { path: "makeatake", element: <MakeATake /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
