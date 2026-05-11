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
    const res = await signup(name, email, password, city);
    if (res.ok) navigate('/home');
    else alert(res.message || 'Signup failed');
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
              <span className="text-xs font-sans tracking-widest uppercase text-primary">Create Account</span>
              <div className="w-7 h-px bg-stone" />
            </div>
            <h1 className="font-display text-5xl font-light text-dark">Join EventSphere</h1>
            <div className="w-12 h-px bg-primary mx-auto mt-4" />
          </div>

          {/* Card */}
          <div className="bg-white border border-stone p-10" style={{ boxShadow: '0 4px 32px rgba(28,28,46,0.08)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'Your name', value: name, onChange: (e) => setName(e.target.value) },
                { label: 'Email Address', type: 'email', placeholder: 'you@example.com', value: email, onChange: (e) => setEmail(e.target.value) },
                { label: 'Password', type: 'password', placeholder: '••••••••', value: password, onChange: (e) => setPassword(e.target.value) },
                { label: 'Your City', type: 'text', placeholder: 'e.g. Mumbai', value: city, onChange: (e) => setCity(e.target.value) },
              ].map(({ label, type, placeholder, value, onChange }) => (
                <div key={label}>
                  <label className="block text-xs font-sans font-medium tracking-widest uppercase text-muted mb-2">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="input-elegant"
                    required
                  />
                </div>
              ))}
              <div className="pt-2">
                <button type="submit" className="btn-gold w-full text-sm tracking-widest uppercase py-4">
                  Create Account
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm font-sans text-muted mt-6">
            Already a member?{' '}
            <Link to="/login" className="text-primary hover:text-secondary transition-colors">
              Sign In →
            </Link>
          </p>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default SignupPage;
