import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center text-2xl font-bold text-dark">
          <GlobeAltIcon className="h-8 w-8 text-primary mr-2" />
          <Link to="/">Event Sphere</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary">Log In</Link>
              <Link to="/signup" className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="text-gray-600 hover:text-primary">Home</Link>
              <Link to="/create-event" className="text-gray-600 hover:text-primary">Create</Link>
              <Link to="/my-events" className="text-gray-600 hover:text-primary">My Events</Link>
              <Link to="/profile" className="text-gray-600 hover:text-primary">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(v => !v)}>
            {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white py-4">
          {!user ? (
            <>
              <Link to="/login" className="block text-center py-2">Log In</Link>
              <Link to="/signup" className="block text-center py-2">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="block text-center py-2">Home</Link>
              <Link to="/create-event" className="block text-center py-2">Create</Link>
              <Link to="/my-events" className="block text-center py-2">My Events</Link>
              <Link to="/profile" className="block text-center py-2">Profile</Link>
              <button onClick={handleLogout} className="w-full mt-2 bg-red-500 text-white py-2 rounded">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
