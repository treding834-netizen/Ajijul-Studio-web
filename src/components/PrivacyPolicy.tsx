import React from 'react';
import { ShieldCheck, Lock, Eye, Mail, User } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-16 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Ajijul AI</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Effective Date: November 12, 2026 | Developed by Md Ajijul Haque
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              1. Introduction & Commitment to Privacy
            </h2>
            <p>
              Welcome to <strong className="text-white">Ajijul AI</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how our Android application and web portal collect, use, and safeguard your information when you download our APK or interact with our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              2. Information We Collect
            </h2>
            <p>
              Ajijul AI is engineered with a privacy-first approach. We collect minimal information required to provide an exceptional AI experience:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-white">Interaction Data:</strong> Prompts, queries, and conversational inputs you provide to the AI assistant to generate responses.</li>
              <li><strong className="text-white">Device & Diagnostic Info:</strong> Basic device model and Android OS version to ensure optimal APK compatibility and performance.</li>
              <li><strong className="text-white">No Tracking:</strong> We do not track your location, personal contacts, or private media files.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              3. Data Security & Storage
            </h2>
            <p>
              All personal prompts and preferences are securely handled. We utilize industry-standard encryption protocols to protect data in transit between your Android device and our neural endpoints. We do not sell, trade, or rent your personal data to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              4. Developer & Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or the Ajijul AI application, please contact the developer directly:
            </p>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-white">
                <span className="text-slate-400">Developer:</span> Md Ajijul Haque
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Mail className="w-4 h-4" />
                <span>cybernexastudio@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
