import resumeData from '../resume.json';
import { useLanguage } from '../context/LanguageContext';

// Tipo para traducciones en múltiples idiomas
export interface Translations {
  en?: string;
  es?: string;
  'pt-BR'?: string;
}

// Tipo para el resume basado en JSON Resume Schema con soporte para traducciones
export interface JSONResume {
  $schema?: string;
  basics?: {
    name?: string;
    label?: string;
    labelTranslations?: Translations;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;    
    summaryTranslations?: Translations;
    location?: {
      address?: string;
      postalCode?: string;
      city?: string;
      countryCode?: string;
      region?: string;
    };
    birthDate?: string;
    nationality?: string;
    maritalStatus?: string;
    nationalId?: string;
    profiles?: Array<{
      network?: string;
      username?: string;
      url?: string;
    }>;
  };
  work?: Array<{
    name?: string;
    position?: string;
    positionTranslations?: Translations;
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    summaryTranslations?: Translations;
    highlights?: string[];
    highlightsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    location?: string;
    description?: string;
    descriptionTranslations?: Translations;
  }>;
  volunteer?: Array<{
    organization?: string;
    position?: string;
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    institution?: string;
    url?: string;
    area?: string;
    areaTranslations?: Translations;
    studyType?: string;
    studyTypeTranslations?: Translations;
    startDate?: string;
    endDate?: string;
    score?: string;
    courses?: string[];
    coursesTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    location?: string;
    highlights?: string[];
    highlightsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    description?: string;
    descriptionTranslations?: Translations;
  }>;
  awards?: Array<{
    title?: string;
    date?: string;
    awarder?: string;
    summary?: string;
  }>;
  publications?: Array<{
    name?: string;
    publisher?: string;
    releaseDate?: string;
    url?: string;
    summary?: string;
  }>;
  skills?: Array<{
    name?: string;
    nameTranslations?: Translations;
    level?: string;
    keywords?: string[];
    keywordsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    category?: string;
    categoryTranslations?: Translations;
    description?: string;
    descriptionTranslations?: Translations;
    value?: number;
    icon?: string;
  }>;
  languages?: Array<{
    language?: string;
    languageTranslations?: Translations;
    fluency?: string;
    fluencyTranslations?: Translations;
  }>;
  interests?: Array<{
    name?: string;
    nameTranslations?: Translations;
    keywords?: string[];
    keywordsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
  }>;
  references?: Array<{
    name?: string;
    reference?: string;
  }>;
  projects?: Array<{
    name?: string;
    nameTranslations?: Translations;
    description?: string;
    descriptionTranslations?: Translations;
    highlights?: string[];
    highlightsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    keywords?: string[];
    keywordsTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    startDate?: string;
    endDate?: string;
    url?: string;
    image?: string;
    roles?: string[];
    rolesTranslations?: {
      en?: string[];
      es?: string[];
      'pt-BR'?: string[];
    };
    entity?: string;
    entityTranslations?: Translations;
    type?: string;
  }>;
  meta?: {
    canonical?: string;
    version?: string;
    lastModified?: string;
  };
}

