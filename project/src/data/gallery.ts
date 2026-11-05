/**
 * Gallery photos. To add more wedding photos later:
 *   1. Put a small (~720px wide) and a large (~1400–1600px) WebP/JPEG version
 *      in `public/assets/gallery/`.
 *   2. Add an entry below with the real pixel width/height of the large file
 *      (used to reserve space and avoid layout jumps).
 * Only use genuine photographs supplied by the family.
 */
import type { Bilingual } from '../config/wedding';

export interface GalleryImage {
  id: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
  alt: string;
  caption: Bilingual;
  /** Optional temple-arch frame for portrait photos. */
  arch?: boolean;
}

export const gallery: GalleryImage[] = [
  {
    id: 'namaste',
    arch: true,
    thumb: 'assets/gallery/couple-namaste-720.webp',
    full: 'assets/gallery/couple-namaste-1400.webp',
    width: 1400,
    height: 2100,
    alt: 'Kreethika in a pink silk saree and Vignesh in an ivory sherwani, greeting with folded hands',
    caption: { en: 'With folded hands, we welcome you', ta: 'கூப்பிய கரங்களுடன் வரவேற்கிறோம்' },
  },
  {
    id: 'temple',
    thumb: 'assets/gallery/couple-temple-540.webp',
    full: 'assets/gallery/couple-temple-1080.webp',
    width: 1080,
    height: 1920,
    alt: 'Invitation artwork of the couple in front of a temple gopuram',
    caption: { en: 'Thirumana Azhaippithazh', ta: 'திருமண அழைப்பிதழ்' },
  },
  {
    id: 'family',
    thumb: 'assets/gallery/couple-with-family-720.webp',
    full: 'assets/gallery/couple-with-family-1400.webp',
    width: 1400,
    height: 933,
    alt: 'The couple wearing garlands, standing with family elders',
    caption: { en: 'Blessed by our families', ta: 'குடும்பத்தினரின் ஆசியுடன்' },
  },
  {
    id: 'blue-saree',
    arch: true,
    thumb: 'assets/gallery/couple-blue-saree-720.webp',
    full: 'assets/gallery/couple-blue-saree-1400.webp',
    width: 1400,
    height: 2100,
    alt: 'Kreethika in a blue and green silk saree with Vignesh, greeting with folded hands',
    caption: { en: 'Two hearts, one journey', ta: 'இரு இதயங்கள், ஒரு பயணம்' },
  },
  {
    id: 'save-the-date',
    thumb: 'assets/gallery/save-the-date-540.webp',
    full: 'assets/gallery/save-the-date-1080.webp',
    width: 1080,
    height: 1920,
    alt: 'Save the date card with the couple under a floral arch',
    caption: { en: 'Save the date · 15 & 16 November', ta: '15 & 16 நவம்பர்' },
  },
  {
    id: 'elders',
    thumb: 'assets/gallery/family-blessings-720.webp',
    full: 'assets/gallery/family-blessings-1400.webp',
    width: 1400,
    height: 2108,
    alt: 'Family elders standing before a floral decoration',
    caption: { en: 'With the blessings of our elders', ta: 'பெரியோர்களின் ஆசியுடன்' },
  },
  {
    id: 'invitation-en',
    thumb: 'assets/gallery/invitation-english-720.webp',
    full: 'assets/gallery/invitation-english-1093.webp',
    width: 1093,
    height: 1439,
    alt: 'The printed English wedding invitation',
    caption: { en: 'The wedding invitation', ta: 'ஆங்கில அழைப்பிதழ்' },
  },
  {
    id: 'invitation-ta',
    thumb: 'assets/gallery/invitation-tamil-720.webp',
    full: 'assets/gallery/invitation-tamil-1600.webp',
    width: 1600,
    height: 1041,
    alt: 'The printed Tamil wedding invitation',
    caption: { en: 'Thirumana Azhaippithazh — the Tamil invitation', ta: 'திருமண அழைப்பிதழ்' },
  },
];
