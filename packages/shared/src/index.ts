export type Sport = 'soccer' | 'volleyball' | 'tennis' | 'surf' | 'kite' | 'rowing' | 'sailing' | 'pickleball' | 'futsal' | 'spearfish';

export type Session = {
  id: string;
  sport: Sport;
  title: string;
  description?: string;
  startsAt: string; // ISO
  endsAt?: string; // ISO
  capacity: number;
  priceCents?: number;
  location: { lat: number; lng: number; name?: string };
};
