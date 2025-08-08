import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import NotFound from '../components/NotFound';
import Forbidden from '../components/Forbidden';

const PublicRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Forbidden />} />
    </Routes>
  );
};

export default PublicRoutes;