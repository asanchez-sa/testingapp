Plan de Configuración de Packages para Superapp

## Resumen Ejecutivo

Configuración completa de 7 packages para un monorepo React Native/Expo usando Turborepo, TypeScript, y Bun. Todos los packages estarán 100% configurados para Expo y React Native con soporte para iOS, Android y Web.

**IMPORTANTE:**
- Se usará Zod v4 (ya instalado en root: `^4.1.13`)
- No se especificarán versiones en los comandos `bun add`
- El package `@superapp/database` NO se configurará ahora (se hará después)

---

## Packages a Configurar (en orden de dependencia)

1. **@superapp/shared** - Utilidades y código compartido (base de todo)
2. **@superapp/storage** - Abstracción de almacenamiento local
3. **@superapp/api** - Cliente HTTP y gestión de APIs
4. **@superapp/auth** - Autenticación JWT y gestión de usuarios
5. **@superapp/services** - Lógica de negocio con TanStack Query
6. **@superapp/analytics** - Analytics multi-plataforma (Sentry, PostHog, Amplitude)
7. **@superapp/flags** - Feature flags con Firebase Remote Config

**NO CONFIGURAR AHORA:**
- ~~**@superapp/database**~~ - SQLite local con Drizzle ORM (se configurará después)

---

## 1. @superapp/shared

### Propósito
Centro de verdad para utilidades, hooks, constantes, tipos y helpers compartidos entre todos los packages y apps.

### Instalación de Dependencias
```bash
cd packages/shared
bun add zod
```

### package.json
```json
{
  "name": "@superapp/shared",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./constants": "./src/constants/index.ts",
    "./constants/*": "./src/constants/*.ts",
    "./types": "./src/types/index.ts",
    "./utils": "./src/utils/index.ts",
    "./utils/*": "./src/utils/*.ts",
    "./hooks": "./src/hooks/index.ts",
    "./hooks/*": "./src/hooks/*.ts",
    "./schemas": "./src/schemas/index.ts",
    "./errors": "./src/errors/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

**Nota:** `zod` se tomará del workspace root (v4.1.13)

### Estructura de Carpetas
```
packages/shared/src/
├── constants/
│   ├── app.constants.ts          # Constantes de la app (API URLs, timeouts, etc.)
│   ├── platform.constants.ts     # Constantes de plataforma (iOS, Android, Web)
│   ├── regex.constants.ts        # Expresiones regulares comunes
│   └── index.ts
├── types/
│   ├── common.types.ts           # Tipos compartidos globales
│   ├── platform.types.ts         # Tipos específicos de plataforma
│   ├── error.types.ts            # Tipos de errores estandarizados
│   └── index.ts
├── utils/
│   ├── platform.utils.ts         # Utilidades de detección de plataforma
│   ├── string.utils.ts           # Manipulación de strings
│   ├── number.utils.ts           # Formateo de números
│   ├── date.utils.ts             # Formateo de fechas
│   ├── url.utils.ts              # Manejo de URLs
│   ├── validation.utils.ts       # Validaciones comunes
│   └── index.ts
├── hooks/
│   ├── use-debounce.ts           # Hook de debounce
│   ├── use-throttle.ts           # Hook de throttle
│   ├── use-previous.ts           # Hook para valor anterior
│   ├── use-mount.ts              # Hook de lifecycle
│   ├── use-update-effect.ts      # Hook de update effect
│   └── index.ts
├── schemas/
│   ├── common.schemas.ts         # Schemas Zod compartidos
│   ├── validation.schemas.ts     # Schemas de validación
│   └── index.ts
├── errors/
│   ├── app-error.ts              # Clase de error base
│   ├── validation-error.ts       # Error de validación
│   ├── network-error.ts          # Error de red
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Platform Utils:**
- Detección de plataforma (iOS, Android, Web)
- Detección de versión de SO
- Helpers para código específico de plataforma

**Common Hooks:**
- `useDebounce` - Debouncing de valores
- `useThrottle` - Throttling de funciones
- `usePrevious` - Acceso a valor anterior
- `useMount/useUnmount` - Lifecycle simplificado

**Validation Utils:**
- Email validation
- Phone number validation
- URL validation
- Credit card validation

