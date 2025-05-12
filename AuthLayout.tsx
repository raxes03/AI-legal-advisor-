import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthLayout: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // If authenticated, redirect to home
  if (!loading && currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-pulse">
          <Scale className="h-12 w-12 text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-primary-50">
      {/* Left side with image and branding */}
      <div className="hidden lg:flex flex-col w-1/2 bg-primary-600 text-white p-12 justify-between">
        <div>
          <div className="flex items-center">
            <Scale className="h-10 w-10" />
            <span className="ml-2 text-2xl font-bold">The Legal AI</span>
          </div>
          <h1 className="mt-12 text-4xl font-bold leading-tight">
            AI-powered legal assistance at your fingertips
          </h1>
          <p className="mt-6 text-lg text-primary-100">
            Get help with FIR analysis, legal queries, and lawyer consultations - all in one platform.
          </p>
        </div>
        <div className="mt-12">
          <div className="bg-primary-700/50 rounded-lg p-6">
            <p className="text-lg font-medium">"The Legal AI has revolutionized how we handle legal matters. It's efficient, accurate, and saves us valuable time."</p>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div className="ml-3">
                <p className="font-semibold">Justice Singh</p>
                <p className="text-sm text-primary-200">High Court Judge</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600">The Legal AI</span>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;