import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

export const Education: React.FC = () => {
  const { t } = useLanguage();
  const { resume, loading } = useResumeData();
  
  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center text-gray-400">
            Cargando educación...
          </div>
        </div>
      </section>
    );
  }

  const education = resume.education || [];
  
  return (
    <section className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('education.title')}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all shadow-md hover:shadow-blue-500/10" 
              data-aos="fade-right" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="text-blue-400 text-sm font-semibold mb-2">
                {edu.startDate} - {edu.endDate}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {edu.studyType} en {edu.area}
              </h3>
              <p className="text-gray-300">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};