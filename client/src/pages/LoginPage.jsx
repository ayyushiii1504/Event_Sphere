import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) navigate('/home');
    else alert(res.message || 'Login failed');
  };

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-7 h-px bg-stone" />
              <span className="text-xs font-sans tracking-widest uppercase text-primary">Welcome Back</span>
              <div className="w-7 h-px bg-stone" />
            </div>
            <h1 className="font-display text-5xl font-light text-dark">Sign In</h1>
            <div className="w-12 h-px bg-primary mx-auto mt-4" />
          </div>

          {/* Card */}
          <div className="bg-white border border-stone p-10" style={{ boxShadow: '0 4px 32px rgba(28,28,46,0.08)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-muted mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-elegant"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-muted mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-elegant"
                  required
                />
              </div>
              <div className="pt-2">
                <button type="submit" className="btn-gold w-full text-sm tracking-widest uppercase py-4">
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm font-sans text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-secondary transition-colors">
              Join EventSphere →
            </Link>
          </p>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default LoginPage;
