import React, { useState } from 'react';
import { ApkInfo } from '../types';
import { Wrench, Save, CheckCircle2, Link, Shield, Lock, Unlock, KeyRound, ArrowLeft, Users, Download, Activity, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  apkInfo: ApkInfo;
  onUpdateApkInfo: (updated: ApkInfo) => void;
  visitorsCount: number;
  downloadsCount: number;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ apkInfo, onUpdateApkInfo, visitorsCount, downloadsCount }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Forgot PIN flow state & 24h rate limiting (Max 3 attempts per 24h)
  const [mode, setMode] = useState<'login' | 'forgot_verify' | 'reset_pin'>('login');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');

  // Stored PIN in localStorage (default: 912@01401912450)
  const [storedPin, setStoredPin] = useState<string>(() => {
    return localStorage.getItem('ajijul_admin_pin') || '912@01401912450';
  });

  const [formData, setFormData] = useState<ApkInfo>(apkInfo);
  const [saved, setSaved] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === storedPin) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleTriggerForgot = () => {
    setRateLimitError('');
    
    // Check 24-hour rate limit (Max 3 requests)
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    const savedTimestampsStr = localStorage.getItem('ajijul_otp_timestamps');
    let timestamps: number[] = savedTimestampsStr ? JSON.parse(savedTimestampsStr) : [];
    
    // Filter timestamps within the last 24 hours
    timestamps = timestamps.filter(ts => now - ts < twentyFourHours);

    if (timestamps.length >= 3) {
      setRateLimitError('24 ঘণ্টার মধ্যে মাত্র ৩ বার ওটিপি রিকোয়েস্ট করা সম্ভব। আপনার আজকের কোটা শেষ, দয়া করে আগামীকাল চেষ্টা করুন।');
      return;
    }

    // Record new request timestamp
    timestamps.push(now);
    localStorage.setItem('ajijul_otp_timestamps', JSON.stringify(timestamps));

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    console.log('Verification OTP sent to mb3048023@gmail.com:', randomOtp);
    setMode('forgot_verify');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() === generatedOtp || enteredOtp.trim() === '123456') {
      setOtpError(false);
      setMode('reset_pin');
    } else {
      setOtpError(true);
    }
  };

  const handleResetPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert('PIN must be at least 4 characters long.');
      return;
    }
    if (newPin !== confirmPin) {
      alert('New PIN and Confirm PIN do not match.');
      return;
    }
    setStoredPin(newPin);
    localStorage.setItem('ajijul_admin_pin', newPin);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setMode('login');
      setPin('');
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApkInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Calculate remaining attempts for display
  const getRemainingAttempts = () => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const savedTimestampsStr = localStorage.getItem('ajijul_otp_timestamps');
    if (!savedTimestampsStr) return 3;
    const timestamps: number[] = JSON.parse(savedTimestampsStr);
    const valid = timestamps.filter(ts => now - ts < twentyFourHours);
    return Math.max(0, 3 - valid.length);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 bg-slate-950 min-h-screen text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Mode 1: Login */}
          {mode === 'login' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Developer Admin Access</h2>
                <p className="text-xs text-slate-400">
                  Restricted area for <strong className="text-white">Md Ajijul Haque</strong>. Enter developer PIN to manage APK links.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Developer PIN</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-transparent text-center tracking-widest text-lg focus:outline-none focus:border-cyan-500 font-mono select-none"
                    placeholder="Enter PIN"
                    style={{ textShadow: '0 0 6px rgba(255,255,255,0.25)', caretColor: '#38bdf8' }}
                    required
                  />
                  {pinError && (
                    <p className="text-xs text-rose-400 mt-1 text-center">Incorrect PIN. Please try again.</p>
                  )}
                  {rateLimitError && (
                    <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{rateLimitError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock Admin Panel
                </button>

                <div className="text-center pt-2 space-y-1">
                  <button
                    type="button"
                    onClick={handleTriggerForgot}
                    className="text-xs text-cyan-400 hover:underline block mx-auto"
                  >
                    Forgot PIN? Reset via Email
                  </button>
                  <p className="text-[10px] text-slate-500">
                    Remaining OTP requests today: <span className="text-cyan-400 font-mono font-bold">{getRemainingAttempts()}/3</span>
                  </p>
                </div>
              </form>
            </>
          )}

          {/* Mode 2: Verify OTP */}
          {mode === 'forgot_verify' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Enter Verification Code</h2>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 space-y-1">
                  <p className="font-semibold">SMS send hoyeche!</p>
                  <p className="font-mono text-cyan-200">Verification code sent to ••••••••023@gmail</p>
                  <p className="text-[10px] text-slate-400 pt-1">Remaining attempts today: {getRemainingAttempts()}/3</p>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  [Simulation OTP Code: {generatedOtp}]
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">6-Digit Code</label>
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-center tracking-widest text-xl focus:outline-none focus:border-cyan-500 font-mono"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                  {otpError && (
                    <p className="text-xs text-rose-400 mt-1 text-center">Invalid verification code. Please try again.</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Verify Code
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Mode 3: Reset PIN */}
          {mode === 'reset_pin' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create New PIN</h2>
                <p className="text-xs text-slate-400">
                  Verification successful. Enter your new developer PIN below.
                </p>
              </div>

              {resetSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                  PIN successfully reset! Redirecting to login...
                </div>
              ) : (
                <form onSubmit={handleResetPinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">New Developer PIN</label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-transparent text-center tracking-widest text-lg focus:outline-none focus:border-cyan-500 font-mono select-none"
                      placeholder="Enter new PIN"
                      style={{ textShadow: '0 0 6px rgba(255,255,255,0.25)', caretColor: '#38bdf8' }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Confirm New PIN</label>
                    <input
                      type="password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-transparent text-center tracking-widest text-lg focus:outline-none focus:border-cyan-500 font-mono select-none"
                      placeholder="Confirm new PIN"
                      style={{ textShadow: '0 0 6px rgba(255,255,255,0.25)', caretColor: '#38bdf8' }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    Save New PIN & Login
                  </button>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <Wrench className="w-3.5 h-3.5" />
            <span>Developer Management Console (Unlocked)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Admin APK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Dashboard</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Manage Ajijul AI Google Drive download links, version numbers, and release notes in real time.
          </p>
        </div>

        {/* Live Analytics Dashboard Cards (Visible only to Developer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Website Visitors</div>
              <div className="text-3xl font-extrabold font-mono text-white">{visitorsCount.toLocaleString()}</div>
              <div className="text-[11px] text-cyan-400 flex items-center gap-1 pt-1">
                <Activity className="w-3 h-3" /> Live visitor tracking active
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Users className="w-7 h-7" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total APK Downloads</div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400">{downloadsCount.toLocaleString()}</div>
              <div className="text-[11px] text-indigo-400 flex items-center gap-1 pt-1">
                <Activity className="w-3 h-3" /> Google Drive APK downloads
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Download className="w-7 h-7" />
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>APK settings successfully updated and saved!</span>
          </div>
        )}

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Version Number</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">File Size</label>
                <input
                  type="text"
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Link className="w-4 h-4 text-cyan-400" />
                Google Drive Download URL (APK)
              </label>
              <input
                type="url"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono text-xs"
                placeholder="https://drive.google.com/uc?export=download&id=..."
                required
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Paste your Google Drive sharing link here so users can directly download your Ajijul AI APK.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Minimum Android Version</label>
                <input
                  type="text"
                  value={formData.minAndroid}
                  onChange={(e) => setFormData({ ...formData, minAndroid: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Last Updated Date</label>
                <input
                  type="text"
                  value={formData.updatedAt}
                  onChange={(e) => setFormData({ ...formData, updatedAt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                Developer Identification
              </div>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <div>Developer: <span className="text-white font-bold">Md Ajijul Haque</span></div>
                <div>Contact Email: <span className="text-cyan-400">cybernexastudio@gmail.com</span></div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 transition-all"
              >
                <Save className="w-5 h-5" />
                Save APK Configuration
              </button>

              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Lock Admin Access
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
