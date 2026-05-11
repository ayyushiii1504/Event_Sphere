import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-stone shadow-soft' : 'bg-white border-b border-stone'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-primary flex items-center justify-center">
            <span className="text-primary font-display text-base font-semibold">E</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-widest text-dark uppercase">
            Event<span className="text-primary">Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-sans font-medium text-charcoal tracking-wide hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn-gold text-sm tracking-widest uppercase">
                Join Free
              </Link>
            </>
          ) : (
            <>
              {[
                { path: '/home', label: 'Explore' },
                { path: '/create-event', label: 'Create' },
                { path: '/my-events', label: 'My Events' },
                { path: '/profile', label: 'Profile' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-sans font-medium tracking-wide transition-colors relative pb-1 ${
                    isActive(path)
                      ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary'
                      : 'text-charcoal hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-sm font-sans font-medium text-muted tracking-wide hover:text-dark transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setIsOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-dark transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-dark transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone px-6 py-6 space-y-4">
          {!user ? (
            <>
              <Link to="/login" className="block text-sm font-sans text-charcoal py-2 border-b border-stone" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link to="/signup" className="block text-sm font-sans text-primary py-2" onClick={() => setIsOpen(false)}>Join Free →</Link>
            </>
          ) : (
            <>
              {[
                { path: '/home', label: 'Explore' },
                { path: '/create-event', label: 'Create Event' },
                { path: '/my-events', label: 'My Events' },
                { path: '/profile', label: 'Profile' },
              ].map(({ path, label }) => (
                <Link key={path} to={path} className="block text-sm font-sans text-charcoal py-2 border-b border-stone" onClick={() => setIsOpen(false)}>{label}</Link>
              ))}
              <button onClick={handleLogout} className="block text-sm font-sans text-muted py-2">Sign Out</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
