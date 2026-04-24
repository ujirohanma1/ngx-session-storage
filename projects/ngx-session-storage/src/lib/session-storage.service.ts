import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SESSION_STORAGE_CONFIG } from './session-storage.tokens';
import { SessionStorageConfig } from './session-storage.interface';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly isBrowser: boolean;
  private readonly prefix: string = '';
  private readonly _eventSource = new BehaviorSubject<{ key: string | null } | null>(null);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Optional() @Inject(SESSION_STORAGE_CONFIG) config?: SessionStorageConfig,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.prefix = config?.prefix ? `${config.prefix}_` : '';
  }

  // --- CRUD OPERATIONS ---

  set(key: string, value: any): void {
    if (!this.isBrowser) return;
    try {
      const data = JSON.stringify(value);
      sessionStorage.setItem(this.prefix + key, data);
      this._eventSource.next({ key });
    } catch (e) {
      console.error(`[ngx-session-storage] Failed to save ${key}`, e);
    }
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    const item = sessionStorage.getItem(this.prefix + key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(this.prefix + key);
      this._eventSource.next({ key });
    }
  }

  clear(): void {
    if (this.isBrowser) {
      sessionStorage.clear();
      this._eventSource.next(null);
    }
  }

  // --- HELPER FUNCTIONS By Rajesh ---

  exists(key: string): boolean {
    return this.isBrowser && sessionStorage.getItem(this.prefix + key) !== null;
  }

  length(): number {
    return this.isBrowser ? sessionStorage.length : 0;
  }

  observe<T>(key: string): Observable<T | null> {
    return this._eventSource.asObservable().pipe(
      filter((event) => event === null || event.key === key),
      map(() => this.get<T>(key)),
    );
  }
}
