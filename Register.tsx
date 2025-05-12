import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName || !email || !password || !confirmPassword || !city) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await signUp(email, password, displayName, city, role);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to create an account: ' + error.message);
      } else {
        setError('Failed to create an account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to sign up with Google: ' + error.message);
      } else {
        setError('Failed to sign up with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">Create your account</h2>
      <p className="mb-8 text-secondary-600">Join The Legal AI platform</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input pl-10"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="form-label">
              Confirm password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="city" className="form-label">
            City
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input pl-10"
              placeholder="New Delhi"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="form-label">Role</label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <div
              className={`cursor-pointer border rounded-md px-3 py-2 flex flex-col items-center justify-center ${
                role === 'citizen'
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
              onClick={() => setRole('citizen')}
            >
              <User className={`h-5 w-5 ${role === 'citizen' ? 'text-primary-600' : 'text-secondary-500'}`} />
              <span className="mt-1 text-sm">Citizen</span>
            </div>
            
            <div
              className={`cursor-pointer border rounded-md px-3 py-2 flex flex-col items-center justify-center ${
                role === 'lawyer'
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
              onClick={() => setRole('lawyer')}
            >
              <Scale className={`h-5 w-5 ${role === 'lawyer' ? 'text-primary-600' : 'text-secondary-500'}`} />
              <span className="mt-1 text-sm">Lawyer</span>
            </div>
            
            <div
              className={`cursor-pointer border rounded-md px-3 py-2 flex flex-col items-center justify-center ${
                role === 'admin'
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
              onClick={() => setRole('admin')}
            >
              <BarChart2 className={`h-5 w-5 ${role === 'admin' ? 'text-primary-600' : 'text-secondary-500'}`} />
              <span className="mt-1 text-sm">Admin</span>
            </div>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-secondary-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center py-2 px-4 border border-secondary-300 rounded-md shadow-sm bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-center text-sm text-secondary-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;