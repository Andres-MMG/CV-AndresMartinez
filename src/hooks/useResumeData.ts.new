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
    fluency?: string;
    languageTranslations?: Translations;
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
  
  // Función para obtener el nombre completo
  const getFullName = () => {
    return resume.basics?.name || 'Nombre no disponible';
  };

  // Función para obtener el trabajo actual
  const getCurrentJob = () => {
    if (!resume.work || resume.work.length === 0) return null;
    
    // Encontrar el trabajo sin fecha de finalización (trabajo actual)
    const currentJob = resume.work.find(job => !job.endDate);
    return currentJob || resume.work[0]; // Si no hay actual, devolver el primero
  };
  
  const getSkillsByCategory = () => {
    if (!resume.skills) return {};
    
    // Categorías predefinidas basadas en el idioma seleccionado
    const categories: Record<string, string> = {
      'languages': locale === 'es' ? 'Lenguajes de Programación' : 
                   locale === 'en' ? 'Programming Languages' : 
                   'Linguagens de Programação',
      'frameworks': locale === 'es' ? 'Frameworks y Librerías' : 
                   locale === 'en' ? 'Frameworks and Libraries' : 
                   'Frameworks e Bibliotecas',
      'databases': locale === 'es' ? 'Bases de Datos' : 
                   locale === 'en' ? 'Databases' : 
                   'Bancos de Dados',
      'tools': locale === 'es' ? 'Herramientas' : 
                locale === 'en' ? 'Tools' : 
                'Ferramentas',
      'cloud': locale === 'es' ? 'Servicios Cloud' : 
               locale === 'en' ? 'Cloud Services' : 
               'Serviços em Nuvem',
      'methods': locale === 'es' ? 'Metodologías' : 
                 locale === 'en' ? 'Methodologies' : 
                 'Metodologias',
      'softskills': locale === 'es' ? 'Soft Skills' : 
                    locale === 'en' ? 'Soft Skills' : 
                    'Habilidades Interpessoais',
      'architecture': locale === 'es' ? 'Arquitectura' : 
                      locale === 'en' ? 'Architecture' : 
                      'Arquitetura',
      'management': locale === 'es' ? 'Gestión de Proyectos' : 
                    locale === 'en' ? 'Project Management' : 
                    'Gerenciamento de Projetos',
      'hardware': locale === 'es' ? 'Hardware y Comunicaciones' : 
                  locale === 'en' ? 'Hardware and Communications' : 
                  'Hardware e Comunicações',
      'os': locale === 'es' ? 'Sistemas Operativos' : 
            locale === 'en' ? 'Operating Systems' : 
            'Sistemas Operacionais',
      'modeling': locale === 'es' ? 'Modelado' : 
                  locale === 'en' ? 'Modeling' : 
                  'Modelagem',
      'mobile': locale === 'es' ? 'Desarrollo Móvil' : 
                locale === 'en' ? 'Mobile Development' : 
                'Desenvolvimento Móvel',
      'other': locale === 'es' ? 'Otros' : 
               locale === 'en' ? 'Others' : 
               'Outros'
    };
    
    // Organizar skills por categoría
    const skillsByCategory: Record<string, any[]> = {};
    
    resume.skills.forEach(skill => {
      const category = skill.category || 'other';
      
      // Si la categoría no existe en el objeto, crearla
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      
      // Añadir la skill a la categoría correspondiente
      skillsByCategory[category].push(skill);
    });
    
    // Crear un objeto con el formato final
    const result: Record<string, { name: string, skills: any[] }> = {};
    
    Object.keys(skillsByCategory).forEach(category => {
      const displayName = categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
      
      result[category] = {
        name: displayName,
        skills: skillsByCategory[category]
      };
      
      // Añadir las keywords como habilidades individuales
      result[category].skills = result[category].skills.flatMap(skill => {
        if (!skill.keywords || skill.keywords.length === 0) {
          return [skill];
        }
        
        // Crear una entrada por cada keyword
        const keywordSkills: any[] = [];
        (skill.keywords || []).forEach((keyword: string) => {
          keywordSkills.push({
            name: keyword,
            level: skill.level,
            category: skill.category,
            icon: skill.icon
          });
        });
        
        return keywordSkills;
      });
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
    return {
      email: resume.basics?.email || '',
      phone: resume.basics?.phone || '',
      location: resume.basics?.location ? 
        `${resume.basics.location.city}, ${resume.basics.location.countryCode}` : '',
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
};
