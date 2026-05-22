# TP_5 - App React Native con Expo

Este proyecto es una app móvil creada con Expo y React Native. Utiliza navegación de pestañas (`BottomTabNavigator`) y un stack para la pantalla de lista/detalle.

Se realizaron todos los ejercicios.
El repositorio es https://github.com/GraceVargas/app_react_native

## Pantallas

- `Inicio` (HomeStack)
  - `ListaScreen`
    - Muestra una lista de contactos.
    - Cada contacto tiene un botón para ver el detalle.
  - `DetalleScreen`
    - Muestra los datos del contacto seleccionado (nombre y teléfono).

- `Buscar`
  - `SearchScreen`
    - Pantalla de búsqueda con texto de ejemplo.

- `Mi cuenta`
  - `PersonScreen`
    - Pantalla de perfil/usuario con texto de ejemplo.

## Funcionalidades

- Navegación con pestañas en la parte inferior.
- Stack de navegación para `Lista` y `Detalle` dentro de la pestaña `Inicio`.
- Carga de iconos de `@expo/vector-icons` para las pestañas.
- Selección de contacto desde la lista para navegar al detalle.

## Estructura principal

- `App.tsx` - Configura la navegación principal de la app.
- `navigation/HomeStack.tsx` - Define el stack de `Lista` y `Detalle`.
- `screens/ListaScreen.tsx` - Lista de contactos y botón para ver detalle.
- `screens/DetalleScreen.tsx` - Detalle del contacto seleccionado.
- `screens/SearchScreen.tsx` - Pantalla de búsqueda.
- `screens/PersonScreen.tsx` - Pantalla de cuenta/usuario.
- `db.ts` - Datos de los contactos.
- `types/navigation.ts` - Tipos de navegación para TypeScript.

## Cómo correr la app

1. Instala dependencias:

```bash
npm install
```

2. Inicia Expo:

```bash
npm run start
```

3. Abre la app en un emulador o dispositivo físico:

- Presioná `a` para Android
- Presioná `i` para iOS
- O escaneá el código QR con Expo Go

## Notas

- El proyecto usa Expo SDK `^55.0.11`.
- Si faltan dependencias, ejecutá `npm install` antes de iniciar.
- Para ver cambios en vivo, mantené el servidor de Expo abierto.
