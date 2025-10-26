export interface Player {
  id?: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date | string;
  created?: Date | string;
  updated?: Date | string;
}

export interface PlayerCreate {
  username: string;
  email: string;
  level?: number;
  experience?: number;
  status?: 'online' | 'offline' | 'away';
}

export interface PlayerUpdate {
  username?: string;
  email?: string;
  level?: number;
  experience?: number;
  status?: 'online' | 'offline' | 'away';
}
