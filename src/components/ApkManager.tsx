import React, { useState } from 'react';
import { ApkInfo } from '../types';
import { Download, QrCode, ShieldCheck, Smartphone, CheckCircle2, AlertCircle, ExternalLink, Edit3, Save } from 'lucide-react';

interface ApkManagerProps {
  apkInfo: ApkInfo;
  onUpdateApkInfo: (updated: ApkInfo) => void;
  onRecordDownload: () => void;
}

export const ApkManager: React.FC<ApkManagerProps> = ({ apkInfo, onUpdateApkInfo, onRecordDownload }) => {
  const [showQr, setShowQr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ApkInfo>(apkInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApkInfo(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="py-16 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <Download className="w-3.5 h-3.5" />
            <span>Official Release Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Ajijul AI APK</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Get the latest secure build directly hosted via Google Drive. Developed with precision by Md Ajijul Haque.
          </p>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>APK configuration and Google Drive link successfully updated!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Download Card */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Ajijul AI Android App
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                      v{apkInfo.version}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Package Name: <code className="text-cyan-400 font-mono">com.cybernexastudio.ajijulai</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditing ? 'Cancel Edit' : 'Edit APK Details'}
              </button>
            </div>

            {/* Edit Form if enabled */}
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Update Google Drive Link & Version</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Version Number</label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">File Size</label>
                    <input
                      type="text"
                      value={formData.fileSize}
                      onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Google Drive Download Link</label>
                  <input
                    type="url"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono text-xs"
                    placeholder="https://drive.google.com/uc?export=download&id=..."
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Provide direct Google Drive sharing link or direct download link.</p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : null}

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">File Size</div>
                <div className="text-base font-bold font-mono text-white">{apkInfo.fileSize}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Min Android</div>
                <div className="text-base font-bold font-mono text-white">{apkInfo.minAndroid}+</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Last Updated</div>
                <div className="text-base font-bold font-mono text-white">{apkInfo.updatedAt}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">Downloads</div>
                <div className="text-base font-bold font-mono text-cyan-400">{(apkInfo.downloadsCount).toLocaleString()}</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a
                href={apkInfo.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onRecordDownload}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                Download from Google Drive
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </a>

              <button
                onClick={() => setShowQr(!showQr)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
              >
                <QrCode className="w-5 h-5 text-cyan-400" />
                {showQr ? 'Hide QR Code' : 'Scan QR Code'}
              </button>
            </div>

            {/* QR Code Modal / Box */}
            {showQr && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
                <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-lg flex items-center justify-center shrink-0">
                  <div className="w-full h-full grid grid-cols-6 gap-1 bg-slate-900 p-1.5 rounded-lg">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                            ? 'bg-cyan-400'
                            : 'bg-white'
                        } rounded-[2px]`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-white">Scan with your phone camera</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Point your Android phone camera or QR scanner app directly at this code to instantly open the Google Drive download link and install Ajijul AI.
                  </p>
                  <p className="text-[11px] font-mono text-cyan-400 truncate max-w-sm">
                    {apkInfo.downloadUrl}
                  </p>
                </div>
              </div>
            )}

            {/* Changelog */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">What's New in v{apkInfo.version}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {apkInfo.changelog.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar Instructions */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                How to Install APK
              </h4>

              <ol className="space-y-4 text-xs text-slate-300">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-white block mb-0.5">Download APK</strong>
                    Click the download button above to get the APK file from Google Drive.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-white block mb-0.5">Enable Unknown Sources</strong>
                    If prompted, go to Settings &gt; Security and allow installation from Unknown Sources.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-white block mb-0.5">Install & Open</strong>
                    Tap the downloaded APK file in your notification bar and complete the installation.
                  </div>
                </li>
              </ol>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Ajijul AI is 100% virus-free and securely signed. Developed by Md Ajijul Haque.
                </span>
              </div>
            </div>

            {/* Developer Contact Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Developer Support</h4>
              <p className="text-xs text-slate-400">
                Need help with installation or have feature requests? Reach out directly to the developer studio.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-400">
                <div>Md Ajijul Haque</div>
                <div className="text-slate-400">cybernexastudio@gmail.com</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
