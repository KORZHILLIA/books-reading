import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";

const GeneralRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default GeneralRoutes;
