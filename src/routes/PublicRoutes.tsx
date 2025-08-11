import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import NotFound from '../pages/error-pages/NotFound';
import Forbidden from '../pages/error-pages/Forbidden';

const PublicRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* System Settings - Redirect to 403 Forbidden (full screen) */}
      <Route path="/system-settings" element={<Forbidden />} />
      <Route path="/system-settings/*" element={<Forbidden />} />
      {/* All other non-existent pages - 404 Not Found (full screen) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;