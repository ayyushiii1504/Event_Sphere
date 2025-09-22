import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";  // ✅ import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>   {/* ✅ wrap app in provider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
