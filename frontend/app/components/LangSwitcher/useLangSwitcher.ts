'use client';

import { useState, useEffect, RefObject } from 'react';

export function useLangSwitcher(ref: RefObject<HTMLDivElement | null>) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return { isOpen, setIsOpen };
}
