import React from 'react';
import { Sparkles, Mail, User, Heart } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Ajijul AI</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Official 3D web portal for Ajijul AI Android APK. High performance neural intelligence designed and built with passion.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('download')} className="hover:text-cyan-400 transition-colors">APK Download</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('features')} className="hover:text-cyan-400 transition-colors">Features</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
              </li>
            </ul>
          </div>

          {/* Developer Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Developer & Contact</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Developer: Md Ajijul Haque</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Mail className="w-4 h-4" />
                <span>cybernexastudio@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Ajijul AI. All rights reserved. Developed by Md Ajijul Haque.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Android Users</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
