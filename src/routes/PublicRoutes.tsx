import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';

const PublicRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;