**Zod Schemas Compartidos:**
- Email schema
- Phone schema
- URL schema
- Date schema

---

## 2. @superapp/storage

### Propósito
Abstracción unificada para almacenamiento local usando AsyncStorage, SecureStore y MMKV con API type-safe.

### Instalación de Dependencias
```bash
cd packages/storage
bun add @react-native-async-storage/async-storage expo-secure-store react-native-mmkv
```

### package.json
```json
{
  "name": "@superapp/storage",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./adapters": "./src/adapters/index.ts",
    "./core": "./src/core/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./keys": "./src/keys/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### Estructura de Carpetas
```
packages/storage/src/
├── adapters/
│   ├── async-storage.adapter.ts      # Adapter para AsyncStorage
│   ├── secure-storage.adapter.ts     # Adapter para SecureStore
│   ├── mmkv.adapter.ts               # Adapter para MMKV
│   ├── storage.adapter.types.ts      # Tipos de adapters
│   └── index.ts
├── core/
│   ├── storage.ts                    # Clase principal de Storage
│   ├── storage-factory.ts            # Factory para crear instancias
│   ├── storage.types.ts              # Tipos principales
│   └── index.ts
├── hooks/
│   ├── use-storage.ts                # Hook principal de storage
│   ├── use-async-storage.ts          # Hook para AsyncStorage
│   ├── use-secure-storage.ts         # Hook para SecureStore
│   ├── use-mmkv.ts                   # Hook para MMKV
│   └── index.ts
├── keys/
│   ├── storage-keys.ts               # Keys centralizadas
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Storage Adapters:**
- Interface común para todos los tipos de storage
- Serialización/deserialización automática
- Soporte para tipos complejos (objects, arrays)
- Error handling consistente

**Storage Factory:**
- `createAsyncStorage()` - Para datos no sensibles
- `createSecureStorage()` - Para datos sensibles (tokens, credentials)
- `createMMKVStorage()` - Para datos de alta performance

**Type-Safe Storage:**
- Typed keys con TypeScript
- Schemas de Zod para validación
- Auto-complete de keys
- Type inference automático

**Hooks:**
- `useStorage<T>(key, defaultValue)` - Hook genérico
- `useAsyncStorage<T>(key)` - AsyncStorage hook
- `useSecureStorage<T>(key)` - SecureStore hook
- `useMMKV<T>(key)` - MMKV hook

**Features:**
- Migration system para cambios de schema
- Namespace support para multi-tenancy
- Batch operations
- Clear all functionality
- Size management

---

## 3. @superapp/api

### Propósito
Cliente HTTP base con Axios, manejo de múltiples endpoints, interceptores, retries, y estandarización de errores.

### Instalación de Dependencias
```bash
cd packages/api
bun add axios axios-retry
```

### package.json
```json
{
  "name": "@superapp/api",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./core": "./src/core/index.ts",
    "./clients": "./src/clients/index.ts",
    "./clients/*": "./src/clients/*.ts",
    "./interceptors": "./src/interceptors/index.ts",
    "./errors": "./src/errors/index.ts",
    "./utils": "./src/utils/index.ts",
    "./config": "./src/config/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "@superapp/storage": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### Estructura de Carpetas
```
packages/api/src/
├── core/
│   ├── base-client.ts                # Cliente HTTP base
│   ├── api-client.factory.ts         # Factory para crear clientes
│   ├── api-client.types.ts           # Tipos del cliente
│   └── index.ts
├── clients/
│   ├── auth-client.ts                # Cliente para auth.domain.com
│   ├── main-client.ts                # Cliente para api.domain.com
│   ├── index.ts
├── interceptors/
│   ├── auth.interceptor.ts           # Interceptor de autenticación
│   ├── retry.interceptor.ts          # Interceptor de reintentos
│   ├── logger.interceptor.ts         # Interceptor de logs
│   ├── error.interceptor.ts          # Interceptor de errores
│   └── index.ts
├── errors/
│   ├── api-error.ts                  # Error base de API
│   ├── network-error.ts              # Error de red
│   ├── timeout-error.ts              # Error de timeout
│   ├── unauthorized-error.ts         # Error 401
│   ├── forbidden-error.ts            # Error 403
│   ├── not-found-error.ts            # Error 404
│   ├── validation-error.ts           # Error 422
│   ├── server-error.ts               # Error 500
│   └── index.ts
├── utils/
│   ├── query-builder.ts              # Constructor de query params
│   ├── response-parser.ts            # Parser de respuestas
│   ├── error-mapper.ts               # Mapeo de errores
│   └── index.ts
├── config/
│   ├── api.config.ts                 # Configuración base de API
│   ├── retry.config.ts               # Configuración de reintentos
│   ├── timeout.config.ts             # Configuración de timeouts
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Base Client:**
- Configuración base de Axios
- Manejo de headers comunes
- Request/Response typing
- Generic CRUD methods (`get`, `post`, `put`, `patch`, `delete`)

