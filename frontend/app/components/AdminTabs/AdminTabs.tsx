'use client';

import { ComponentType } from 'react';
import { LayoutDashboard, FileSpreadsheet, Activity as ActivityIcon, Users, LucideProps } from 'lucide-react';

interface AdminTabsProps {
  activeTab: 'dashboard' | 'adhesions' | 'activities' | 'news' | 'team';
  setActiveTab: (tab: 'dashboard' | 'adhesions' | 'activities' | 'news' | 'team') => void;
  adhesionsCount: number;
  activitiesCount: number;
  newsCount: number;
  teamCount: number;
}

export default function AdminTabs({
  activeTab,
  setActiveTab,
  adhesionsCount,
  activitiesCount,
  newsCount,
  teamCount,
}: AdminTabsProps) {
  const tabs: {
    id: AdminTabsProps['activeTab'];
    label: string;
    icon: ComponentType<LucideProps>;
    count?: number;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'adhesions', label: 'Adhesions', icon: FileSpreadsheet, count: adhesionsCount },
    { id: 'activities', label: 'Activities', icon: ActivityIcon, count: activitiesCount },
    { id: 'news', label: 'Actualities', icon: FileSpreadsheet, count: newsCount },
    { id: 'team', label: 'Team', icon: Users, count: teamCount },
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-900">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all border flex items-center gap-2 shrink-0 cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-br from-red-600 to-red-500 text-white border-red-500 shadow-md shadow-red-500/10'
                : 'bg-stone-900/40 text-stone-400 border-stone-800 hover:text-white hover:bg-stone-850'
            }`}
          >
            <TabIcon size={14} />
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                isSelected ? 'bg-white text-red-700' : 'bg-stone-800 text-stone-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
