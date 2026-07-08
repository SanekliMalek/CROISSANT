'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Adhesion, Activity, HomeHeroSettings, NewsItem, TeamMember } from '@/types';
import { activitiesApi, adhesionApi, adminApi, authApi, homeHeroApi, mediaApi, newsApi, teamApi } from '@/services/api';

const DEFAULT_HOME_HERO: HomeHeroSettings = {
  id: 'hero',
  badge: 'Établi à Gafsa',
  title: 'Mission Hiver Solidaire',
  location: 'Djebel el Ank, Gafsa',
  description:
    "Chaque hiver, l'Opération Chaleur Hivernale à Djebel el Ank apporte chaleur et réconfort aux familles isolées des montagnes de Gafsa. Grâce à votre générosité, nous distribuons des couvertures épaisses, des vêtements chauds, des chauffages et du matériel d'isolation thermique pour affronter les températures extrêmes.",
  image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=80',
};

export function useAdmin() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'adhesions' | 'activities' | 'news' | 'team'>('dashboard');

  const [adhesions, setAdhesions] = useState<Adhesion[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [homeHero, setHomeHero] = useState<HomeHeroSettings | null>(null);
  const [dbLoading, setDbLoading] = useState(false);

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Partial<Activity> | null>(null);

  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiHistory, setAiHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { 
      role: 'assistant', 
      content: "Bonjour Dr. Belkacem. Je suis votre assistant IA Gafsa. Je peux vous aider à rédiger des communiqués officiels, à planifier une caravane médicale pour Sened ou Redeyef, ou à faire correspondre les nouveaux candidats volontaires avec vos besoins logistiques !" 
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('crm-admin-token'));
  }, []);

  const fetchDbData = async () => {
    setDbLoading(true);
    try {
      const [adhRes, actRes, newsRes, teamRes, heroRes] = await Promise.all([
        adhesionApi.getAll(),
        activitiesApi.getAll(),
        newsApi.getAll(),
        teamApi.getAll(),
        homeHeroApi.get().catch(() => null)
      ]);
      setAdhesions(adhRes);
      setActivities(actRes);
      setNews(newsRes);
      setTeam(teamRes);
      setHomeHero(heroRes ?? DEFAULT_HOME_HERO);
    } catch (err) {
      console.error("Error loading admin database:", err);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDbData();
    }
  }, [token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const data = await authApi.login(username, password);

      if (data.success) {
        localStorage.setItem('crm-admin-token', data.token);
        setToken(data.token);
      } else {
        setAuthError('Identifiants de connexion invalides.');
      }
    } catch (err) {
      setAuthError('Serveur indisponible pour la connexion.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crm-admin-token');
    setToken(null);
  };

  const handleAdhesionStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await adhesionApi.updateStatus(id, status);
      setAdhesions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAdhesion = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette candidature volontaire ?')) return;
    try {
      await adhesionApi.remove(id);
      setAdhesions((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveActivity = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;

    const isEdit = !!editingActivity.id;

    try {
      if (isEdit) {
        const { id, ...payload } = editingActivity;
        await activitiesApi.update(id!, payload);
      } else {
        const { id, ...payload } = editingActivity;
        await activitiesApi.create(payload);
      }
      setShowActivityModal(false);
      setEditingActivity(null);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm("Supprimer définitivement cette campagne d'action ?")) return;
    try {
      await activitiesApi.remove(id);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNews = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    const isEdit = !!editingNews.id;

    try {
      if (isEdit) {
        const { id, ...payload } = editingNews;
        await newsApi.update(id!, payload);
      } else {
        const { id, ...payload } = editingNews;
        await newsApi.create(payload);
      }
      setShowNewsModal(false);
      setEditingNews(null);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Supprimer definitivement cette actualite ?')) return;
    try {
      await newsApi.remove(id);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMember = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    const isEdit = !!editingMember.id;

    try {
      if (isEdit) {
        const { id, ...payload } = editingMember;
        await teamApi.update(id!, payload);
      } else {
        const { id, ...payload } = editingMember;
        await teamApi.create(payload);
      }
      setShowTeamModal(false);
      setEditingMember(null);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Retirer ce membre de l'annuaire ?")) return;
    try {
      await teamApi.remove(id);
      fetchDbData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveHomeHero = async (e: FormEvent) => {
    e.preventDefault();
    if (!homeHero) return;

    try {
      const updated = await homeHeroApi.upsert(homeHero);
      setHomeHero(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadImage = async (file: File) => {
    return mediaApi.uploadImage(file);
  };

  const handleSendAiPrompt = async (e?: FormEvent, presetPrompt?: string) => {
    if (e) e.preventDefault();
    const activePrompt = presetPrompt || aiPrompt;
    if (!activePrompt.trim()) return;

    const newUserMessage = { role: 'user' as const, content: activePrompt };
    setAiHistory((prev) => [...prev, newUserMessage]);
    setAiPrompt('');
    setAiLoading(true);

    try {
      const data = await adminApi.assistant(activePrompt, aiHistory);
      if (data.success) {
        setAiHistory((prev) => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (err) {
      setAiHistory((prev) => [...prev, { role: 'assistant', content: "Désolé, l'assistant a rencontré une erreur réseau." }]);
    } finally {
      setAiLoading(false);
    }
  };

  return {
    token,
    username,
    setUsername,
    password,
    setPassword,
    authError,
    authLoading,
    handleLogin,
    handleLogout,
    activeTab,
    setActiveTab,
    adhesions,
    activities,
    news,
    team,
    homeHero,
    setHomeHero,
    handleAdhesionStatus,
    handleDeleteAdhesion,
    showActivityModal,
    setShowActivityModal,
    editingActivity,
    setEditingActivity,
    handleSaveActivity,
    handleDeleteActivity,
    showNewsModal,
    setShowNewsModal,
    editingNews,
    setEditingNews,
    handleSaveNews,
    handleDeleteNews,
    showTeamModal,
    setShowTeamModal,
    editingMember,
    setEditingMember,
    handleSaveMember,
    handleDeleteMember,
    handleSaveHomeHero,
    handleUploadImage,
    aiPrompt,
    setAiPrompt,
    aiHistory,
    aiLoading,
    handleSendAiPrompt
  };
}
