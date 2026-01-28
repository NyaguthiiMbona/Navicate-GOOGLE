
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">NAV</span>ICATE
          </Link>
          <div className="flex gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${location.pathname === '/' ? 'text-[#D4AF37]' : 'text-slate-400'}`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${location.pathname === '/explore' ? 'text-[#D4AF37]' : 'text-slate-400'}`}
            >
              Explore
            </Link>
            <Link 
              to="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${location.pathname === '/pricing' ? 'text-[#D4AF37]' : 'text-slate-400'}`}
            >
              Pricing
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-slate-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl font-bold mb-4">
            <span className="text-[#D4AF37]">NAV</span>ICATE
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Practical career navigation for professionals preparing for tech and remote roles.
          </p>
          <div className="mt-8 pt-8 border-t border-slate-900 text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Navicate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