**Multi-API Support:**
- `AuthClient` - para auth.domain.com
- `MainClient` - para api.domain.com
- Factory pattern para crear nuevos clientes
- Configuración individual por cliente (baseURL, headers, timeout)

**Interceptors:**
- **Auth Interceptor:** Inyectar token JWT en headers
- **Retry Interceptor:** Reintentos automáticos con exponential backoff
- **Logger Interceptor:** Logs de requests/responses en desarrollo
- **Error Interceptor:** Mapeo de errores HTTP a errores tipados

**Error Handling:**
- Clase base `ApiError` extendiendo `Error`
- Errores específicos por status code (401, 403, 404, 422, 500)
- Metadata en errores (status, headers, request info)
- Stack trace preservation

**Features:**
- Request cancellation con AbortController
- Query param builder con serialización correcta
- Response validation con Zod schemas
- Network state detection (online/offline)
- Request deduplication
- File upload support
- Download progress tracking

---

## 4. @superapp/auth

### Propósito
Gestión completa de autenticación JWT, manejo de sesiones, refresh tokens, y estado de usuario.

### Instalación de Dependencias
```bash
cd packages/auth
bun add jwt-decode zustand
```

### package.json
```json
{
  "name": "@superapp/auth",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./store": "./src/store/index.ts",
    "./api": "./src/api/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./utils": "./src/utils/index.ts",
    "./guards": "./src/guards/index.ts",
    "./types": "./src/types/index.ts",
    "./schemas": "./src/schemas/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "@superapp/storage": "workspace:*",
    "@superapp/api": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### Estructura de Carpetas
```
packages/auth/src/
├── store/
│   ├── auth.store.ts                 # Zustand store de autenticación
│   ├── auth.store.types.ts           # Tipos del store
│   └── index.ts
├── api/
│   ├── auth.api.ts                   # API de autenticación
│   ├── auth.api.types.ts             # Tipos de API
│   └── index.ts
├── hooks/
│   ├── use-auth.ts                   # Hook principal de auth
│   ├── use-user.ts                   # Hook de usuario
│   ├── use-session.ts                # Hook de sesión
│   ├── use-login.ts                  # Hook de login
│   ├── use-logout.ts                 # Hook de logout
│   ├── use-register.ts               # Hook de registro
│   └── index.ts
├── utils/
│   ├── token.utils.ts                # Utilidades de tokens JWT
│   ├── session.utils.ts              # Utilidades de sesión
│   ├── auth.utils.ts                 # Utilidades generales
│   └── index.ts
├── guards/
│   ├── auth-guard.tsx                # Componente guard de auth
│   ├── guest-guard.tsx               # Componente guard de guest
│   └── index.ts
├── types/
│   ├── user.types.ts                 # Tipos de usuario
│   ├── session.types.ts              # Tipos de sesión
│   ├── token.types.ts                # Tipos de tokens
│   └── index.ts
├── schemas/
│   ├── login.schema.ts               # Schema de login
│   ├── register.schema.ts            # Schema de registro
│   ├── user.schema.ts                # Schema de usuario
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Auth Store (Zustand):**
- Estado global de autenticación
- `isAuthenticated`, `user`, `tokens`
- Acciones: `login`, `logout`, `refreshToken`, `updateUser`
- Persistencia con `@superapp/storage` (SecureStore para tokens)

