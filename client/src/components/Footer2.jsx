import React from 'react';

const Footer2 = () => (
  <footer className="bg-dark border-t border-charcoal">
    <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="text-xs font-sans text-muted tracking-wide">
        © {new Date().getFullYear()} EventSphere. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-xs font-sans text-muted hover:text-stone transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs font-sans text-muted hover:text-stone transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer2;
