import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const GeneralRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default GeneralRoutes;
