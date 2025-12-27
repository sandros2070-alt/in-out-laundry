import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.pricing, path: '/pricing' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20"> 
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo variant="dark" src="/logo.png" alt="In & Out Laundry" className="w-auto" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                <Globe className="h-4 w-4" />
                <span className="uppercase text-sm font-bold">{language}</span>
              </button>
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1 w-24 bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden hidden group-hover:block z-50">
                <button onClick={() => setLanguage('en')} className={`block w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 ${language === 'en' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>English</button>
                <button onClick={() => setLanguage('ar')} className={`block w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 ${language === 'ar' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>العربية</button>
                <button onClick={() => setLanguage('ur')} className={`block w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 ${language === 'ur' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>اردو</button>
              </div>
            </div>

            <Link
              to="/booking"
              className="ml-4 rtl:ml-0 rtl:mr-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              {t.nav.book}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             {/* Mobile Language Switcher (Simple Toggle) */}
             <button 
               onClick={() => setLanguage(language === 'en' ? 'ar' : language === 'ar' ? 'ur' : 'en')}
               className="text-gray-600 font-bold uppercase text-sm border border-gray-200 px-2 py-1 rounded"
             >
               {language}
             </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-4 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {t.nav.book}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
