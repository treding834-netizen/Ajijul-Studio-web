/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, ApkInfo, Review } from './types';
import { Navbar } from './components/Navbar';
import { Hero3DScene } from './components/Hero3DScene';
import { ApkManager } from './components/ApkManager';
import { Features } from './components/Features';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Reviews } from './components/Reviews';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

const INITIAL_APK_INFO: ApkInfo = {
  version: '2.4.0',
  buildNumber: '20261112',
  fileSize: '48.5 MB',
  minAndroid: '8.0',
  updatedAt: 'November 2026',
  downloadUrl: 'https://drive.google.com/uc?export=download&id=1SAMPLE_GOOGLE_DRIVE_APK_ID',
  downloadsCount: 1420,
  changelog: [
    'Integrated advanced neural processing engine for instantaneous responses',
    'Enhanced voice assistant accuracy and multi-language support',
    'Optimized battery consumption and dark mode rendering',
    'Fixed minor bugs and improved offline stability',
  ],
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Tanvir Rahman',
    rating: 5,
    comment: 'Ajijul AI is incredible! The responses are lightning fast and the 3D interface is gorgeous. Best AI APK ever made by Md Ajijul Haque!',
    date: 'Nov 10, 2026',
    device: 'Samsung Galaxy S23',
  },
  {
    id: '2',
    name: 'Sultana Jasmine',
    rating: 5,
    comment: 'Super easy to download from Google Drive link. The voice assistant feature works smoothly even on slow networks.',
    date: 'Nov 8, 2026',
    device: 'Xiaomi Redmi Note 12',
  },
  {
    id: '3',
    name: 'Arman Hossain',
    rating: 5,
    comment: 'Clean privacy policy and professional support at cybernexastudio@gmail.com. Highly recommended!',
    date: 'Nov 5, 2026',
    device: 'OnePlus Nord',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  
  const [apkInfo, setApkInfo] = useState<ApkInfo>(() => {
    const saved = localStorage.getItem('ajijul_ai_apk_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APK_INFO;
      }
    }
    return INITIAL_APK_INFO;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ajijul_ai_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  // Analytics state: Visitors & Downloads
  const [visitorsCount, setVisitorsCount] = useState<number>(() => {
    const saved = localStorage.getItem('ajijul_ai_visitors');
    return saved ? parseInt(saved, 10) : 3480;
  });

  const [downloadsCount, setDownloadsCount] = useState<number>(() => {
    const saved = localStorage.getItem('ajijul_ai_downloads_tracker');
    return saved ? parseInt(saved, 10) : 1420;
  });

  useEffect(() => {
    // Track unique session visit
    const hasVisited = sessionStorage.getItem('ajijul_session_visited');
    if (!hasVisited) {
      sessionStorage.setItem('ajijul_session_visited', 'true');
      const newVisitors = visitorsCount + 1;
      setVisitorsCount(newVisitors);
      localStorage.setItem('ajijul_ai_visitors', newVisitors.toString());
    }
  }, [visitorsCount]);

  useEffect(() => {
    localStorage.setItem('ajijul_ai_apk_info', JSON.stringify(apkInfo));
  }, [apkInfo]);

  useEffect(() => {
    localStorage.setItem('ajijul_ai_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleUpdateApkInfo = (updated: ApkInfo) => {
    setApkInfo(updated);
  };

  const handleAddReview = (newRev: Review) => {
    setReviews([newRev, ...reviews]);
  };

  const handleRecordDownload = () => {
    const newDownloads = downloadsCount + 1;
    setDownloadsCount(newDownloads);
    localStorage.setItem('ajijul_ai_downloads_tracker', newDownloads.toString());
    
    // Also update apkInfo downloadsCount
    const updatedApk = { ...apkInfo, downloadsCount: newDownloads };
    setApkInfo(updatedApk);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        downloadUrl={apkInfo.downloadUrl}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <Hero3DScene
              apkInfo={apkInfo}
              onNavigateToDownload={() => setActiveTab('download')}
              onNavigateToFeatures={() => setActiveTab('features')}
              onRecordDownload={handleRecordDownload}
            />
            <div className="border-t border-slate-900">
              <Features />
            </div>
            <div className="border-t border-slate-900">
              <ApkManager
                apkInfo={apkInfo}
                onUpdateApkInfo={handleUpdateApkInfo}
                onRecordDownload={handleRecordDownload}
              />
            </div>
          </div>
        )}

        {activeTab === 'download' && (
          <ApkManager
            apkInfo={apkInfo}
            onUpdateApkInfo={handleUpdateApkInfo}
            onRecordDownload={handleRecordDownload}
          />
        )}

        {activeTab === 'features' && <Features />}

        {activeTab === 'privacy' && <PrivacyPolicy />}

        {activeTab === 'reviews' && (
          <Reviews
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            apkInfo={apkInfo}
            onUpdateApkInfo={handleUpdateApkInfo}
            visitorsCount={visitorsCount}
            downloadsCount={downloadsCount}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
