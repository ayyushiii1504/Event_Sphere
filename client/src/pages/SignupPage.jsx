import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';

import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Footer2 from '../components/Footer2';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password,city);
    if (res.ok) navigate('/home');
    else alert(res.message || 'Signup failed');
  };

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-dark mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded p-3" required />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded p-3" required />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border rounded p-3" required />
            <input type="text" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border rounded p-3" required />

            <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg">Sign Up</button>
          </form>
          <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-primary">Log In</Link></p>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default SignupPage;
