
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum UserStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended'
}

export interface Plan {
  id: string;
  name: string;
  durationHours: number;
  maxActiveStreams: number;
  maxLoopHours: number;
  maxAudioTracks: number;
  maxPlatforms: number;
  maxResolution: string;
  maxFps: number;
  storageLimitMb: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  activeUntil: string;
  planId: string;
  autoRenew: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserUsage {
  userId: string;
  storageUsedMb: number;
  activeStreamsCount: number;
  totalStreamHoursThisMonth: number;
  lastStreamAt?: string;
}

export interface MediaFile {
  id: string;
  userId: string;
  filename: string;
  duration: number; // in seconds
  size: number; // in bytes
  type: 'video' | 'audio' | 'image';
  thumbnail?: string;
}

export enum StreamStatus {
  IDLE = 'idle',
  STARTING = 'starting',
  STREAMING = 'streaming',
  STOPPING = 'stopping',
  ERROR = 'error',
  SCHEDULED = 'scheduled'
}

export interface StreamDestination {
  id: string;
  name: string;
  rtmpUrl: string;
  streamKey: string;
}

export interface StreamConfig {
  id: string;
  userId: string;
  sourceType: 'video' | 'image';
  videoId?: string;
  imageId?: string;
  audioIds: string[];
  loopMode: 'infinite' | 'fixed' | 'none';
  duration?: number;
  status: StreamStatus;
  scheduledAt?: string;
  destinations: StreamDestination[];
  settings: {
    videoBitrate: string;
    audioBitrate: string;
    fps: number;
    resolution: string;
    orientation: 'landscape' | 'portrait';
  };
}
