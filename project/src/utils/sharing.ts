import { wedding } from '../config/wedding';
import { getContent } from '../i18n/content';
import type { Lang } from '../config/wedding';

export function getSiteUrl(): string {
  const configured = wedding.siteUrl.trim();
  if (configured) return configured;
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
}

export function getShareMessage(lang: Lang): string {
  const t = getContent(lang);
  const names =
    lang === 'ta'
      ? `${wedding.groom.fullName.ta} – ${wedding.bride.fullName.ta}`
      : `${wedding.groom.fullName.en} & ${wedding.bride.fullName.en}`;
  return t.share.text(names, wedding.dateRangeLabel[lang], `${wedding.venue.name[lang]}, ${wedding.venue.shortAddress[lang]}`);
}

export function whatsappUrl(text: string, phone = ''): string {
  const base = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

export type ShareResult = 'shared' | 'whatsapp' | 'cancelled';

/** Web Share API where supported (mobile), WhatsApp fallback elsewhere. */
export async function shareInvitation(lang: Lang): Promise<ShareResult> {
  const url = getSiteUrl();
  const text = getShareMessage(lang);
  const title = `${wedding.groom.shortName.en} & ${wedding.bride.shortName.en} | Wedding Invitation`;
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
      // fall through to WhatsApp
    }
  }
  window.open(whatsappUrl(`${text}\n\n${url}`), '_blank', 'noopener,noreferrer');
  return 'whatsapp';
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall back below */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
