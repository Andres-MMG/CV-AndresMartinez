import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

export const Experience: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const { t } = useContext(LanguageContext);
  const { resume, loading, formatDate } = useResumeData();

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando experiencia...</p>
        </div>
      </section>
    );
  }

  const experiences = resume.work || [];
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('experience.title')}
          </span>
        </h2>

        <div className="relative">
          {/* Línea temporal */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-600 hidden md:block"></div>
          
          <div className="space-y-8">
            {displayedExperiences.map((experience, index) => {
              const isExpanded = expandedItems.includes(index);
              const highlights = experience.highlights || [];
              const startDate = formatDate(experience.startDate);
              const endDate = experience.endDate ? formatDate(experience.endDate) : t('about.present');

              return (
                <div 
                  key={index}
                  className="relative"
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                >
                  {/* Punto en la línea temporal */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 hidden md:block z-10"></div>
                  
                  <div className="md:ml-20 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {experience.position}
                        </h3>
                        <p className="text-blue-400 font-semibold">
                          {experience.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {experience.location}
                        </p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                          {startDate} - {endDate}
                        </span>
                      </div>
                    </div>

                    {/* Descripción principal */}
                    {experience.summary && (
                      <p className="text-gray-300 mb-4">
                        {experience.summary}
                      </p>
                    )}

                    {/* Highlights */}
                    {highlights.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-gray-200 font-semibold mb-2">{t('experience.mainAchievements')}:</h4>
                        <ul className="space-y-2">
                          {(isExpanded ? highlights : highlights.slice(0, 3)).map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start">
                              <span className="text-blue-400 mr-2 mt-1 text-sm">▸</span>
                              <span className="text-gray-300 text-sm leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Botón para expandir/contraer highlights */}
                        {highlights.length > 3 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                          >
                            {isExpanded ? `${t('experience.viewLess')} ↑` : `${t('experience.viewAll')} (${highlights.length}) ↓`}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Enlace a la empresa */}
                    {experience.url && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <a
                          href={experience.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          {t('experience.visitWebsite')} {experience.name}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón para mostrar más experiencias */}
          {experiences.length > 3 && (
            <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="300">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-blue-500/25"
              >
                {showAll ? t('experience.viewLessExperiences') : `${t('experience.viewAllExperiences')} (${experiences.length})`}
              </button>
            </div>
          )}

          {/* Estadísticas de experiencia */}
          <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-semibold mb-6 text-center text-white">
              {t('experience.summary')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {experiences.length}
                </div>
                <div className="text-sm text-gray-400">{t('experience.stats.companies')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  20+
                </div>
                <div className="text-sm text-gray-400">{t('experience.stats.years')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {experiences.filter(exp => !exp.endDate).length}
                </div>
                <div className="text-sm text-gray-400">{t('experience.stats.current')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {experiences.reduce((total, exp) => total + (exp.highlights?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-400">{t('experience.stats.achievements')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
