'use client';

import { PageId } from '@/types';

export function useLegal(pageId: 'conditions' | 'confidentialite' | 'mentions-legales') {
  const getPageTitle = () => {
    switch (pageId) {
      case 'conditions': return "Conditions Générales d'Utilisation";
      case 'confidentialite': return 'Politique de Confidentialité (Règlementation INPDP)';
      case 'mentions-legales': return 'Mentions Légales & Édition';
      default: return 'Règlementations';
    }
  };

  return { getPageTitle };
}
