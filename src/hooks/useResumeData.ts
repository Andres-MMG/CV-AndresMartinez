import resumeData from '../resume.json';
import { useLanguage } from '../context/LanguageContext';

// Tipo para el resume basado en JSON Resume Schema
export interface JSONResume {
  $schema?: string;
  basics?: {
    name?: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;    
    summaryTranslations?: {
      en?: string;
      es?: string;
      'pt-BR'?: string;
    };
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
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
    location?: string;
    description?: string;
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
    studyType?: string;
    startDate?: string;
    endDate?: string;
    score?: string;
    courses?: string[];
    location?: string;
    highlights?: string[];
    description?: string;
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
    level?: string;
    keywords?: string[];
    category?: string;
    description?: string;
    value?: number;
    icon?: string;
  }>;
  languages?: Array<{
    language?: string;
    fluency?: string;
  }>;
  interests?: Array<{
    name?: string;
    keywords?: string[];
  }>;
  references?: Array<{
    name?: string;
    reference?: string;
  }>;
  projects?: Array<{
    name?: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
    image?: string;
    roles?: string[];
    entity?: string;
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
  let resume = resumeData as JSONResume;
  
  // Aplicar traducciones según el idioma actual
  if (resume.basics?.summaryTranslations && resume.basics.summaryTranslations[locale as keyof typeof resume.basics.summaryTranslations]) {
    resume = {
      ...resume,
      basics: {
        ...resume.basics,
        summary: resume.basics.summaryTranslations[locale as keyof typeof resume.basics.summaryTranslations]
      }
    };
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
    
    // Categorías predefinidas
    const categories: Record<string, string> = {
      'languages': 'Lenguajes de Programación',
      'frameworks': 'Frameworks y Librerías',
      'databases': 'Bases de Datos',
      'tools': 'Herramientas',
      'cloud': 'Servicios Cloud',
      'methods': 'Metodologías',
      'softskills': 'Soft Skills',
      'architecture': 'Arquitectura',
      'management': 'Gestión de Proyectos',
      'hardware': 'Hardware y Comunicaciones',
      'os': 'Sistemas Operativos',
      'modeling': 'Modelado',
      'mobile': 'Desarrollo Móvil',
      'other': 'Otros'
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
  // Función para formatear fechas
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    // Si solo tiene año y mes (formato YYYY-MM)
    if (dateString.length === 7) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('es', { year: 'numeric', month: 'long' });
    }
    
    // Si solo tiene año (formato YYYY)
    if (dateString.length === 4) {
      return dateString;
    }
    
    // Formato completo (YYYY-MM-DD)
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' });
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
}
