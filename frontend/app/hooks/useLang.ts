'use client';

import { useState } from 'react';
import { Lang } from '@/data/translations';

export function useLang(initial: Lang = 'FR') {
  const [lang, setLang] = useState<Lang>(initial);
  return { lang, setLang };
}
