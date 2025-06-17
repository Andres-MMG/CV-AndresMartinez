# 📋 JSON Resume Implementation

Este proyecto implementa el estándar **JSON Resume Schema v1.0.0** para estructurar la información del currículum de manera estandarizada y reutilizable.

## 🎯 ¿Qué es JSON Resume?

[JSON Resume](https://jsonresume.org/) es un estándar abierto para crear currículums en formato JSON. Permite:

- ✅ **Estructura estandarizada** para datos de CV
- 🔄 **Intercambio fácil** entre plataformas
- 🛠️ **Herramientas y validadores** automáticos
- 🎨 **Múltiples temas** y formatos de salida
- 📊 **Análisis y métricas** automatizadas

## 📁 Estructura del Proyecto

```
CV-AndresMartinez/
├── src/resume.json         # ARCHIVO ÚNICO DE DATOS - EDITAR SOLO ESTE
├── schema.json             # JSON Resume Schema v1.0.0
└── src/hooks/
    └── useResumeData.ts    # Hook React que importa directamente src/resume.json
```

⚠️ **IMPORTANTE:**
- **SOLO EDITAR** el archivo `src/resume.json`
- Este es el ÚNICO archivo de datos del currículum
- La aplicación lo importa directamente sin necesidad de copias ni sincronizaciones

## 🚀 Flujo de trabajo directo - UN SOLO ARCHIVO

### ✏️ Edición
Edita **EXCLUSIVAMENTE** el archivo `src/resume.json`. 

Este es el **ÚNICO** archivo de datos. **NO HAY COPIAS NI SINCRONIZACIONES**.

### 🔄 Desarrollo y construcción
La aplicación importa directamente el archivo `src/resume.json`:

```bash
npm run dev      # Inicia el servidor de desarrollo 
npm run build    # Construye la aplicación
```

## 📋 Formato del archivo resume.json

El archivo `src/resume.json` sigue el estándar de [JSON Resume Schema v1.0.0](https://jsonresume.org/schema/) y contiene:

- **basics**: Información personal y de contacto
- **work**: Experiencia laboral
- **education**: Formación académica
- **skills**: Habilidades técnicas
- **languages**: Idiomas
- **interests**: Intereses
- **projects**: Proyectos destacados
   💼 Posición: Ingeniero de Software Senior
   🏢 Experiencias laborales: 4
   🎓 Educación: 2
   🛠️  Habilidades: 8
   📱 Proyectos: 3
   🌐 Redes sociales: 3
   🗣️  Idiomas: 2
```

### Servidor HTTP

```bash
# Servir resume.json vía HTTP en puerto 3001
npm run serve-resume
```

**Endpoints disponibles:**
- `http://localhost:3001/resume.json` - Resume completo
- `http://localhost:3001/health` - Health check

## 📊 Estructura del JSON Resume

### Secciones Principales

| Sección | Descripción | Estado |
|---------|-------------|--------|
| `basics` | Información personal y contacto | ✅ Completo |
| `work` | Experiencia laboral | ✅ Completo |
| `education` | Formación académica | ✅ Completo |
| `skills` | Habilidades técnicas | ✅ Completo |
| `projects` | Proyectos destacados | ✅ Completo |
| `languages` | Idiomas | ✅ Completo |
| `interests` | Intereses | ✅ Completo |
| `volunteer` | Voluntariado | ❌ No implementado |
| `awards` | Premios | ❌ No implementado |
| `certificates` | Certificaciones | ❌ No implementado |
| `publications` | Publicaciones | ❌ No implementado |
| `references` | Referencias | ❌ No implementado |

### Ejemplo de Estructura

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "Andrés Martínez Gajardo",
    "label": "Ingeniero de Software Senior",
    "email": "andres.martinez.g@gmail.com",
    "phone": "+56 9 55155418",
    "url": "https://andresmmartinez.com",
    "summary": "Ingeniero de Software Senior con más de 20 años...",
    "location": {
      "city": "Santiago",
      "countryCode": "CL",
      "region": "Región Metropolitana"
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "Andres-MMG",
        "url": "https://github.com/Andres-MMG"
      }
    ]
  },
  "work": [...],
  "education": [...],
  "skills": [...],
  "projects": [...],
  "languages": [...],
  "interests": [...]
}
```

## 🔧 Integración React

### Hook personalizado: `useResumeData`

```typescript
import { useResumeData } from './hooks/useResumeData';

