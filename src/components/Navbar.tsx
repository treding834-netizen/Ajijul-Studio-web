import React from 'react';
import { ActiveTab } from '../types';
import { Download, Sparkles, ShieldCheck, MessageSquare, Wrench, Home } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  downloadUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, downloadUrl }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Ajijul AI
            </span>
            <span className="block text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
              Neural Assistant
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          
          <button
            onClick={() => setActiveTab('download')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'download'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            APK Download
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'features'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Features
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Reviews
          </button>
        </nav>

        {/* Zone 3: Primary Action & Admin Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('admin')}
            title="Admin / Developer Settings"
            className={`p-2.5 rounded-xl border transition-all ${
              activeTab === 'admin'
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
          </button>

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            Get APK Now
          </a>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900/90 border-t border-slate-800 px-2 py-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium ${activeTab === 'home' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <button
          onClick={() => setActiveTab('download')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium ${activeTab === 'download' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium ${activeTab === 'features' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <Sparkles className="w-4 h-4" />
          Features
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium ${activeTab === 'privacy' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <ShieldCheck className="w-4 h-4" />
          Privacy
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium ${activeTab === 'admin' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <Wrench className="w-4 h-4" />
          Admin
        </button>
      </div>
    </header>
  );
};
