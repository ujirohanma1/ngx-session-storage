# 📦 ngx-session-storage

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![SSR Compatible](https://img.shields.io/badge/SSR-Compatible-blueviolet?style=for-the-badge)](https://angular.io/guide/ssr)

A lightweight, production-ready, and **type-safe** wrapper for `SessionStorage` in Angular. Designed to handle **Server-Side Rendering (SSR)** gracefully and provide a reactive interface via RxJS.

---

## ✨ Features

* 🌍 **SSR Safe**: Prevents `window is not defined` errors during server-side execution.
* 🛡️ **Type Safety**: Full support for TypeScript Generics.
* 🔄 **Reactive**: Subscribe to storage changes using RxJS Observables.
* 🏷️ **Namespace Support**: Optional prefixing to avoid key collisions.
* 📦 **Smart Serialization**: Automatically handles `JSON.stringify` and `JSON.parse`.

---

## 📥 Installation

```bash
npm install ngx-session-storage
```

## ⚙️ Configuration

To use a custom prefix (e.g., `app_v1_user`), configure the provider in your `app.config.ts` (for Standalone apps) or `AppModule`.

### Standalone Setup

```typescript
import { ApplicationConfig } from '@angular/core';
import { SESSION_STORAGE_CONFIG } from 'ngx-session-storage';

export const appConfig: ApplicationConfig = {
  providers: [
    { 
      provide: SESSION_STORAGE_CONFIG, 
      useValue: { prefix: 'my_app' } 
    }
  ]
};
```

## 🚀 Usage

### Basic CRUD Operations

Inject the `SessionStorageService` into your components or services.

```typescript
import { SessionStorageService } from 'ngx-session-storage';

@Component({ ... })
export class AppComponent {
  constructor(private storage: SessionStorageService) {
    // 1. Create/Update
    this.storage.set('theme', 'dark');
    this.storage.set('user', { id: 1, name: 'Rajesh' });

    // 2. Read (with Type Safety)
    const user = this.storage.get<{id: number, name: string}>('user');

    // 3. Delete
    this.storage.remove('theme');

    // 4. Clear all
    this.storage.clear();
  }
}
```typescript
// Check if a value exists
if (this.storage.exists('auth_token')) {
  console.log('User is authenticated');
}

// Get total number of items
const count = this.storage.length();

// Watch for changes reactively
this.storage.observe('user').subscribe(updatedUser => {
  console.log('User data changed in storage:', updatedUser);
});
```

## 🛠 API Reference

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| **set** | `(key: string, value: any)` | `void` | Stores a value. Objects are auto-serialized. |
| **get<T>** | `(key: string)` | `T \| null` | Retrieves and parses a value. |
| **exists** | `(key: string)` | `boolean` | Checks if the key exists (is not null). |
| **remove** | `(key: string)` | `void` | Removes a specific item. |
| **clear** | `none` | `void` | Clears all SessionStorage data. |
| **observe<T>** | `(key: string)` | `Observable<T>` | Returns an observable for the specific key. |
| **length** | `none` | `number` | Returns total item count. |

## 🔗 Links

*   **Repository**: [https://github.com/ujirohanma1/ngx-session-storage](https://github.com/ujirohanma1/ngx-session-storage)
*   **Bugs**: [https://github.com/ujirohanma1/ngx-session-storage/issues](https://github.com/ujirohanma1/ngx-session-storage/issues)
*   **NPM**: [https://www.npmjs.com/package/ngx-session-storage](https://www.npmjs.com/package/ngx-session-storage)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
