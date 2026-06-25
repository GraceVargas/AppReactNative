# 📱 WatchList - App de Gestión de Libros, Películas y Series

**Aplicación móvil desarrollada con React Native + Expo para gestionar y hacer seguimiento de libros, películas y series.**

## Descripción del proyecto

WatchList es una aplicación que permite a los usuarios:

- 📚 **Registrarse** con email y contraseña
- 📖 **Agregar libros, películas o series** a su lista personal
- 🔍 **Buscar libros** en la base de datos de Open Library
- ⭐ **Dar calificaciones** (1-5 estrellas) cuando termina un item
- ✍️ **Escribir reseñas** sobre lo que leyó/vio
- 📸 **Capturar fotos** con cámara o elegir de galería
- 🗂️ **Clasificar items** por estado: Pendiente, En curso, Terminado
- 💾 **Sincronizar datos** con almacenamiento local

## Funcionalidades principales

### 1. Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Validación de credentials
- Sesión persistida en AsyncStorage

### 2. Gestión de Items (CRUD)
- **Crear:** Agregar nuevos items con foto, tipo, título, autor
- **Leer:** Listar items filtrados por tipo (libro, película, serie)
- **Actualizar:** Cambiar estado, rating, escribir reseña
- **Eliminar:** Borrar items con confirmación

### 3. Búsqueda
- Integración con Open Library API
- Búsqueda de libros por título o autor
- Vista previa con portada del libro
- Agregar resultados directamente a la lista

### 4. Navegación
- Tab navigation (3 pestañas principales)
- Stack navigation para items
- Condicional Stack/Tab según autenticación

## Stack Tecnológico

### Dependencias principales

- **expo:** 55.0.11 - Framework y toolkit
- **react-native:** 0.83.4 - Framework base
- **react:** 19.2.0 - Librería React
- **@react-navigation/native:** 7.2.2 - Navegación base
- **@react-navigation/native-stack:** 7.14.11 - Stack navigator
- **@react-navigation/bottom-tabs:** 7.15.9 - Tab navigator
- **@react-native-async-storage/async-storage:** 2.2.0 - Persistencia local
- **expo-image-picker:** 55.0.20 - Selección de fotos
- **@expo/vector-icons:** 15.1.1 - Iconos de interfaz
- **react-native-safe-area-context:** 5.7.0 - Safe area en todos los dispositivos

### Herramientas de desarrollo

- **typescript:** 5.9.2 - Tipado estático
- **@types/react:** 19.2.10 - Tipos para React

## Estructura de carpetas

```
app_react_native/
│
├── App.tsx                      # Componente raíz de la aplicación
├── index.ts                     # Entrada principal
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
├── tsconfig.json                # Configuración de TypeScript
│
├── assets/                      # Recursos (imágenes, iconos, splash)
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
├── screens/                     # Pantallas principales
│   ├── LoginScreen.tsx          # Login de usuario
│   ├── RegisterScreen.tsx       # Registro de usuario
│   ├── HomeScreen.tsx           # Lista de items con tabs
│   ├── AddItemScreen.tsx        # Agregar nuevo item
│   ├── ItemDetailScreen.tsx     # Detalle y edición de item
│   ├── SearchScreen.tsx         # Búsqueda en Open Library
│   └── PersonScreen.tsx         # Perfil de usuario
│
├── components/                  # Componentes reutilizables
│   ├── ItemCard.tsx             # Tarjeta de item en lista
│   ├── ItemsList.tsx            # Lista de items (FlatList)
│   ├── EmptyState.tsx           # Estado vacío con CTA
│   └── ScreenContainer.tsx      # Wrapper con SafeArea
│
├── navigation/                  # Configuración de navegación
│   ├── RootNavigator.tsx        # Orquestador de Stack/Tab
│   ├── AuthStack.tsx            # Stack para autenticación
│   └── HomeStack.tsx            # Stack para items
│
├── hooks/                       # Custom hooks
│   ├── useAuth.ts               # Lógica de autenticación
│   ├── useItem.ts               # Lógica de items (CRUD)
│   ├── useSearch.tsx            # Lógica de búsqueda
│   └── useImagePicker.ts        # Lógica de foto (cámara/galería)
│
├── context/                     # Context API
│   ├── AuthContext.tsx          # Contexto de autenticación
│   └── ItemContext.tsx          # Contexto de items
│
├── services/                    # Llamadas a APIs externas
│   └── openLibrary.ts           # API de Open Library
│
├── storage/                     # Persistencia en AsyncStorage
│   ├── authStorage.ts           # Almacenamiento de usuarios
│   └── itemsStorage.ts          # Almacenamiento de items
│
├── types/                       # Definiciones de tipos TypeScript
│   ├── types.ts                 # Tipos principales
│   └── navigation.ts            # Tipos de navegación
│
├── utils/                       # Funciones auxiliares
│   └── index.ts                 # Validación de correo
├── constants.ts                 # Constantes (colores, textos, etc.)
├── declarations.d.ts            # Declaraciones de tipos para librerías
└── README.md                    # Este archivo
```

## Cómo instalar y ejecutar

### Requisitos previos

- **Node.js:** v18.0 o superior
- **npm:** v9.0 o superior (incluido con Node.js)
- **Expo CLI:** Recomendado instalar globalmente
  ```bash
  npm install -g expo-cli
  ```
- **Dispositivo o emulador:**
  - Android: Emulador de Android Studio o dispositivo con Android 6+
  - iOS: Emulador de Xcode o dispositivo con iOS 13+
  - Web: Navegador moderno

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/GraceVargas/app_react_native.git
   cd app_react_native
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

### Ejecución

#### Con Expo Go (más rápido)

