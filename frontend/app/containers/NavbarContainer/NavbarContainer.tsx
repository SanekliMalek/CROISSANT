'use client';

import { Menu, X } from 'lucide-react';
import { PageId } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';
import { useNavbar } from './useNavbar';

import NavLogo from '@/components/NavLogo';
import NavLinks from '@/components/NavLinks';
import LangSwitcher from '@/components/LangSwitcher';
import JoinButton from '@/components/JoinButton';
import MobileDrawer from '@/components/MobileDrawer';

interface NavbarContainerProps {
  currentPage: PageId;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onPageChange?: (page: PageId) => void;
}

export default function NavbarContainer({ currentPage, lang, onLangChange, onPageChange }: NavbarContainerProps) {
  const { isOpen, setIsOpen, handleLinkClick } = useNavbar(onPageChange);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'AR';

  const links = [
    { id: 'home', label: t.navHome },
    { id: 'activities', label: t.navActivities },
    { id: 'team', label: t.navTeam },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 py-3 md:px-8">
      <nav 
        className="max-w-7xl mx-auto glass rounded-2xl px-5 sm:px-8 py-3.5 flex items-center justify-between border-stone-200/50 shadow-md relative"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <NavLogo lang={lang} onClick={() => handleLinkClick('home')} />

        <NavLinks 
          links={links} 
          currentPage={currentPage} 
          isRTL={isRTL} 
          onLinkClick={handleLinkClick} 
        />

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <LangSwitcher lang={lang} isRTL={isRTL} onLangChange={onLangChange} />
          <JoinButton lang={lang} onClick={() => handleLinkClick('adhesion')} />
        </div>

        <div className="md:hidden flex items-center gap-1.5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-stone-600 hover:text-stone-950 focus:outline-none cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <MobileDrawer 
        isOpen={isOpen}
        links={links}
        currentPage={currentPage}
        lang={lang}
        isRTL={isRTL}
        onLinkClick={handleLinkClick}
        onJoinClick={() => handleLinkClick('adhesion')}
      />
    </header>
  );
}