const MyComponent = () => {
  const { 
    resume, 
    loading, 
    error,
    getFullName,
    getCurrentJob,
    getContactInfo 
  } = useResumeData();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{getFullName()}</h1>
      <p>{getCurrentJob()?.position}</p>
    </div>
  );
};
```

### Funciones de utilidad

- `getFullName()` - Nombre completo
- `getCurrentJob()` - Trabajo actual
- `getContactInfo()` - Información de contacto
- `getSocialProfiles()` - Perfiles sociales
- `getFeaturedProjects(limit?)` - Proyectos destacados
- `formatDate(date, locale)` - Formatear fechas

## 🌐 Acceso Web

### URLs públicas

- **Resume JSON**: `https://tu-dominio.com/resume.json`
- **CV Imprimible**: `https://tu-dominio.com/cv-print.html`
- **Aplicación Web**: `https://tu-dominio.com/`

### CORS y seguridad

El archivo `resume.json` está configurado para ser accesible públicamente con headers CORS apropiados.

## 🛠️ Herramientas Externas

### JSON Resume CLI

```bash
# Instalar CLI global
npm install -g resume-cli

# Usar con nuestro resume
resume serve --resume http://localhost:3001/resume.json
resume export resume.html --resume http://localhost:3001/resume.json
resume export resume.pdf --resume http://localhost:3001/resume.json
```

### Validadores Online

- [JSON Resume Validator](https://jsonresume.org/schema/)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)

## 📈 Métricas y Estadísticas

### Estadísticas actuales

```
📊 Resume Stats:
├── 👤 Información personal: Completa
├── 💼 Experiencias laborales: 4
├── 🎓 Educación: 2 títulos
├── 🛠️  Habilidades: 8 categorías
├── 📱 Proyectos: 3 destacados
├── 🌐 Perfiles sociales: 3
└── 🗣️  Idiomas: 2
```

### Completitud del perfil

- **Secciones básicas**: 100% ✅
- **Secciones opcionales**: 42% 🟡
- **Validez del esquema**: 100% ✅

## 🔄 Actualización y Mantenimiento

### Proceso de actualización

1. **Editar** `src/resume.json`
2. **Probar** localmente con `npm run dev`
3. **Desplegar** cambios con `npm run build`

### Control de versiones

- Usamos el campo `meta.version` para versionado semántico
- El campo `meta.lastModified` se actualiza automáticamente

## 🚨 Solución de Problemas

### Error: "Failed to resolve import"

```bash
# Mover resume.json a carpeta src
mv resume.json src/resume.json

# O usar carga dinámica (recomendado)
# Ver implementación en useResumeData.ts
```

### Error de validación

```bash
# Verificar esquema
npm run validate-resume

# Comparar con schema.json
diff resume.json schema.json
```

### JSON inválido

```bash
# Validar sintaxis JSON
node -e "JSON.parse(require('fs').readFileSync('src/resume.json', 'utf8'))"
```

## 📚 Recursos Adicionales

- 📖 [JSON Resume Documentation](https://jsonresume.org/schema/)
- 🛠️ [Resume Builder](https://registry.jsonresume.org/)
- 🎨 [Themes Gallery](https://jsonresume.org/themes/)
- 📝 [Schema Specification](https://github.com/jsonresume/resume-schema)
- 🔧 [Community Tools](https://github.com/jsonresume)

---

✅ **Estado**: Implementación completa con JSON Resume Schema v1.0.0  
📅 **Última actualización**: Diciembre 2024  
🔗 **Especificación**: https://jsonresume.org/schema/
