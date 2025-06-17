import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedResume } from '../services/resumeService';
import { JSONResume } from '../hooks/useResumeData';

export const PrintableResume: React.FC = () => {
  const { t, locale } = useLanguage();
  const [resume, setResume] = useState<any>(getTranslatedResume(locale));

  useEffect(() => {
    document.title = `CV - ${resume.basics?.name || t('common.resume')}`;
  }, [resume.basics?.name, t]);

  // Actualizar el resumen cuando cambie el idioma
  useEffect(() => {
    setResume(getTranslatedResume(locale));
  }, [locale]);

  // Formatear fecha para la experiencia laboral
  const formatJobDate = (startDate?: string, endDate?: string): string => {
    if (!startDate) return '';
    
    const formatDate = (dateStr: string) => {
      if (dateStr.includes('-')) {
        const [year, month] = dateStr.split('-');
        return `${month}/${year}`;
      }
      return dateStr;
    };
    
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : t('common.present');
    
    return `${start} - ${end}`;
  };
  // Agrupar habilidades por categoría
  const getSkillsByCategory = () => {
    const skills = resume.skills || [];
    const skillsByCategory: Record<string, any[]> = {};
    
    skills.forEach((skill: any) => {
      const category = skill.category || 'Other';
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(skill);
    });
    
    return skillsByCategory;
  };
  
  const skillsByCategory = getSkillsByCategory();

  return (
    <div className="bg-white min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      {/* Botón de impresión - Solo visible en pantalla */}
      <div className="no-print mb-4 text-right">
        <button 
          onClick={() => window.print()}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          {t('common.print')}
        </button>
      </div>
      
      {/* Encabezado */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{resume.basics?.name}</h1>
            <p className="text-xl text-blue-700">{resume.basics?.label}</p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <p className="mb-1">{resume.basics?.email}</p>
            <p className="mb-1">{resume.basics?.phone}</p>
            {resume.basics?.location && (
              <p>{resume.basics.location.city}, {resume.basics.location.countryCode}</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-700">{resume.basics?.summary}</p>
        </div>
      </header>
        {/* Experiencia Profesional */}
      <section className="mb-8">
        <h2 className="section-title">{t('experience.title')}</h2>
        
        {(resume.work || []).map((job: any, index: number) => (
          <div key={index} className="mb-6">
            <h3 className="job-title">{job.position}</h3>
            <p className="company-location-date">
              {job.name} | {job.location} | {formatJobDate(job.startDate, job.endDate)}
            </p>
            <p className="text-sm mb-2">{job.summary}</p>
            
            {job.highlights && job.highlights.length > 0 && (
              <ul className="list-disc list-inside pl-4 text-sm">
                {job.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="mb-1">{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
      
      {/* Educación */}
      <section className="mb-8">
        <h2 className="section-title">{t('education.title')}</h2>
        
        {(resume.education || []).map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="job-title">{edu.studyType || edu.area}</h3>
            <p className="company-location-date">
              {edu.institution} | {formatJobDate(edu.startDate, edu.endDate)}
            </p>
            {edu.description && <p className="text-sm">{edu.description}</p>}
          </div>
        ))}
      </section>
      
      {/* Habilidades Técnicas */}
      <section>
        <h2 className="section-title">{t('skills.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-gray-700">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-800 mb-1">{category}</h4>
              <ul className="list-disc list-inside pl-2 text-sm">
                {skills.map((skill, idx) => (
                  <li key={idx}>{skill.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
        {/* Estilo inline para imprimir - lo definimos en el CSS global */}
      {/* Las reglas de impresión se agregan en un archivo CSS global o en el head del documento */}
    </div>
  );
};

export default PrintableResume;
