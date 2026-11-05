/**
 * ─────────────────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the single source of truth for the website.
 * ─────────────────────────────────────────────────────────────────────────
 *  Every name, date, time, address and link shown on the site comes from
 *  this file. Edit values here; you never need to touch the components.
 *
 *  Source: the printed Tamil & English wedding invitations supplied by the
 *  family. Anything not printed on the invitation is marked "EDITABLE".
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Lang = 'en' | 'ta';
export type Bilingual = { en: string; ta: string };

export interface Person {
  /** Short first name used in large display titles (opening screen, SEO). */
  shortName: Bilingual;
  /** Full name exactly as printed on the invitation. */
  fullName: Bilingual;
  qualification: string;
  role: Bilingual;
  /** Parents' line, from the English invitation. */
  parents: Bilingual;
  hometown: Bilingual;
  portrait: { src: string; srcSmall: string; width: number; height: number; alt: string };
}

export interface WeddingEvent {
  id: 'reception' | 'wedding';
  title: Bilingual;
  /** ISO 8601 with the India offset so it is correct in every timezone. */
  start: string;
  /** Used ONLY for the calendar entry length. */
  end: string;
  /** True when `end` is an assumption (not printed on the invitation). */
  endIsAssumed: boolean;
  timeLabel: Bilingual;
  dayLabel: Bilingual;
  /** Optional extra detail line (e.g. Tamil muhurtham details). */
  detail?: Bilingual;
}

