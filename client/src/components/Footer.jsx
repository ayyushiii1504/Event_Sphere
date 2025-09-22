import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const Footer = () => (
  <footer className="bg-dark text-gray-300 py-6">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <GlobeAltIcon className="h-6 w-6 mr-2" /> Event Sphere
          </h3>
          <p className="text-sm">Connecting events, connecting people.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Discover</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cities</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Create</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Create Event</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Organizer FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Event Sphere. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
      </div>
    </div>
  </footer>

);

export default Footer;
