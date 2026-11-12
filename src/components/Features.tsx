import React from 'react';
import { Cpu, Zap, Mic, Shield, Smartphone, Globe, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "Advanced Neural Engine",
      description: "Powered by state-of-the-art language models optimized for ultra-fast on-device reasoning and complex problem solving.",
    },
    {
      icon: <Mic className="w-6 h-6 text-indigo-400" />,
      title: "Voice & Audio Assistant",
      description: "Interact naturally with voice commands. High-accuracy speech recognition and fluid conversational responses.",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Blazing Fast Performance",
      description: "Engineered with lightweight compiled binaries ensuring zero lag and instantaneous response times on Android.",
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: "Enterprise Security & Privacy",
      description: "Your data stays private. Encrypted local storage and zero telemetry tracking designed by Md Ajijul Haque.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-amber-400" />,
      title: "Optimized for Android",
      description: "Seamlessly integrates with Android system notifications, floating widgets, and dark mode themes.",
    },
    {
      icon: <Globe className="w-6 h-6 text-rose-400" />,
      title: "Multi-Language Support",
      description: "Communicate fluently in multiple languages with instant translation and contextual awareness.",
    },
  ];

  return (
    <div className="py-16 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cutting-Edge Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Ajijul AI</span>?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Discover the powerful features built into the Ajijul AI Android application.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
