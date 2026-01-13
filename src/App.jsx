import "./App.css";
import AppFrame from "./Layouts/AppFrame";
import { Routes, Route, useLocation } from "react-router-dom";

import TrendsHome from "./Pages/TrendsHome";
import MoviePreview from "./Pages/MoviePreview";
import MakeATake from "./Pages/MakeATake";
import NotFound from "./Pages/NotFound";
import TakesPage from "./Pages/TakesPage";
import ReviewPage from "./Pages/ReviewPage";

export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <AppFrame>
      <main className="relative min-h-dvh bg-transparent">
        {/* normal pages */}
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<TrendsHome />} />
          <Route path="/makeatake" element={<MakeATake />} />
          <Route path="/movie/:id" element={<MoviePreview />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/take/:id" element={<TakesPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
        </Routes>

        {/* modal-only routes */}
        {backgroundLocation && (
          <Routes>
            <Route path="/movie/:id" element={<MoviePreview />} />
          </Routes>
        )}
      </main>
    </AppFrame>
  );
}