**Auth API:**
- `login(credentials)` - Login con email/password
- `logout()` - Logout y limpieza de tokens
- `register(data)` - Registro de usuario
- `refreshToken()` - Refresh de access token
- `getCurrentUser()` - Obtener usuario actual
- `updateProfile(data)` - Actualizar perfil

**Token Management:**
- Decodificación de JWT con `jwt-decode`
- Validación de expiración de tokens
- Auto-refresh de tokens antes de expirar
- Storage seguro con SecureStore

**Hooks:**
- `useAuth()` - Estado y acciones de autenticación
- `useUser()` - Usuario actual
- `useSession()` - Información de sesión
- `useLogin()` - Mutation de login
- `useLogout()` - Mutation de logout
- `useRegister()` - Mutation de registro

**Auth Guards:**
- `<AuthGuard>` - Proteger rutas autenticadas
- `<GuestGuard>` - Proteger rutas de invitados
- Redirección automática

**Features:**
- Auto-refresh de tokens
- Session timeout detection
- Multi-device session management
- Remember me functionality
- Biometric authentication (opcional)
- Social login preparation (estructura para futuro)

---

## 5. @superapp/services

### Propósito
Lógica de negocio, servicios de dominio, y gestión de datos con TanStack Query para caching y sincronización. Usa arquitectura de Screaming Architecture con dominios autocontenidos.

### Instalación de Dependencias
```bash
cd packages/services
bun add @tanstack/react-query
```

