# Lista de Verificación para Despliegue

Este documento proporciona una lista de verificación para asegurar que el sitio se despliegue correctamente en producción.

## 1. Verificación de Rutas de Imágenes

Todas las imágenes deben ser referenciadas con rutas absolutas desde la raíz del sitio. Asegúrate de que todas las rutas de imágenes en los componentes apunten correctamente a los archivos en la carpeta `public`:

- ✅ Imagen en Header: `/Andres.png` (no `/src/components/images/Andres.png`)
- ✅ Imagen en Footer: `/Andres.png` (no `/src/components/images/Andres.png`)
- ✅ Imagen en About: `/torectangulo.png` (no `/src/components/images/torectangulo.png`)
- ✅ Imágenes en Projects: 
  - `/logoInteliAi.png`
  - `/DashBoardInteliAI.png`
  - `/arsperpetuum.webp`
  - `/okfugas.png`
  - `/dr-house.png`

## 2. Configuración de Favicon

Asegúrate de que los favicons estén configurados correctamente en `index.html`:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="/Andres.png">
```

## 3. Archivos de Configuración para Despliegue

Verifica que estos archivos estén correctamente configurados:

- ✅ `vite.config.ts` - Configurado con rutas absolutas y servidor
- ✅ `nginx.conf` - MIME types y configuración para Single Page Application
- ✅ `.htaccess` - Configuración para Apache
- ✅ `vercel.json` - Configuración para Vercel

## 4. Pruebas en Producción

Después del despliegue, verifica:

1. Que todas las imágenes se carguen correctamente
2. Que el favicon aparezca en la pestaña del navegador
3. Que no haya errores de MIME type en la consola del navegador
4. Que la navegación funcione correctamente (rutas)
5. Que el sitio se vea bien en dispositivos móviles

## 5. Prueba de Rendimiento

Ejecuta Lighthouse en Chrome DevTools para verificar el rendimiento, accesibilidad, SEO y mejores prácticas del sitio.

## 6. Optimización para Dispositivos Móviles

- ✅ Textos de proyectos acortados para mejor visualización en móviles
- ✅ Tamaños de fuente responsive (más pequeños en móvil)
- ✅ Altura de imágenes reducida en dispositivos móviles
- ✅ Límite de líneas visible en descripciones (line-clamp-2 en móvil)

## 7. Script de Prueba Local

Utiliza el script `test-build.ps1` para:
- Verificar que todas las imágenes necesarias estén en la carpeta `public`
- Generar una compilación de producción
- Iniciar un servidor local para probar la versión de producción

```powershell
# Ejecuta desde PowerShell
.\test-build.ps1
```

## Notas para Coolify

- Asegúrate de que Nginx esté configurado correctamente con el archivo `nginx.conf` proporcionado
- Verifica que todos los archivos estáticos estén siendo servidos con los MIME types correctos
- Si hay problemas con los MIME types, revisa la configuración en `nginx.conf`
- Para móviles, asegúrate que la visualización sea correcta en pantallas pequeñas
