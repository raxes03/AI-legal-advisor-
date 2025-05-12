import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

interface ProtectedLayoutProps {
  allowedRoles?: Array<'citizen' | 'lawyer' | 'admin'>;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ allowedRoles }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="animate-pulse">
          <Scale className="h-12 w-12 text-primary-600" />
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;