export const useResumeData = () => {
  const { locale } = useLanguage();
  
  // Crear una copia profunda para no modificar el original
  let resume = JSON.parse(JSON.stringify(resumeData)) as JSONResume; 
  
  // Función auxiliar para aplicar traducciones de un campo específico
  const applyTranslation = (obj: any, field: string, translationField: string) => {
    if (obj[translationField] && obj[translationField][locale]) {
      obj[field] = obj[translationField][locale];
    }
    return obj;
  };
  
  // Función auxiliar para aplicar traducciones a arrays
  const applyArrayTranslation = (obj: any, field: string, translationField: string) => {
    if (obj[translationField] && obj[translationField][locale]) {
      obj[field] = obj[translationField][locale];
    }
    return obj;
  };
  
  // Función para procesar recursivamente traducciones en objetos
  const processTranslations = (obj: any) => {
    if (!obj) return obj;
    
    // Procesar todos los campos que terminen con "Translations"
    Object.keys(obj).forEach(key => {
      if (key.endsWith('Translations')) {
        const baseField = key.replace('Translations', '');
        if (obj[baseField]) { // Solo si existe el campo base, aplicamos la traducción
          obj = applyTranslation(obj, baseField, key);
        }
      }
    });
    
    return obj;
  };
  
  // Aplicar traducciones a todos los objetos del resume
  
  // Procesar datos básicos
  if (resume.basics) {
    resume.basics = processTranslations(resume.basics);
    
    // Procesar perfiles (si tienen traducciones)
    if (resume.basics?.profiles) {
      resume.basics.profiles = resume.basics.profiles.map(profile => processTranslations(profile));
    }
  }
  
  // Procesar experiencia laboral
  if (resume.work) {
    resume.work = resume.work.map(job => {
      let updatedJob = processTranslations(job);
      
      // Manejar highlights como array especial
      updatedJob = applyArrayTranslation(updatedJob, 'highlights', 'highlightsTranslations');
      
      return updatedJob;
    });
  }
  
  // Procesar educación
  if (resume.education) {
    resume.education = resume.education.map(edu => {
      let updatedEdu = processTranslations(edu);
      
      // Manejar arrays especiales
      updatedEdu = applyArrayTranslation(updatedEdu, 'highlights', 'highlightsTranslations');
      updatedEdu = applyArrayTranslation(updatedEdu, 'courses', 'coursesTranslations');
      
      return updatedEdu;
    });
  }
  
  // Procesar proyectos
  if (resume.projects) {
    resume.projects = resume.projects.map(proj => {
      let updatedProj = processTranslations(proj);
      
      // Manejar arrays especiales
      updatedProj = applyArrayTranslation(updatedProj, 'highlights', 'highlightsTranslations');
      updatedProj = applyArrayTranslation(updatedProj, 'keywords', 'keywordsTranslations');
      updatedProj = applyArrayTranslation(updatedProj, 'roles', 'rolesTranslations');
      
      return updatedProj;
    });
  }
  
  // Procesar habilidades
  if (resume.skills) {
    resume.skills = resume.skills.map(skill => {
      let updatedSkill = processTranslations(skill);
      
      // Manejar keywords como array especial
      updatedSkill = applyArrayTranslation(updatedSkill, 'keywords', 'keywordsTranslations');
      
      return updatedSkill;
    });
  }
  
  // Procesar lenguajes
  if (resume.languages) {
    resume.languages = resume.languages.map(lang => processTranslations(lang));
  }
  
  // Procesar intereses
  if (resume.interests) {
    resume.interests = resume.interests.map(interest => {
      let updatedInterest = processTranslations(interest);
      
      // Manejar keywords como array especial
      updatedInterest = applyArrayTranslation(updatedInterest, 'keywords', 'keywordsTranslations');
      
      return updatedInterest;
    });
  }
  
  // Helper para obtener el nombre completo
  const getFullName = () => {
    return resume.basics?.name || '';
  };
  
  // Helper para obtener el trabajo actual
  const getCurrentJob = () => {
    const currentJob = resume.work?.find(job => !job.endDate);
    return currentJob || null;
  };
  
  // Helper para obtener las habilidades por categoría
  const getSkillsByCategory = () => {
    const skills = resume.skills || [];
    const result: any = {};
    
    skills.forEach(skill => {
      // Si no hay keywords, solo agregamos el skill como es
      if (!skill.keywords || skill.keywords.length === 0) {
        const category = skill.category || 'default';
        if (!result[category]) result[category] = [];
        result[category].push({
          name: skill.name,
          level: skill.level,
          category: skill.category,
          icon: skill.icon
        });
        return;
      }
      
      // Si hay keywords, expandimos cada uno como una skill separada
      const keywords = skill.keywords || [];
      const category = skill.category || 'default';
      
      if (!result[category]) result[category] = [];
      
      const keywordSkills = keywords.map(keyword => {
        return {
          name: keyword,
          level: skill.level,
          category: skill.category,
          icon: skill.icon
        };
      });
      
      result[category] = [...result[category], ...keywordSkills];
    });
    
    return result;
  };

  const getFeaturedProjects = (limit?: number) => {
    const projects = resume.projects || [];
    
    // Ordenar por destacados primero y luego por fecha (los más recientes primero)
    const sortedProjects = [...projects].sort((a, b) => {
      // Destacados primero
      const aFeatured = a.highlights?.some(h => h.toLowerCase().includes('featured') || h.toLowerCase().includes('destacado')) ? 1 : 0;
      const bFeatured = b.highlights?.some(h => h.toLowerCase().includes('featured') || h.toLowerCase().includes('destacado')) ? 1 : 0;
      
      if (bFeatured !== aFeatured) return bFeatured - aFeatured;
      
      // Luego por fecha, los más recientes primero
      const aDate = a.endDate || a.startDate || '';
      const bDate = b.endDate || b.startDate || '';
      return bDate.localeCompare(aDate);
    });
    
    // Limitar si es necesario
    return limit ? sortedProjects.slice(0, limit) : sortedProjects;
  };
  
  // Función para formatear fechas según el idioma seleccionado
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    // Si solo tiene año y mes (formato YYYY-MM)
    if (dateString.length === 7) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString(
        locale === 'en' ? 'en-US' : 
        locale === 'es' ? 'es-ES' : 
        'pt-BR', 
        { year: 'numeric', month: 'long' }
      );
    }
    
    // Si solo tiene año (formato YYYY)
    if (dateString.length === 4) {
      return dateString;
    }
    
    // Formato completo (YYYY-MM-DD)
    const date = new Date(dateString);
    return date.toLocaleDateString(
      locale === 'en' ? 'en-US' : 
      locale === 'es' ? 'es-ES' : 
      'pt-BR', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  // Obtener información de contacto
  const getContactInfo = () => {
    const location = resume.basics?.location;
    const locationStr = location 
      ? `${location.city || ''}, ${location.countryCode || ''}`.trim()
      : '';
    
    return {
      email: resume.basics?.email || '',
      phone: resume.basics?.phone || '',
      location: locationStr,
      website: resume.basics?.url || '',
      nationality: resume.basics?.nationality || '',
      birthDate: resume.basics?.birthDate ? formatDate(resume.basics.birthDate) : '',
      maritalStatus: resume.basics?.maritalStatus || '',
      nationalId: resume.basics?.nationalId || ''
    };
  };
  
  // Obtener perfiles sociales
  const getSocialProfiles = () => {
    return resume.basics?.profiles || [];
  };

  return {
    resume,
    loading: false,
    error: null,
    getFullName,
    getCurrentJob,
    getSkillsByCategory,
    getFeaturedProjects,
    getContactInfo,
    formatDate,
    getSocialProfiles
  };
}
