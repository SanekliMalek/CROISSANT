'use client';

import { motion } from 'motion/react';
import { Activity, NewsItem, PageId, TeamMember } from '@/types';
import AdminActivityModal from '@/components/AdminActivityModal';
import AdminActivitiesView from '@/components/AdminActivitiesView';
import AdminAdhesionsView from '@/components/AdminAdhesionsView';
import AdminDashboardView from '@/components/AdminDashboardView';
import AdminHeader from '@/components/AdminHeader';
import AdminLoginPanel from '@/components/AdminLoginPanel';
import AdminTabs from '@/components/AdminTabs';
import AdminNewsModal from '@/components/AdminNewsModal';
import AdminNewsView from '@/components/AdminNewsView';
import AdminTeamModal from '@/components/AdminTeamModal';
import AdminTeamView from '@/components/AdminTeamView';
import { useAdmin } from './useAdmin';

interface AdminContainerProps {
  onPageChange: (page: PageId) => void;
}

const defaultActivity: Partial<Activity> = {
  title: '',
  description: '',
  category: 'Sante et Prevention',
  image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1200',
  ],
  date: new Date().toISOString().split('T')[0],
  location: 'Gafsa',
  targetAmount: 10000,
  raisedAmount: 0,
  beneficiaries: 100,
  status: 'active',
  details: '',
};

const defaultMember: Partial<TeamMember> = {
  name: '',
  role: '',
  category: 'field',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  email: '',
  phone: '',
};

const defaultNews: Partial<NewsItem> = {
  title: '',
  summary: '',
  content: '',
  date: new Date().toISOString().split('T')[0],
  image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
  views: 0,
};

export default function AdminContainer({ onPageChange }: AdminContainerProps) {
  const admin = useAdmin();

  if (!admin.token) {
    return (
      <AdminLoginPanel
        username={admin.username}
        setUsername={admin.setUsername}
        password={admin.password}
        setPassword={admin.setPassword}
        authError={admin.authError}
        authLoading={admin.authLoading}
        handleLogin={admin.handleLogin}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-[#0a0807] text-stone-200 pt-24 pb-12 relative overflow-hidden dark-theme"
    >
      <div className="absolute w-96 h-96 rounded-full bg-red-950/15 top-20 right-10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-6 relative z-10">
        <AdminHeader onPageChange={onPageChange} handleLogout={admin.handleLogout} />

        <AdminTabs
          activeTab={admin.activeTab}
          setActiveTab={admin.setActiveTab}
          adhesionsCount={admin.adhesions.length}
          activitiesCount={admin.activities.length}
          newsCount={admin.news.length}
          teamCount={admin.team.length}
        />

        {admin.activeTab === 'dashboard' && (
          <AdminDashboardView
            adhesions={admin.adhesions}
            activities={admin.activities}
            news={admin.news}
            team={admin.team}
            homeHero={admin.homeHero}
            setHomeHero={admin.setHomeHero}
            onUploadImage={admin.handleUploadImage}
            aiPrompt={admin.aiPrompt}
            setAiPrompt={admin.setAiPrompt}
            aiHistory={admin.aiHistory}
            aiLoading={admin.aiLoading}
            handleSendAiPrompt={admin.handleSendAiPrompt}
            handleSaveHomeHero={admin.handleSaveHomeHero}
          />
        )}

        {admin.activeTab === 'adhesions' && (
          <AdminAdhesionsView
            adhesions={admin.adhesions}
            handleAdhesionStatus={admin.handleAdhesionStatus}
            handleDeleteAdhesion={admin.handleDeleteAdhesion}
          />
        )}

        {admin.activeTab === 'activities' && (
          <AdminActivitiesView
            activities={admin.activities}
            onAddActivity={() => {
              admin.setEditingActivity(defaultActivity);
              admin.setShowActivityModal(true);
            }}
            onEditActivity={(activity) => {
              admin.setEditingActivity(activity);
              admin.setShowActivityModal(true);
            }}
            onDeleteActivity={admin.handleDeleteActivity}
          />
        )}

        {admin.activeTab === 'news' && (
          <AdminNewsView
            news={admin.news}
            onAddNews={() => {
              admin.setEditingNews(defaultNews);
              admin.setShowNewsModal(true);
            }}
            onEditNews={(item) => {
              admin.setEditingNews(item);
              admin.setShowNewsModal(true);
            }}
            onDeleteNews={admin.handleDeleteNews}
          />
        )}

        {admin.activeTab === 'team' && (
          <AdminTeamView
            team={admin.team}
            onAddMember={() => {
              admin.setEditingMember(defaultMember);
              admin.setShowTeamModal(true);
            }}
            onEditMember={(member) => {
              admin.setEditingMember(member);
              admin.setShowTeamModal(true);
            }}
            onDeleteMember={admin.handleDeleteMember}
          />
        )}
      </div>

      {admin.showActivityModal && admin.editingActivity && (
        <AdminActivityModal
          activity={admin.editingActivity}
          setActivity={admin.setEditingActivity}
          onUploadImage={admin.handleUploadImage}
          onClose={() => admin.setShowActivityModal(false)}
          onSubmit={admin.handleSaveActivity}
        />
      )}

      {admin.showNewsModal && admin.editingNews && (
        <AdminNewsModal
          news={admin.editingNews}
          setNews={admin.setEditingNews}
          onUploadImage={admin.handleUploadImage}
          onClose={() => admin.setShowNewsModal(false)}
          onSubmit={admin.handleSaveNews}
        />
      )}

      {admin.showTeamModal && admin.editingMember && (
        <AdminTeamModal
          member={admin.editingMember}
          setMember={admin.setEditingMember}
          onUploadImage={admin.handleUploadImage}
          onClose={() => admin.setShowTeamModal(false)}
          onSubmit={admin.handleSaveMember}
        />
      )}
    </motion.div>
  );
}
