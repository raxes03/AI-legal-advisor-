import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const FirAnalyzer = lazy(() => import('./pages/FirAnalyzer'));
const LegalHelpdesk = lazy(() => import('./pages/LegalHelpdesk'));
const MyCases = lazy(() => import('./pages/MyCases'));
const ScheduleLawyer = lazy(() => import('./pages/ScheduleLawyer'));
const AdminDashboard = lazy(() => import("./pages/auth/AdminDashboard")); // Adjusted path to match the correct file location

const Profile = lazy(() => import('./pages/auth/Profile')); // Adjusted path to match the correct file location
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <Scale className="h-16 w-16 text-primary-600" />
      <p className="mt-4 text-primary-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  // PWA setup
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js');
          console.log('Service worker registered successfully');
        } catch (error) {
          console.error('Service worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected routes for all authenticated users */}
            <Route element={<ProtectedLayout />}>
              <Route path="/fir-analyzer" element={<FirAnalyzer />} />
              <Route path="/legal-helpdesk" element={<LegalHelpdesk />} />
              <Route path="/my-cases" element={<MyCases />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Citizen-only routes */}
            <Route element={<ProtectedLayout allowedRoles={['citizen']} />}>
              <Route path="/schedule-lawyer" element={<ScheduleLawyer />} />
            </Route>

            {/* Admin-only routes */}
            <Route element={<ProtectedLayout allowedRoles={['admin']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Error and fallback routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;