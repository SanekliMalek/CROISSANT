'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PageId } from '@/types';

export function useNavbar(onPageChange?: (page: PageId) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = useCallback((pageId: PageId) => {
    if (onPageChange) {
      onPageChange(pageId);
    } else {
      const path = pageId === 'home' ? '/' : `/${pageId}`;
      router.push(path);
    }
    setIsOpen(false);
  }, [onPageChange, router]);

  return { isOpen, setIsOpen, handleLinkClick };
}
