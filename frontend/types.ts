/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Adhesion {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  profession: string;
  interests: string[];
  preferredSlots: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  date: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  status: 'active' | 'completed' | 'draft';
  details: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'board' | 'coordination' | 'field' | 'medical';
  avatar: string;
  phone?: string;
  email?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  views: number;
}

export interface HomeHeroSettings {
  id: string;
  badge: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export type PageId =
  | 'home'
  | 'activities'
  | 'adhesion'
  | 'team'
  | 'news'
  | 'conditions'
  | 'confidentialite'
  | 'mentions-legales'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-adhesions'
  | 'admin-activities'
  | 'admin-team';
