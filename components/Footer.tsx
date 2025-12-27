import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo variant="light" to="/" src="/logo.png" alt="In & Out Laundry" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional laundry and dry cleaning services delivered to your doorstep. Fast, clean, and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="hover:text-blue-400 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>Mussafah M2, Abu Dhabi,<br />Abu Dhabi, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>+971 25864164</span>
              </li>
               <li className="flex items-center gap-3">
                 <a href="https://wa.me/97125864164" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-400 transition-colors">
                    <MessageCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>WhatsApp Us</span>
                 </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>hello@inandout.ae</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/InAndOutUae#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/inandoutuae" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/inandoutuae" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
                <Link to="/admin" className="text-xs text-slate-600 hover:text-slate-400">Admin Login</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} In & Out Laundry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
