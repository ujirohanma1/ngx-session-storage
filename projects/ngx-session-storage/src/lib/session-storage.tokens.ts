import { InjectionToken } from '@angular/core';
import { SessionStorageConfig } from './session-storage.interface';

export const SESSION_STORAGE_CONFIG = new InjectionToken<SessionStorageConfig>(
  'SESSION_STORAGE_CONFIG',
);
