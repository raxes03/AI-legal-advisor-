import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-secondary-100 p-6 rounded-full mb-6">
        <Search className="h-16 w-16 text-secondary-400" />
      </div>
      <h1 className="text-3xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
      <p className="text-secondary-600 text-center max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary">
          Back to Homepage
        </Link>
        <Link to="/legal-helpdesk" className="btn-outline">
          Get Legal Help
        </Link>
      </div>
    </div>
  );
};

export default NotFound;