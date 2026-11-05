import { wedding, type WeddingEvent } from '../config/wedding';

export type EventIcon = 'lamp' | 'kalash';

export interface EventCardData extends WeddingEvent {
  icon: EventIcon;
}

/** Visual metadata for each event; all facts come from config/wedding.ts. */
const icons: Record<WeddingEvent['id'], EventIcon> = { reception: 'lamp', wedding: 'kalash' };

export const events: EventCardData[] = wedding.events.map((e) => ({ ...e, icon: icons[e.id] }));
