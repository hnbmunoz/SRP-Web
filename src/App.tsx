import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import LandingPage from './components/landing-page/LandingPage';
import './App.css';
import { useAuthStore } from './store/authStore';

function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page route that supersedes all templates */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="/*"
          element={token ? <PrivateRoutes /> : <PublicRoutes />}
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
