import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Menu, X, LogOut, Scale, FileText, MessageSquare, Calendar, BarChart2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const navLinks = [
    { 
      name: 'FIR Analyzer', 
      path: '/fir-analyzer', 
      icon: <FileText className="w-5 h-5" />,
      roles: ['citizen', 'lawyer', 'admin'] 
    },
    { 
      name: 'Legal Helpdesk', 
      path: '/legal-helpdesk', 
      icon: <MessageSquare className="w-5 h-5" />,
      roles: ['citizen', 'lawyer', 'admin'] 
    },
    { 
      name: 'My Cases', 
      path: '/my-cases', 
      icon: <Scale className="w-5 h-5" />,
      roles: ['citizen', 'lawyer', 'admin'] 
    },
    { 
      name: 'Schedule Lawyer', 
      path: '/schedule-lawyer', 
      icon: <Calendar className="w-5 h-5" />,
      roles: ['citizen'] 
    },
    { 
      name: 'Admin Dashboard', 
      path: '/admin-dashboard', 
      icon: <BarChart2 className="w-5 h-5" />,
      roles: ['admin'] 
    },
  ];

  // Filter nav links based on user role
  const filteredNavLinks = navLinks.filter(link => 
    userProfile && link.roles.includes(userProfile.role)
  );

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Scale className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600">The Legal AI</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {currentUser && filteredNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {currentUser ? (
              <div className="ml-4 flex items-center">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <Link
                      to="/profile"
                      className="flex items-center text-sm font-medium text-secondary-700 hover:text-secondary-900"
                    >
                      {userProfile?.photoURL ? (
                        <img 
                          className="h-8 w-8 rounded-full object-cover"
                          src={userProfile.photoURL}
                          alt={userProfile.displayName || 'User'}
                        />
                      ) : (
                        <UserCircle className="h-8 w-8 text-secondary-400" />
                      )}
                      <span className="ml-2">{userProfile?.displayName || 'User'}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="ml-4 p-1 rounded-full text-secondary-400 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-secondary-500 hover:text-secondary-700 px-3 py-2 text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {currentUser && filteredNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center`}
                onClick={closeMenu}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
          
          {currentUser ? (
            <div className="pt-4 pb-3 border-t border-secondary-200">
              <div className="flex items-center px-4">
                {userProfile?.photoURL ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={userProfile.photoURL}
                    alt={userProfile.displayName || 'User'}
                  />
                ) : (
                  <UserCircle className="h-10 w-10 text-secondary-400" />
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-secondary-800">
                    {userProfile?.displayName || 'User'}
                  </div>
                  <div className="text-sm font-medium text-secondary-500">
                    {userProfile?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100"
                  onClick={closeMenu}
                >
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-secondary-200 px-4 flex flex-col space-y-2">
              <Link
                to="/login"
                className="btn-secondary w-full"
                onClick={closeMenu}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="btn-primary w-full"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;