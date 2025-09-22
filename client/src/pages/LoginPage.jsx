import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Footer2 from '../components/Footer2';

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
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-dark mb-6 text-center">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-3" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-3" required />
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg">Log In</button>
          </form>
          <p className="mt-4 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default LoginPage;
