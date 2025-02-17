import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./assets/styles/ThemeProvider.tsx";
import { CandidateProvider } from "./contexts/CandidateContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CandidateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CandidateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
