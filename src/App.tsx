import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import LandingPage from './components/landing-page/LandingPage';
import AuthDemo from './components/reserve-components/AuthDemo';
import './App.css';
import { useAuth } from './store/authStore';
import { useTheme } from './store/themeStore';

function App() {
  const { isAuthenticated } = useAuth();
  const { initializeTheme } = useTheme();

  // Initialize theme on app startup
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Demo route */}
        <Route path="/auth-demo" element={<AuthDemo />} />
        {/* Landing page route that supersedes all templates */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="/*"
          element={isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
