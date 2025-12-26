# Network Detection Utilities

Utilidades y hooks para detectar la conexión a internet y calidad de red en React Native y Expo.

## Instalación

El package `@superapp/shared` ya incluye `@react-native-community/netinfo` como dependencia.

## Hooks Disponibles

### `useNetwork()`

Hook completo para monitorear el estado de la red.

```tsx
import { useNetwork } from '@superapp/shared/hooks';

function MyComponent() {
  const {
    isConnected,        // boolean - Conectado a alguna red
    isInternetReachable, // boolean | null - Internet accesible
    type,               // string | null - Tipo de conexión (wifi, cellular, etc)
    quality,            // ConnectionQuality - Calidad de conexión
    isOnline,           // boolean - Online y con internet
    isOffline,          // boolean - Sin conexión o sin internet
    isPoorConnection,   // boolean - Conexión pobre
    isGoodConnection,   // boolean - Conexión buena o excelente
    networkInfo,        // NetworkInfo | null - Info completa
  } = useNetwork();

  if (isOffline) {
    return <Text>Sin conexión a internet</Text>;
  }

  if (isPoorConnection) {
    return <Text>Conexión lenta detectada</Text>;
  }

  return <Text>Conectado con {quality} calidad</Text>;
}
```

### `useOnline()`

Hook simple para verificar si el dispositivo está online.

```tsx
import { useOnline } from '@superapp/shared/hooks';

function MyComponent() {
  const isOnline = useOnline();

  if (!isOnline) {
    return <OfflineMessage />;
  }

  return <OnlineContent />;
}
```

### `useConnectionQuality()`

Hook para monitorear la calidad de la conexión.

```tsx
import { useConnectionQuality } from '@superapp/shared/hooks';

function VideoPlayer() {
  const { quality, isPoor, isModerate, isGood, isExcellent, isOffline } = useConnectionQuality();

  // Ajustar calidad de video según conexión
  const videoQuality = isExcellent || isGood ? 'hd' : isPoor ? 'low' : 'medium';

  return <Video quality={videoQuality} />;
}
```

## Utilidades

### NetworkUtils

Clase con métodos estáticos para trabajar con la red.

```tsx
import { NetworkUtils } from '@superapp/shared/utils';

// Obtener estado actual
const state = await NetworkUtils.getNetworkState();

// Verificar conexión
const connected = await NetworkUtils.isConnected();

// Verificar si internet es accesible
const reachable = await NetworkUtils.isInternetReachable();

// Obtener tipo de conexión
const type = await NetworkUtils.getConnectionType(); // 'wifi', 'cellular', etc

// Obtener información completa
const info = await NetworkUtils.getNetworkInfo();

// Verificar si la conexión es pobre
const poor = await NetworkUtils.hasPoorConnection();

// Verificar si la conexión es buena
const good = await NetworkUtils.hasGoodConnection();

// Suscribirse a cambios
const unsubscribe = NetworkUtils.subscribe((state) => {
  console.log('Network changed:', state);
});
```

### Funciones Convenience

```tsx
import {
  isConnected,
  isInternetReachable,
  getConnectionType,
  getNetworkInfo,
  hasPoorConnection,
  hasGoodConnection,
  subscribeToNetworkChanges,
} from '@superapp/shared/utils';

// Usar directamente
const connected = await isConnected();
const info = await getNetworkInfo();
```

## Tipos

### ConnectionQuality

```typescript
enum ConnectionQuality {
  EXCELLENT = "excellent",  // WiFi, 5G, Ethernet
  GOOD = "good",            // 4G
  MODERATE = "moderate",    // 3G, Cellular sin info
  POOR = "poor",            // 2G
  OFFLINE = "offline",      // Sin conexión
}
```

### NetworkInfo

```typescript
interface NetworkInfo {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;              // 'wifi', 'cellular', 'ethernet', etc
  quality: ConnectionQuality;
  effectiveType: string | null;     // '2g', '3g', '4g', '5g' para cellular
}
```

## Casos de Uso

### Mostrar Banner Offline

```tsx
import { useOnline } from '@superapp/shared/hooks';

function OfflineBanner() {
  const isOnline = useOnline();

  if (isOnline) return null;

  return (
    <View style={styles.banner}>
      <Text>Sin conexión a internet</Text>
    </View>
  );
}
```

### Deshabilitar Funciones con Mala Conexión

```tsx
import { useNetwork } from '@superapp/shared/hooks';

function UploadButton() {
  const { isPoorConnection, isOffline } = useNetwork();
  const disabled = isPoorConnection || isOffline;

  return (
    <Button
      disabled={disabled}
      onPress={handleUpload}
      title={disabled ? "Conexión insuficiente" : "Subir archivo"}
    />
  );
}
```

### Ajustar Comportamiento por Calidad

```tsx
import { useConnectionQuality } from '@superapp/shared/hooks';

function ImageGallery() {
  const { quality } = useConnectionQuality();

  const imageQuality = {
    excellent: 'high',
    good: 'high',
    moderate: 'medium',
    poor: 'low',
    offline: 'low',
  }[quality];

  return <Images quality={imageQuality} />;
}
```

### Mostrar Advertencia en Tiempo Real

```tsx
import { useNetwork } from '@superapp/shared/hooks';

function DataWarning() {
  const { type, quality } = useNetwork();

  if (type === 'cellular' && quality === 'poor') {
    return (
      <Alert>
        Estás usando datos móviles con conexión lenta.
        El contenido puede tardar en cargar.
      </Alert>
    );
  }

  return null;
}
```

## Compatibilidad

✅ iOS  
✅ Android  
✅ Web (con detección limitada)  
✅ Expo Go  
✅ Expo Development Build  
✅ React Native CLI  

## Notas

- En Web, la detección de calidad es limitada
- `isInternetReachable` puede ser `null` en algunos casos mientras se verifica
- Los hooks se suscriben automáticamente a cambios de red
- La calidad se determina por tipo de red:
  - WiFi/Ethernet/5G → Excellent
  - 4G → Good
  - 3G → Moderate
  - 2G → Poor
