import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-serif text-ink selection:bg-academic-blue selection:text-white">
      {/* Sidebar / Header */}
      <aside className="w-full md:w-64 bg-academic-surface border-b md:border-b-0 md:border-r border-academic-border p-8 flex flex-col justify-between md:h-screen md:sticky md:top-0">
        <div>
          <Link to="/" className="block group">
            <h1 className="text-xl font-semibold tracking-tight group-hover:text-academic-blue transition-colors text-white">
              Tilak Kadlaskar
            </h1>
            <p className="text-sm text-gray-400 font-mono mt-1">Blogs</p>
          </Link>

          <nav className="mt-12 space-y-4 font-mono text-sm">
            <Link 
              to="/" 
              className={`block hover:text-white transition-colors ${location.pathname === '/' ? 'text-academic-blue font-semibold' : 'text-gray-500'}`}
            >
              /index
            </Link>
            <a 
              href="https://tilakkadlaskar.tech" 
              className="block hover:text-white transition-colors text-gray-500"
            >
              /portfolio
            </a>
            <a 
              href="https://github.com/tilak-kadlaskar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:text-white transition-colors text-gray-500"
            >
              /github
            </a>
          </nav>
        </div>

        <div className="hidden md:block">
          <p className="text-xs text-gray-600 font-mono">
            &copy; {new Date().getFullYear()} <br/>
            Engineering Concepts.<br/>
            Tech Stories.<br/>

          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-paper">
        <div className="max-w-3xl mx-auto p-6 md:p-16">
          {children}
        </div>
      </main>
    </div>
  );
};