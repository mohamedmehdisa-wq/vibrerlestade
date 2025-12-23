
import React from 'react';
import { AppSection } from '../types';
import { CAF_COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate }) => {
  const navItems = [
    { 
      id: AppSection.HOME, 
      label: 'Home', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: AppSection.HUB, 
      label: 'Hub', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      id: AppSection.MATCHES, 
      label: 'Matchs', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: AppSection.ADMIN, 
      label: 'Staff', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#2D2D2D] flex flex-col font-['Outfit']">
      <div className="flex-1 max-w-md mx-auto w-full pb-28">
        {children}
      </div>
      
      <nav 
        className="fixed bottom-0 left-0 right-0 py-5 px-8 flex justify-between items-center z-[120] shadow-[0_-10px_40px_rgba(123,22,29,0.15)] rounded-t-[3rem] border-t border-white/5"
        style={{ backgroundColor: CAF_COLORS.maroon }}
      >
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeSection === item.id ? 'text-white scale-110' : 'text-white/40'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            {activeSection === item.id && (
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