### package.json
```json
{
  "name": "@superapp/services",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./config": "./src/config/index.ts",
    "./domains/user": "./src/domains/user/index.ts",
    "./domains/profile": "./src/domains/profile/index.ts",
    "./utils": "./src/utils/index.ts",
    "./providers": "./src/providers/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "@superapp/api": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

**IMPORTANTE:** NO depende de `@superapp/auth` ni incluye lógica de autenticación. La autenticación está en su propio package.

### Estructura de Carpetas (Screaming Architecture)
```
packages/services/src/
├── config/
│   ├── query-client.ts               # Configuración de QueryClient
│   ├── query-client.types.ts         # Tipos de QueryClient
│   └── index.ts
├── domains/
│   ├── user/
│   │   ├── hooks/
│   │   │   ├── use-user-profile.ts   # Hook para perfil de usuario
│   │   │   ├── use-update-user.ts    # Hook para actualizar usuario
│   │   │   └── index.ts
│   │   ├── queries/
│   │   │   ├── user.queries.ts       # Queries de usuarios
│   │   │   └── index.ts
│   │   ├── mutations/
│   │   │   ├── user.mutations.ts     # Mutations de usuarios
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── user.schemas.ts       # Schemas Zod de usuarios
│   │   │   └── index.ts
│   │   ├── user.service.ts           # Servicio de usuarios
│   │   ├── user.types.ts             # Tipos de usuarios
│   │   └── index.ts
│   ├── profile/
│   │   ├── hooks/
│   │   │   ├── use-profile-data.ts
│   │   │   ├── use-update-profile.ts
│   │   │   └── index.ts
│   │   ├── queries/
│   │   │   ├── profile.queries.ts
│   │   │   └── index.ts
│   │   ├── mutations/
│   │   │   ├── profile.mutations.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── profile.schemas.ts
│   │   │   └── index.ts
│   │   ├── profile.service.ts
│   │   ├── profile.types.ts
│   │   └── index.ts
│   └── index.ts
├── utils/
│   ├── query-keys.ts                 # Factory de query keys
│   ├── cache.utils.ts                # Utilidades de cache
│   └── index.ts
├── providers/
│   ├── query-provider.tsx            # Provider de TanStack Query
│   └── index.ts
└── index.ts
```

### Implementaciones Clave

**Query Client Configuration:**
- Configuración global de TanStack Query
- Configuración de cache (stale time, gc time)
- Retry logic
- Error handling global
- Devtools integration

**Domain Services (Screaming Architecture):**

Cada dominio contiene TODO lo relacionado con ese dominio:

- **User Domain (domains/user/):**
  - `hooks/` - Hooks específicos del dominio (use-user-profile, use-update-user)
  - `queries/` - Queries de TanStack Query
  - `mutations/` - Mutations de TanStack Query
  - `schemas/` - Schemas de Zod para validación
  - `user.service.ts` - Servicio con lógica de negocio
  - `user.types.ts` - Tipos TypeScript del dominio

- **Profile Domain (domains/profile/):**
  - `hooks/` - use-profile-data, use-update-profile
  - `queries/` - profile.queries.ts
  - `mutations/` - profile.mutations.ts
  - `schemas/` - profile.schemas.ts
  - `profile.service.ts` - Lógica de negocio de perfil
  - `profile.types.ts` - Tipos del dominio

**Ejemplo de Servicio:**
```typescript
// domains/user/user.service.ts
export const userService = {
  getUserProfile: (id: string) => { /* llamada a API */ },
  updateUserProfile: (data: UpdateUserData) => { /* llamada a API */ },
  getUserSettings: () => { /* llamada a API */ },
}
```

**Query Keys Factory:**
```typescript
export const queryKeys = {
  user: {
    all: ['user'] as const,
    profile: (id: string) => [...queryKeys.user.all, 'profile', id] as const,
    settings: () => [...queryKeys.user.all, 'settings'] as const,
  },
  profile: {
    all: ['profile'] as const,
    data: (id: string) => [...queryKeys.profile.all, 'data', id] as const,
  },
}
```

**Hooks con TanStack Query (dentro de cada dominio):**
- `domains/user/hooks/use-user-profile.ts` - Query de perfil con cache
- `domains/user/hooks/use-update-user.ts` - Mutation con optimistic updates
- `domains/profile/hooks/use-profile-data.ts` - Query de datos de perfil

**Zod Integration:**
- Validación de responses de API con schemas
- Schemas compartidos entre API y UI
- Type inference automática

**Features:**
- Optimistic updates
- Infinite queries para listas
- Prefetching de datos
- Background refetching
- Cache invalidation strategies
- Offline support con query persistence
- Request deduplication

---

## 6. @superapp/analytics

### Propósito
Sistema unificado de analytics para Sentry (error tracking), PostHog (product analytics), y Amplitude (user analytics).

### Instalación de Dependencias
```bash
cd packages/analytics
bun add @sentry/react-native posthog-react-native @amplitude/analytics-react-native
```

### package.json
```json
{
  "name": "@superapp/analytics",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./providers": "./src/providers/index.ts",
    "./core": "./src/core/index.ts",
    "./events": "./src/events/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./utils": "./src/utils/index.ts",
    "./config": "./src/config/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "@superapp/auth": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### Estructura de Carpetas
```
packages/analytics/src/
├── providers/
│   ├── sentry.provider.ts            # Provider de Sentry
│   ├── posthog.provider.ts           # Provider de PostHog
│   ├── amplitude.provider.ts         # Provider de Amplitude
│   ├── analytics.provider.ts         # Provider unificado
│   └── index.ts
├── core/
│   ├── analytics.ts                  # Clase principal de Analytics
│   ├── analytics.types.ts            # Tipos de analytics
│   └── index.ts
├── events/
│   ├── event-builder.ts              # Constructor de eventos
│   ├── event-types.ts                # Tipos de eventos
│   ├── event-schemas.ts              # Schemas de eventos
│   └── index.ts
├── hooks/
│   ├── use-analytics.ts              # Hook principal
│   ├── use-track-event.ts            # Hook para tracking
│   ├── use-track-screen.ts           # Hook para screens
│   └── index.ts
├── utils/
│   ├── user.utils.ts                 # Utilidades de usuario
│   ├── device.utils.ts               # Info de dispositivo
│   ├── session.utils.ts              # Info de sesión
│   └── index.ts
├── config/
│   ├── sentry.config.ts              # Configuración de Sentry
│   ├── posthog.config.ts             # Configuración de PostHog
│   ├── amplitude.config.ts           # Configuración de Amplitude
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Analytics Provider Unificado:**
```typescript
class Analytics {
  // Event tracking
  track(eventName: string, properties?: Record<string, any>): void

  // Screen tracking
  screen(screenName: string, properties?: Record<string, any>): void

  // User identification
  identify(userId: string, traits?: Record<string, any>): void

  // User properties
  setUserProperties(properties: Record<string, any>): void

  // Error tracking
  captureError(error: Error, context?: Record<string, any>): void

  // Performance tracking
  startTransaction(name: string): Transaction
}
```

**Sentry Integration:**
- Error tracking y crash reporting
- Performance monitoring
- Release tracking
- Source maps para debugging
- Breadcrumbs automáticos
- User context tracking

**PostHog Integration:**
- Event tracking
- Feature flags (integración con @superapp/flags)
- Session recording
- Funnels y cohorts
- A/B testing support

**Amplitude Integration:**
- User analytics
- Event properties
- User properties
- Revenue tracking
- Cohort analysis

**Event System:**
- Event builder con validación
- Event schemas con Zod
- Type-safe event tracking
- Auto-tracking de eventos comunes:
  - App opened
  - Screen viewed
  - Button clicked
  - Form submitted
  - Error occurred

**Hooks:**
- `useAnalytics()` - Acceso al analytics client
- `useTrackEvent(eventName, properties)` - Track events
- `useTrackScreen(screenName)` - Track screen views automáticamente

**Features:**
- Multi-provider support (enviar a todos los servicios)
- Conditional tracking (solo en producción, feature flags)
- User session tracking
- Device info collection
- Network state tracking
- Performance metrics
- Privacy controls (opt-out, data sampling)
- Debug mode para desarrollo

---

## 7. @superapp/flags

### Propósito
Sistema de feature flags usando Firebase Remote Config para habilitar/deshabilitar funcionalidades dinámicamente sin deployments.

### Instalación de Dependencias
```bash
cd packages/flags
bun add @react-native-firebase/app @react-native-firebase/remote-config zustand
```

### package.json
```json
{
  "name": "@superapp/flags",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./store": "./src/store/index.ts",
    "./core": "./src/core/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./components": "./src/components/index.ts",
    "./config": "./src/config/index.ts",
    "./utils": "./src/utils/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "@superapp/shared": "workspace:*",
    "@superapp/storage": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### Estructura de Carpetas
```
packages/flags/src/
├── store/
│   ├── flags.store.ts                # Zustand store de flags
│   ├── flags.store.types.ts          # Tipos del store
│   └── index.ts
├── core/
│   ├── flags-manager.ts              # Gestor principal de flags
│   ├── firebase-config.ts            # Configuración de Firebase
│   ├── remote-config.ts              # Wrapper de Remote Config
│   ├── flags.types.ts                # Tipos de flags
│   └── index.ts
├── hooks/
│   ├── use-flag.ts                   # Hook para obtener flag
│   ├── use-flags.ts                  # Hook para múltiples flags
│   ├── use-feature-flag.ts           # Hook con type-safe
│   └── index.ts
├── components/
│   ├── feature-flag.tsx              # Componente de feature flag
│   ├── feature-toggle.tsx            # Componente de toggle
│   └── index.ts
├── config/
│   ├── default-flags.ts              # Flags por defecto
│   ├── flag-definitions.ts           # Definiciones de flags
│   └── index.ts
├── utils/
│   ├── flag-evaluator.ts             # Evaluador de flags
│   ├── override.utils.ts             # Overrides para desarrollo
│   └── index.ts
└── index.ts
```



### Implementaciones Clave

**Firebase Remote Config Integration:**
- Inicialización de Firebase App (@react-native-firebase/app)
- Configuración de Remote Config (@react-native-firebase/remote-config)
- Fetch automático de flags remotos
- Intervalo de actualización configurable
- Valores por defecto locales

**Flags Store (Zustand):**
- Estado global de feature flags
- Flags locales (defaults) y remotos (Firebase)
- Override capabilities para desarrollo
- Cache de flags en storage local
- Sincronización con Firebase Remote Config

**Flag Definitions (Type-Safe):**
```typescript
export const FLAGS = {
  ENABLE_NEW_DASHBOARD: 'enable_new_dashboard',
  ENABLE_DARK_MODE: 'enable_dark_mode',
  ENABLE_BIOMETRIC_AUTH: 'enable_biometric_auth',
  SHOW_BETA_FEATURES: 'show_beta_features',
} as const;

export type FlagKey = typeof FLAGS[keyof typeof FLAGS];
```

**Hooks:**
```typescript
// Simple boolean flag
const isDarkModeEnabled = useFlag('enable_dark_mode');

// Type-safe flag
const isNewDashboard = useFeatureFlag(FLAGS.ENABLE_NEW_DASHBOARD);

// Multiple flags
const { enable_dark_mode, show_beta_features } = useFlags([
  'enable_dark_mode',
  'show_beta_features',
]);
```

**Components:**
```typescript
// Render condicionalmente
<FeatureFlag flag="enable_new_dashboard">
  <NewDashboard />
</FeatureFlag>

// Con fallback
<FeatureFlag flag="show_beta_features" fallback={<OldFeature />}>
  <BetaFeature />
</FeatureFlag>
```

**Firebase Remote Config Features:**
- Fetch flags desde Firebase Remote Config
- Activación de flags fetched
- Polling para actualización periódica (configurable)
- Fallback a flags locales (defaults)
- Cache en storage local (@superapp/storage)
- Configuración por environment (dev, staging, prod)

**Features:**
- Local flags (hard-coded defaults en código)
- Remote flags (desde Firebase Remote Config)
- User-specific flags (usando user properties en Firebase)
- Percentage rollouts (configurado en Firebase Console)
- A/B testing support (Firebase A/B Testing)
- Override flags en desarrollo (__DEV__ mode)
- Flag analytics (integración con @superapp/analytics)
- Environment-based flags (dev, staging, prod)
- Minimum fetch interval configuration
- Auto-activation de fetched values

---

## Archivos Comunes para Todos los Packages

### package.json Template
```json
{
  "name": "@superapp/[package-name]",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "19.1.0",
    "react-native": "0.81.5"
  },
  "devDependencies": {
    "@superapp/config": "workspace:*",
    "typescript": "~5.7.2"
  }
}
```

### tsconfig.json Template
```json
{
  "extends": "@superapp/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### index.ts Template (Barrel Export)
```typescript
// Export all from subdirectories
export * from './core';
export * from './hooks';
export * from './utils';
export * from './types';
```

---

## Orden de Implementación Recomendado

Configuraremos los packages uno por uno en el siguiente orden:

### Fase 1: Fundación
1. **@superapp/shared** - Base para todos los demás packages
2. **@superapp/storage** - Necesario para auth y flags

### Fase 2: Conectividad
3. **@superapp/api** - Cliente HTTP base

### Fase 3: Autenticación
4. **@superapp/auth** - Sistema de autenticación JWT

### Fase 4: Servicios
5. **@superapp/services** - Lógica de negocio con TanStack Query

### Fase 5: Observabilidad
6. **@superapp/analytics** - Tracking y error monitoring
7. **@superapp/flags** - Feature flags con Firebase Remote Config

### NO AHORA:
- **@superapp/database** - Se configurará después (usuario lo hará manualmente)

---

## Integración en Apps

### Estructura de Imports en Apps
```typescript
// vidacamara/app/_layout.tsx
import { QueryProvider } from '@superapp/services/providers';
import { AnalyticsProvider } from '@superapp/analytics';
import { AuthGuard } from '@superapp/auth/guards';

export default function RootLayout() {
  return (
    <QueryProvider>
      <AnalyticsProvider>
        <AuthGuard>
          <Stack />
        </AuthGuard>
      </AnalyticsProvider>
    </QueryProvider>
  );
}
```

### Uso en Screens
```typescript
// vidacamara/app/(tabs)/profile.tsx
import { useAuth, useLogout } from '@superapp/auth/hooks';
import { useUserProfile, useUpdateUser } from '@superapp/services/hooks/user';
import { useTrackScreen } from '@superapp/analytics/hooks';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const { mutate: updateUser } = useUpdateUser();

  useTrackScreen('Profile Screen');

  // Component logic...
}
```

---

## Verificación de Cumplimiento

### Checklist por Package

#### Todos los packages deben tener:
- ✅ `package.json` con exports configurados
- ✅ `tsconfig.json` extendiendo de `@superapp/config`
- ✅ `src/index.ts` como barrel export
- ✅ Estructura de carpetas organizada
- ✅ 100% compatibilidad con React Native y Expo
- ✅ Tipado completo con TypeScript
- ✅ Peer dependencies de React 19 y React Native 0.81.5
- ✅ Scripts de `check-types` en package.json

#### Packages específicos:
- ✅ **@superapp/storage**: Soporte iOS, Android, Web
- ✅ **@superapp/api**: Axios configurado para React Native
- ✅ **@superapp/database**: Expo SQLite (no Node.js SQLite)
- ✅ **@superapp/auth**: SecureStore para tokens (no localStorage)
- ✅ **@superapp/analytics**: SDKs de React Native (no web SDKs)

---

## Notas Técnicas Importantes

### React Native Considerations
1. **No usar librerías de Node.js** (fs, path, crypto nativo)
2. **Usar Expo equivalents** cuando sea posible
3. **Polyfills** para APIs web (URL, btoa, atob) cuando sean necesarias
4. **AsyncStorage** en vez de localStorage
5. **SecureStore** para datos sensibles
6. **NetInfo** para detección de red

### TypeScript Configuration
- Usar `module: "ESNext"` y `moduleResolution: "bundler"`
- Habilitar `verbatimModuleSyntax: true`
- Path mappings en `tsconfig.json` de las apps

### Expo Compatibility
- Todas las dependencias deben ser compatibles con Expo Go
- Evitar módulos nativos que requieran custom native code
- Usar Expo SDK modules cuando sea posible

### Performance
- Tree-shaking habilitado con exports específicos
- Lazy loading de módulos grandes
- Code splitting en packages grandes

---

## Archivos Críticos a Modificar

### En cada package:
1. `packages/[package]/package.json` - **CREAR**
2. `packages/[package]/tsconfig.json` - **CREAR**
3. `packages/[package]/src/index.ts` - **CREAR**
4. Estructura de carpetas según el plan

### En workspace root:
1. `turbo.json` - Asegurar que tasks estén configuradas
2. No modificar `package.json` root (ya maneja workspaces)

---

## Dependencias Globales Necesarias

### Packages que se instalarán (sin especificar versión):

**@superapp/shared:**
- Ya usa `zod` del workspace root (v4.1.13)

**@superapp/storage:**
- `@react-native-async-storage/async-storage`
- `expo-secure-store`
- `react-native-mmkv`

**@superapp/api:**
- `axios`
- `axios-retry`

**@superapp/auth:**
- `jwt-decode`
- `zustand`

**@superapp/services:**
- `@tanstack/react-query`

**@superapp/analytics:**
- `@sentry/react-native`
- `posthog-react-native`
- `@amplitude/analytics-react-native`

**@superapp/flags:**
- `@react-native-firebase/app`
- `@react-native-firebase/remote-config`
- `zustand`

**Nota:** Todos los packages usan `zod` v4.1.13 del workspace root.

---

## Resumen de Cambios Clave del Plan

### Ajustes Realizados:
1. **Zod v4**: Se usará la versión 4.1.13 ya instalada en el workspace root
2. **Sin versiones en bun add**: Todos los comandos de instalación usan `bun add [package]` sin versión específica
3. **Database eliminado**: El package `@superapp/database` NO se configurará ahora (se hará después manualmente)
4. **Services con Screaming Architecture**: Estructura reorganizada donde cada dominio contiene sus propias carpetas de hooks, queries, mutations y schemas
5. **Sin lógica de auth en services**: El package `@superapp/services` NO depende de `@superapp/auth` ni tiene dominio de autenticación
6. **Flags con Firebase Remote Config**: Se usa `@react-native-firebase/app` y `@react-native-firebase/remote-config` en vez de API custom

### Total de Packages a Configurar: 7
1. @superapp/shared
2. @superapp/storage
3. @superapp/api
4. @superapp/auth
5. @superapp/services
6. @superapp/analytics
7. @superapp/flags

---

## Próximos Pasos

Una vez aprobado este plan, procederemos a configurar los packages uno por uno en el orden especificado, comenzando con **@superapp/shared** como base fundamental.
