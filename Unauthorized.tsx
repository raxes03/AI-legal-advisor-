import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
      <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold text-secondary-900 mb-4">Access Denied</h1>
      <p className="text-secondary-600 text-center max-w-md mb-8">
        You don't have permission to access this page. This area might be restricted to specific user roles.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary">
          Go to Homepage
        </Link>
        <Link to="/profile" className="btn-outline">
          View Your Profile
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;