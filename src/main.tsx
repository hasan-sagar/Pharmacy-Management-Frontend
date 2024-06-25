import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ReactQueryProvider>
        <AppRoutes />
        <Toaster visibleToasts={1} position="top-right" richColors />
      </ReactQueryProvider>
    </Router>
  </React.StrictMode>
);
