import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Bilingual, Lang } from '../config/wedding';
import { getContent, type Content } from './content';

interface LanguageState {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Pick the current-language string from a bilingual config value. */
  pick: (value: Bilingual) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);
const STORAGE_KEY = 'vk-wedding-lang';

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ta') return stored;
  } catch {
    /* storage unavailable (private mode) — fall back to English */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ta' : 'en')), []);

  const value = useMemo<LanguageState>(
    () => ({ lang, t: getContent(lang), setLang, toggle, pick: (v) => v[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