```bash
npm run start
```

Luego escanear el código QR con:
- **Android:** Expo Go app → Scan QR
- **iOS:** Cámara → Scan QR

#### En emulador específico

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

### Comandos disponibles

```json
{
  "start": "expo start",           // Iniciar servidor de desarrollo
  "android": "expo start --android", // Abrir en emulador Android
  "ios": "expo start --ios",       // Abrir en emulador iOS
  "web": "expo start --web"        // Abrir en navegador
}
```

## Justificación de librerías externas

### 1. @react-navigation (Stack + Bottom Tabs)
- **¿Por qué?** React Navigation es el estándar en React Native para gestionar rutas
- **Alternativas:** React Router (no recomendado), Native Navigation (deprecado)
- **Decisión:** Stack para auth flow + Bottom Tabs para app principal

### 2. @react-native-async-storage
- **¿Por qué?** Persistencia local de datos sin necesidad de backend
- **Alternativas:** SQLite, Realm, Firebase
- **Decisión:** Suficiente para este proyecto (datos < 10MB)

### 3. expo-image-picker
- **¿Por qué?** API de Expo para acceder a cámara y galería sin permisos nativos complicados
- **Alternativas:** react-native-image-picker, expo-camera
- **Decisión:** Expo mantiene todo centralizado

### 4. @expo/vector-icons (Ionicons)
- **¿Por qué?** Iconos vectoriales escalables y ligeros
- **Alternativas:** Imágenes PNG (más pesadas), FontAwesome
- **Decisión:** Ionicons es el estándar en Expo

### 5. react-native-safe-area-context
- **¿Por qué?** Manejo correcto de notches, home indicators, etc.
- **Alternativas:** SafeAreaView nativa
- **Decisión:** Soporte más consistente en múltiples dispositivos

## Guía de uso

### Primer inicio

1. Presionar **"¿No tenés cuenta? Registrate"**
2. Ingresar email y contraseña (mín. 4 caracteres)
3. Aceptar términos y crear cuenta
4. Iniciar sesión con las credenciales

### Agregar un item

1. Desde la pestaña **Inicio**
2. Presionar botón **+ Agregar**
3. Seleccionar tipo (Libro, Película, Serie)
4. Completar título (obligatorio)
5. Agregar autor/director (opcional)
6. Capturar/elegir foto (opcional)
7. Guardar

### Cambiar estado de un item

1. Presionar en un item para verlo
2. Cambiar entre estados: Pendiente → En curso → Terminado
3. Si está terminado: agregar rating (⭐) y reseña

### Buscar libros

1. Ir a pestaña **Buscar Libros**
2. Escribir título o autor
3. Presionar Buscar
4. Presionar **+** para agregar a tu lista

## Decisiones técnicas

### Por qué Context API y no Redux?

- ✅ Menor bundle size
- ✅ Suficiente para esta escala
- ✅ Más fácil de entender para principiantes
- ✅ Menos boilerplate

*Si la app crece > 100 componentes, considerar Zustand o Redux*

### Por qué AsyncStorage y no una base de datos?

- ✅ No requiere backend
- ✅ Persist keys por usuario
- ✅ Suficiente para < 10,000 items

*Si necesita sincronización en tiempo real → Firebase*


## Notas de desarrollo

### AsyncStorage
- Limite práctico: ~10MB
- Cada usuario tiene su propio `items_userId`
- Los usuarios se almacenan en clave global `users`

### Open Library API
- Libre y sin autenticación
- Límite: ~100 requests por IP (por día)
- Respuesta puede variar según disponibilidad

### Permisos
- Cámara: Solicitado cuando presiona "Agregar foto"
- Galería: Solicitado cuando elige "Galería"

## Limitaciones conocidas

1. ⚠️ Contraseñas en texto plano en AsyncStorage (usar auth encriptada en producción)
2. ⚠️ Sin sincronización en la nube (datos locales solo)
3. ⚠️ No soporta offline-first (requiere conexión para búsqueda)
4. ⚠️ Ratings solo como número (sin análisis de sentimiento)

## Mejoras futuras

- [ ] Integración con Firebase para sincronización
- [ ] Dark mode
- [ ] Compartir lista con amigos
- [ ] Recomendaciones basadas en ratings
- [ ] Estadísticas de lectura
- [ ] Exportar datos a PDF

## Declaración sobre Inteligencia Artificial

**Durante el desarrollo de este proyecto:**

- ✅ Se utilizó Claude para:
  - Autocompletar código
  - Sugerir estructuras de componentes
  - Generar estilos CSS boilerplate
  
- ✅ Se utilizó ChatGPT para:
  - Debugging de errores específicos
  - Consultas sobre patrones de React Native
  
- ❌ No se utilizó IA para:
  - Diseño arquitectónico (realizado por estudiante)
  - Lógica de CRUD (realizado por estudiante)
  - Decisiones de tipo de navegación (realizado por estudiante)

**Conclusión:** El código base, estructura y decisiones arquitectónicas son originales del estudiante. IA se usó como asistente, no como generador.

## Testing manual

Para verificar que todo funciona:

```
[ ] Registro con email válido
[ ] Login con credenciales correctas/incorrectas
[ ] Agregar item (con y sin foto)
[ ] Cambiar estado de item
[ ] Dar rating a item terminado
[ ] Escribir reseña
[ ] Eliminar item
[ ] Buscar libro en Open Library
[ ] Agregar libro encontrado
[ ] Logout
```

## Repositorio

**GitHub:** https://github.com/GraceVargas/app_react_native

## Autor

**Grace Vargas**  
Instituto de Formación Técnica Superior  
Desarrollo de Apps Móvil - 2026