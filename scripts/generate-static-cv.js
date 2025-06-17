// Script para generar versiones estáticas del CV imprimible
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga del resume.json
import resumeJson from '../src/resume.json' assert { type: 'json' };
const resumeData = resumeJson;

// Traducciones
const translations = {
  es: {
    title: 'CV - Andrés Martínez Gajardo',
    experience: 'Experiencia Profesional',
    education: 'Educación',
    skills: 'Habilidades Técnicas',
    present: 'Actual'
  },
  en: {
    title: 'Resume - Andrés Martínez Gajardo',
    experience: 'Professional Experience',
    education: 'Education',
    skills: 'Technical Skills',
    present: 'Present'
  },
  'pt-BR': {
    title: 'Currículo - Andrés Martínez Gajardo',
    experience: 'Experiência Profissional',
    education: 'Educação',
    skills: 'Habilidades Técnicas',
    present: 'Atual'
  }
};

// Aplicar traducciones para los resúmenes
const getLocalizedSummary = (locale) => {
  if (resumeData.basics?.summaryTranslations && resumeData.basics.summaryTranslations[locale]) {
    return resumeData.basics.summaryTranslations[locale];
  }
  return resumeData.basics?.summary || '';
};

// Formatear fecha
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  if (dateStr.includes('-')) {
    const [year, month] = dateStr.split('-');
    return `${month}/${year}`;
  }
  return dateStr;
};

// Función para generar el HTML del CV para un idioma específico
const generateResumeHtml = (locale) => {
  const trans = translations[locale] || translations.es;
  const summary = getLocalizedSummary(locale);
  
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${trans.title}</title>
    <link rel="icon" href="/Andres.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/Andres.ico" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            color: #1f2937; /* gray-800 */
        }
        .section-title {
            border-bottom: 2px solid #3b82f6; /* blue-500 */
            padding-bottom: 0.5rem; /* 8px */
            margin-bottom: 1.5rem; /* 24px */
            font-size: 1.25rem; /* 20px */
            line-height: 1.75rem; /* 28px */
            font-weight: 600; /* semibold */
            color: #1e3a8a; /* blue-800 */
        }
        .job-title {
            font-size: 1.125rem; /* 18px */
            line-height: 1.75rem; /* 28px */
            font-weight: 600; /* semibold */
            color: #111827; /* gray-900 */
        }
        .company-location-date {
            font-size: 0.875rem; /* 14px */
            line-height: 1.25rem; /* 20px */
            color: #4b5563; /* gray-600 */
            margin-bottom: 0.5rem; /* 8px */
        }
        @media print {
            body {
                font-size: 10pt;
                color: #000000;
            }
            .no-print {
                display: none !important;
            }
            .container {
                box-shadow: none !important;
                border-width: 0 !important;
            }
            @page {
                margin: 1.5cm;
            }
        }
    </style>
</head>
<body class="bg-gray-100">
    <!-- Botón de impresión - solo visible en navegador -->
    <div class="fixed top-4 right-4 no-print">
        <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors">
            Imprimir
        </button>
        <a href="/" class="ml-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors inline-block">
            Volver
        </a>
    </div>

    <!-- Contenido del CV -->
    <div class="max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg">
        <!-- Encabezado -->
        <header class="mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">${resumeData.basics?.name || ''}</h1>
                    <p class="text-xl text-blue-700">${resumeData.basics?.label || ''}</p>
                </div>
                
                <div class="mt-4 md:mt-0 text-right">
                    <p class="mb-1">${resumeData.basics?.email || ''}</p>
                    <p class="mb-1">${resumeData.basics?.phone || ''}</p>
                    ${resumeData.basics?.location ? 
                      `<p>${resumeData.basics.location.city || ''}, ${resumeData.basics.location.countryCode || ''}</p>` : 
                      ''}
                </div>
            </div>
            
            <div class="border-t border-gray-300 pt-4">
                <p class="text-sm text-gray-700">${summary}</p>
            </div>
        </header>
        
        <!-- Experiencia Profesional -->
        <section class="mb-8">
            <h2 class="section-title">${trans.experience}</h2>
            ${(resumeData.work || []).map(job => {
              const dateRange = job.startDate ? 
                `${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : trans.present}` : 
                '';
              
              return `
                <div class="mb-6">
                    <h3 class="job-title">${job.position || ''}</h3>
                    <p class="company-location-date">
                        ${job.name || ''} | ${job.location || ''} | ${dateRange}
                    </p>
                    <p class="text-sm mb-2">${job.summary || ''}</p>
                    ${job.highlights && job.highlights.length ? `
                        <ul class="list-disc list-inside pl-4 text-sm">
                            ${job.highlights.map(highlight => `
                                <li class="mb-1">${highlight}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
              `;
            }).join('')}
        </section>
        
        <!-- Educación -->
        <section class="mb-8">
            <h2 class="section-title">${trans.education}</h2>
            ${(resumeData.education || []).map(edu => {
              const dateRange = edu.startDate ? 
                `${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : trans.present}` : 
                '';
              
              return `
                <div class="mb-4">
                    <h3 class="job-title">${edu.studyType || edu.area || ''}</h3>
                    <p class="company-location-date">
                        ${edu.institution || ''} | ${dateRange}
                    </p>
                    ${edu.description ? `<p class="text-sm">${edu.description}</p>` : ''}
                </div>
              `;
            }).join('')}
        </section>
    </div>
</body>
</html>`;
};

// Generar HTML para cada idioma y guardar en public
const languages = ['es', 'en', 'pt-BR'];

languages.forEach(lang => {
  const fileName = lang === 'es' ? 'cv-print.html' : `cv-print-${lang}.html`;
  const htmlContent = generateResumeHtml(lang);
    fs.writeFileSync(
    path.join(__dirname, '..', 'public', fileName),
    htmlContent,
    'utf8'
  );
  
  console.log(`CV en ${lang} generado como ${fileName}`);
});
