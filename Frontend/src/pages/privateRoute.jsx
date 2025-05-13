import Loading from '../components/loading';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const PrivateRoute = ({ children }) => {
   const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

   if (isCheckingAuth) return <Loading />; // Show loading while checking auth

   return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;