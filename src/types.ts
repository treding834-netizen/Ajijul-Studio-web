export interface ApkInfo {
  version: string;
  buildNumber: string;
  fileSize: string;
  minAndroid: string;
  updatedAt: string;
  downloadUrl: string;
  downloadsCount: number;
  changelog: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  device?: string;
}

export type ActiveTab = 'home' | 'download' | 'features' | 'privacy' | 'reviews' | 'admin';
