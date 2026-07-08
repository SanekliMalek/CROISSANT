/**
 * Central API service layer.
 * Containers import from this file and never call fetch directly.
 */

import type { Activity, Adhesion, HomeHeroSettings, NewsItem, TeamMember } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';
const API_ORIGIN = API_BASE.replace(/\/api$/, '');

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'Request failed');
  }

  return res.json() as Promise<T>;
}

async function uploadRequest<T>(path: string, body: FormData): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    body,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'Upload failed');
  }

  return res.json() as Promise<T>;
}

export const authApi = {
  login: (username: string, password: string) =>
    request<{ success: boolean; token: string; user: { username: string; name: string; role: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ username, password }) },
    ),
};

export const adminApi = {
  assistant: (prompt: string, history: { role: string; content: string }[]) =>
    request<{ success: boolean; text: string }>(
      '/admin/assistant',
      { method: 'POST', body: JSON.stringify({ prompt, history }) },
    ),
};

export const mediaApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const data = await uploadRequest<{ success: boolean; url: string }>('/media/image', formData);
    return data.url.startsWith('http') ? data.url : `${API_ORIGIN}${data.url}`;
  },
};

export const activitiesApi = {
  getAll: () => request<Activity[]>('/activities'),
  getOne: (id: string) => request<Activity>(`/activities/${id}`),
  create: (data: Partial<Activity>) =>
    request<Activity>('/activities', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Activity>) =>
    request<Activity>(`/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request<{ success: boolean; message?: string }>(`/activities/${id}`, { method: 'DELETE' }),
};

export const adhesionApi = {
  getAll: () => request<Adhesion[]>('/adhesion'),
  create: (data: Omit<Adhesion, 'id' | 'status' | 'createdAt'>) =>
    request<{ success: boolean; data: Adhesion; message?: string }>(
      '/adhesion',
      { method: 'POST', body: JSON.stringify(data) },
    ),
  updateStatus: (id: string, status: Adhesion['status']) =>
    request<{ success: boolean; data: Adhesion }>(
      `/adhesion/${id}/status`,
      { method: 'PATCH', body: JSON.stringify({ status }) },
    ),
  remove: (id: string) => request<{ success: boolean; message?: string }>(`/adhesion/${id}`, { method: 'DELETE' }),
};

export const teamApi = {
  getAll: () => request<TeamMember[]>('/team'),
  getOne: (id: string) => request<TeamMember>(`/team/${id}`),
  create: (data: Partial<TeamMember>) =>
    request<TeamMember>('/team', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<TeamMember>) =>
    request<TeamMember>(`/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request<{ success: boolean; message?: string }>(`/team/${id}`, { method: 'DELETE' }),
};

export const newsApi = {
  getAll: () => request<NewsItem[]>('/news'),
  getOne: (id: string) => request<NewsItem>(`/news/${id}`),
  create: (data: Partial<NewsItem>) =>
    request<NewsItem>('/news', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<NewsItem>) =>
    request<NewsItem>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request<{ success: boolean; message?: string }>(`/news/${id}`, { method: 'DELETE' }),
};

export const homeHeroApi = {
  get: () => request<HomeHeroSettings | null>('/home-hero'),
  upsert: (data: HomeHeroSettings) =>
    request<HomeHeroSettings>('/home-hero', { method: 'PUT', body: JSON.stringify(data) }),
};
