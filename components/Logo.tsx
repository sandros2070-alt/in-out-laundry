import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  to?: string;
  src?: string; // optional image source
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = "", to, src, alt }) => {
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-white';
  const subTextColor = variant === 'dark' ? 'text-gray-600' : 'text-blue-200';
  const borderColor = variant === 'dark' ? 'border-gray-900' : 'border-white';

  const graphic = src ? (
    <img src={src} alt={alt ?? 'In & Out laundry'} className="w-10 h-10 object-contain" />
  ) : (
    <>
      <div className="absolute inset-0 bg-purple-700 rounded-tr-xl rounded-bl-xl transform rotate-3 scale-110 opacity-90"></div>
      <div className={`absolute inset-0 bg-white border-2 ${borderColor} rounded-lg flex items-center justify-center z-10 shadow-sm`}>
         <span className="font-serif font-black text-5xl italic text-black leading-none pt-1" style={{ fontFamily: 'Times New Roman, serif' }}>&</span>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full z-20 border-2 border-white"></div>
    </>
  );

  const inner = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Graphic */}
      <div className="relative w-10 h-10 flex-shrink-0">
        {graphic}
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <h1 className={`font-black text-xl leading-none tracking-tight ${textColor}`}>
          In & Out laundry
        </h1>
        <div className="flex items-center justify-between w-full gap-2">
          <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${subTextColor}`}></span>
          <span className={`text-[1.4rem] font-medium ${subTextColor}`} style={{ fontFamily: 'serif' }}>
            مصبغة ان ند اوت
          </span>
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block" aria-label="Go to homepage">
        {inner}
      </Link>
    );
  }

  return inner;
};
