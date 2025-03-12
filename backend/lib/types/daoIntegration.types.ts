import { mapToDto } from '../utils/mapper';

export interface DaoIntegrationDb {
  id: string;
  dao_id: string;
  type: 'DISCORD' | 'GITHUB' | 'TELEGRAM' | 'TWITTER' | 'SNAPSHOT' | 'CUSTOM';
  name: string;
  description: string | null;
  config: string;
  status: 'ACTIVE' | 'INACTIVE' | 'FAILED';
  last_sync_at: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoIntegrationDto {
  id: string;
  daoId: string;
  type: 'DISCORD' | 'GITHUB' | 'TELEGRAM' | 'TWITTER' | 'SNAPSHOT' | 'CUSTOM';
  name: string;
  description: string | null;
  config: Record<string, any>;
  status: 'ACTIVE' | 'INACTIVE' | 'FAILED';
  lastSyncAt: Date | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoWebhookDb {
  id: string;
  integration_id: string;
  url: string;
  secret: string;
  events: string;
  is_active: boolean;
  last_triggered_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoWebhookDto {
  id: string;
  integrationId: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  lastTriggeredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoIntegrationLogDb {
  id: string;
  integration_id: string;
  level: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  details: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoIntegrationLogDto {
  id: string;
  integrationId: string;
  level: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  details: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoApiKeyDb {
  id: string;
  integration_id: string;
  name: string;
  key: string;
  permissions: string;
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoApiKeyDto {
  id: string;
  integrationId: string;
  name: string;
  key: string;
  permissions: string[];
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoIntegrationDto(db: DaoIntegrationDb): DaoIntegrationDto {
  return mapToDto<DaoIntegrationDto>(db, {
    dateFields: ['lastSyncAt', 'createdAt', 'updatedAt'],
    jsonFields: ['config', 'metadata']
  });
}

export function toDaoWebhookDto(db: DaoWebhookDb): DaoWebhookDto {
  return mapToDto<DaoWebhookDto>(db, {
    dateFields: ['lastTriggeredAt', 'createdAt', 'updatedAt'],
    jsonFields: ['events']
  });
}

export function toDaoIntegrationLogDto(db: DaoIntegrationLogDb): DaoIntegrationLogDto {
  return mapToDto<DaoIntegrationLogDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['details']
  });
}

export function toDaoApiKeyDto(db: DaoApiKeyDb): DaoApiKeyDto {
  return mapToDto<DaoApiKeyDto>(db, {
    dateFields: ['expiresAt', 'lastUsedAt', 'createdAt', 'updatedAt'],
    jsonFields: ['permissions']
  });
}