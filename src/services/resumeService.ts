// Servicio para leer directamente resume.json y aplicar traducciones si es necesario
import resumeData from '../resume.json';
import { SupportedLocale } from '../context/LanguageContext';

export interface ResumeTranslations {
  [key: string]: {
    [locale: string]: string;
  }
}

// Esta función permite obtener versiones traducidas de campos específicos
export const getTranslatedResumeField = (
  field: string,
  locale: SupportedLocale,
  defaultValue: string
): string => {
  // Verificamos si hay un campo de traducción para este campo
  const translationField = `${field}Translations`;
  if (
    resumeData.basics && 
    translationField in resumeData.basics &&
    resumeData.basics[translationField as keyof typeof resumeData.basics]
  ) {
    const translations = resumeData.basics[translationField as keyof typeof resumeData.basics] as Record<string, string>;
    return translations[locale] || defaultValue;
  }
  return defaultValue;
};

// Función para obtener resumen con traducciones aplicadas
export const getTranslatedResume = (locale: SupportedLocale) => {
  // Copia profunda del objeto resume para no modificar el original
  const translatedResume = JSON.parse(JSON.stringify(resumeData));
  
  // Aplicamos traducciones a campos específicos
  if (translatedResume.basics) {
    // Traducir el resumen (summary)
    if (translatedResume.basics.summaryTranslations) {
      translatedResume.basics.summary = 
        translatedResume.basics.summaryTranslations[locale] || 
        translatedResume.basics.summary;
    }
    
    // Aquí puedes añadir más campos para traducir
  }
  
  // Traducir experiencia laboral si hay traducciones disponibles
  if (translatedResume.work) {
    translatedResume.work = translatedResume.work.map((job: any) => {
      // Traducir posición si existe la traducción
      if (job[`position_${locale}`]) {
        job.position = job[`position_${locale}`];
      }
      
      // Traducir resumen si existe la traducción
      if (job[`summary_${locale}`]) {
        job.summary = job[`summary_${locale}`];
      }
      
      // Traducir destacados (highlights) si existen traducciones
      if (job.highlights && job[`highlights_${locale}`]) {
        job.highlights = job[`highlights_${locale}`];
      }
      
      return job;
    });
  }
  
  return translatedResume;
};

export default {
  getTranslatedResume,
  getTranslatedResumeField
};
