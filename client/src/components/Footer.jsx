import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-dark text-stone">
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 border border-accent flex items-center justify-center">
              <span className="text-accent font-display text-sm font-semibold">E</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-widest text-white uppercase">
              Event<span className="text-accent">Sphere</span>
            </span>
          </div>
          <p className="text-sm font-sans text-muted leading-relaxed">
            A curated space where extraordinary events meet the people who live for them.
          </p>
        </div>

        {/* Links */}
        {[
          {
            title: 'Discover',
            links: ['Categories', 'Cities', 'Trending']
          },
          {
            title: 'Organise',
            links: ['Create Event', 'How It Works', 'FAQ']
          },
          {
            title: 'Company',
            links: ['About', 'Help Centre', 'Contact']
          }
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-xs font-sans font-medium tracking-widest uppercase text-accent mb-5">{title}</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm font-sans text-muted hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-charcoal pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs font-sans text-muted tracking-wide">
          © {new Date().getFullYear()} EventSphere. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs font-sans text-muted hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs font-sans text-muted hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