export const wedding = {
  /** Header monogram letters. */
  monogram: { en: 'V & K', ta: 'வி & கி' },

  /**
   * NOTE ON THE BRIDE'S NAME
   * Both printed invitations and the invitation video spell the bride's name
   * "V. Kreethika" (Tamil: கிருத்திகா). The project brief also mentioned
   * "Keerthana". Following the instruction to treat the invitation as the
   * source of truth, "Kreethika" is used everywhere. If "Keerthana" is the
   * intended display name, change `bride.shortName.en` below — that is the
   * only place it needs to change.
   */
  bride: {
    shortName: { en: 'Kreethika', ta: 'கிருத்திகா' },
    fullName: { en: 'V. Kreethika', ta: 'V. கிருத்திகா' },
    qualification: 'B.Com., MBA.',
    role: { en: 'The Bride', ta: 'மணமகள்' },
    parents: {
      en: 'Daughter of Mr. G. Venkatesh & Mrs. V. Jayanthi',
      ta: 'G. வெங்கடேஷ் – V. ஜெயந்தி அவர்களின் இளைய குமாரத்தி',
    },
    hometown: {
      en: 'Puthagaram, Natrampalli Taluk, Tirupattur District',
      ta: 'புத்தகரம், நாட்றம்பள்ளி தாலுக்கா, திருப்பத்தூர் மாவட்டம்',
    },
    portrait: {
      src: 'assets/couple/bride-portrait-1080.webp',
      srcSmall: 'assets/couple/bride-portrait-540.webp',
      width: 1080,
      height: 1440,
      alt: 'V. Kreethika, the bride, in a red silk saree',
    },
  } satisfies Person,

  groom: {
    shortName: { en: 'Vignesh', ta: 'விக்னேஷ்' },
    fullName: { en: 'D. Vignesh', ta: 'D. விக்னேஷ்' },
    qualification: 'D.C.S.',
    role: { en: 'The Groom', ta: 'மணமகன்' },
    parents: {
      en: 'Son of Mr. R. Devendran & Mrs. D. Selvi',
      ta: 'R. தேவேந்திரன் – D. செல்வி அவர்களின் குமாரன்',
    },
    hometown: {
      en: 'Pa. Muthampatti, Vengalapuram, Tirupattur District',
      ta: 'ப. முத்தம்பட்டி, வெங்களாபுரம், திருப்பத்தூர் மாவட்டம்',
    },
    portrait: {
      src: 'assets/couple/groom-portrait-1080.webp',
      srcSmall: 'assets/couple/groom-portrait-540.webp',
      width: 1080,
      height: 1440,
      alt: 'D. Vignesh, the groom, in an ivory sherwani',
    },
  } satisfies Person,

  /** Blessing line on the opening screen (per language). */
  blessing: {
    en: '|| Sri Ganeshaya Namaha ||',
    ta: 'ஸ்ரீ கோபிநாத்பெருமாள் துணை',
  },

  dateRangeLabel: { en: '15 & 16 November 2026', ta: '15 & 16 நவம்பர் 2026' },
  dateRangeShort: { en: '15–16 November 2026', ta: '15–16 நவம்பர் 2026' },

  /** The countdown counts down to this moment (wedding muhurtham, IST). */
  countdownTarget: '2026-11-16T06:00:00+05:30',
  timeZone: 'Asia/Kolkata',

  events: [
    {
      id: 'reception',
      title: { en: 'Reception', ta: 'வரவேற்பு & விருந்து' },
      start: '2026-11-15T19:00:00+05:30',
      // EDITABLE: the invitation says "7.00 PM onwards"; 10 PM is only used
      // to give the calendar entry a length.
      end: '2026-11-15T22:00:00+05:30',
      endIsAssumed: true,
      timeLabel: { en: '7:00 PM onwards', ta: 'இரவு 7.00 மணி முதல்' },
      dayLabel: { en: 'Sunday', ta: 'ஞாயிற்றுக்கிழமை' },
    },
    {
      id: 'wedding',
      title: { en: 'Wedding', ta: 'சுபமுகூர்த்தம்' },
      start: '2026-11-16T06:00:00+05:30',
      end: '2026-11-16T07:30:00+05:30',
      endIsAssumed: false,
      timeLabel: { en: '6:00 AM – 7:30 AM', ta: 'காலை 6.00 – 7.30 மணி' },
      dayLabel: { en: 'Monday', ta: 'திங்கட்கிழமை' },
      detail: {
        en: 'Aippasi 30, Parabhava year · Saptami tithi · Thiruvonam nakshatram · Vrischika lagnam',
        ta: 'நிகழும் பராபவ வருடம் ஐப்பசி மாதம் 30-ஆம் நாள் (16-11-2026) திங்கட்கிழமை சப்தமி திதி, திருவோணம் நட்சத்திரம், அமிர்தயோகம் கூடிய சுபயோக சுபதினத்தில் காலை 6.00 மணிக்குமேல் 7.30 மணிக்குள் விருச்சிக லக்கினத்தில்',
      },
    },
  ] satisfies WeddingEvent[],

  venue: {
    name: { en: 'Sri Sundaram Mahal', ta: 'ஸ்ரீ சுந்தரம் மஹால்' },
    subtitle: { en: 'Thirumana Mandapam', ta: 'திருமண மண்டபம்' },
    addressLines: {
      en: [
        'Vengalapuram',
        'Tirupattur – Tiruvannamalai Main Road',
        'Tirupattur District, Tamil Nadu',
      ],
      ta: [
        'வெங்களாபுரம்',
        'திருப்பத்தூர் – திருவண்ணாமலை மெயின் ரோடு',
        'திருப்பத்தூர் மாவட்டம், தமிழ்நாடு',
      ],
    },
    shortAddress: { en: 'Vengalapuram, Tirupattur', ta: 'வெங்களாபுரம், திருப்பத்தூர்' },
    /**
     * Google Maps link — decoded from the "Scan for Location" QR code printed
     * on the Tamil invitation. Replace it if the family shares a newer link.
     */
    mapsUrl: 'https://share.google/XKGHzRqH6CNvVWwPe',
    /**
     * EDITABLE (optional): a Google Maps *embed* URL. In Google Maps choose
     * Share → Embed a map → copy only the `src="…"` value and paste it here.
     * When empty, the venue section shows the QR card instead of a map.
     */
    mapEmbedUrl: '',
    /** QR code cropped from the printed invitation. */
    qrImage: 'assets/decorations/location-qr.png',
  },

  /**
   * Public website URL used in share messages. When empty, the current
   * browser URL is used automatically (works on any host).
   */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',

  story: {
    kural: {
      ta: ['அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை', 'பண்பும் பயனும் அது.'],
      en: ['If love and virtue in the household reign,', 'This is of life the perfect grace and gain.'],
      source: { en: 'Thirukkural 45 · translated by G. U. Pope', ta: '– திருக்குறள் 45' },
    },
  },

  /** Background music. Taken from the family's own invitation video. */
  music: {
    src: 'assets/audio/wedding-music.m4a',
    volume: 0.45,
  },

  video: {
    src: 'assets/video/wedding-invitation.mp4',
    poster: 'assets/video/wedding-invitation-poster.webp',
    width: 720,
    height: 1280,
  },

  hero: {
    src: 'assets/couple/hero-1200.webp',
    srcSmall: 'assets/couple/hero-800.webp',
    width: 1200,
    height: 1800,
    alt: 'Kreethika and Vignesh greeting guests with folded hands',
  },

  closing: {
    src: 'assets/gallery/couple-blue-saree-1400.webp',
    srcSmall: 'assets/gallery/couple-blue-saree-720.webp',
    width: 1400,
    height: 2100,
    alt: 'Kreethika and Vignesh together, with folded hands',
  },

  /** Credit shown in the footer (logo supplied with the project files). */
  credit: {
    enabled: true,
    label: { en: 'Celebration arranged by', ta: 'நிகழ்ச்சி ஏற்பாடு' },
    name: 'Sree Event Planner and Management',
    logo: 'assets/icons/event-planner-logo.webp',
    /** WhatsApp number in international format (no "+"). */
    whatsapp: '919894475184',
    whatsappLabel: '+91 98944 75184',
    whatsappMessage:
      'Hello Sree Event Planner and Management, I saw the Vignesh & Kreethika wedding invitation and would like to know more about your event planning services.',
  },
};

export type WeddingConfig = typeof wedding;
