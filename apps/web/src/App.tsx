import { Navigate, Route, Routes } from "react-router-dom";

import { LandingPage } from "./pages/public/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
