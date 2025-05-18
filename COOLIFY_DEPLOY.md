# Configuración de Despliegue en Coolify

Este documento describe la configuración necesaria para desplegar correctamente esta aplicación React/Vite en Coolify.

## Ajustes necesarios en Coolify

### 1. Configuración General

- **Build Pack**: Static
- **Static Image**: `nginx:alpine`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Build Directory**: `/`
- **Node Version**: 20.x (o la versión que uses)

### 2. Variables de Entorno
No necesitas variables de entorno específicas para esta aplicación, pero si las necesitaras, agrégalas aquí.

### 3. Configuración de Nginx

Copia el archivo `nginx.conf` en la configuración personalizada de Nginx en Coolify:

1. Ve a la configuración de tu aplicación en Coolify
2. Encuentra la sección "Custom Nginx Configuration"
3. Pega el contenido de tu archivo nginx.conf
4. Guarda la configuración

### 4. Solución a errores comunes

Si ves errores de MIME types o problemas de carga de archivos:

- Asegúrate de que la configuración de Nginx incluye los tipos MIME correctos
- Verifica que la ruta de publicación sea `dist`
- Comprueba que el archivo index.html se sirve correctamente

## Después del despliegue

Verifica que todos los recursos se cargan correctamente inspeccionando la consola del navegador en tu sitio desplegado.
