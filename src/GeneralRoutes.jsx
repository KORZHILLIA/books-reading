import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./shared/components/Spinner";

const PublicRoute = lazy(() => import("./shared/components/PublicRoute"));
const PrivateRoute = lazy(() => import("./shared/components/PrivateRoute"));
const IntroPage = lazy(() => import("./pages/IntroPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));

const GeneralRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/api/auth/verify/:verificationToken"
            element={<LoginPage />}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default GeneralRoutes;
