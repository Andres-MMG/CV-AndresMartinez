import React, { useState, useContext, useMemo } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';
import NoSkillsMessage from './NoSkillsMessage';

interface SkillItem {
  name: string;
  proficiency: number;
  category: string;
  isNew?: boolean;
  keywords?: string[];
}

export const Skills: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const { resume } = useResumeData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const skillsLimit = 12; // Número de habilidades a mostrar inicialmente

  const allSkills = resume.skills || [];

  // Función para obtener la etiqueta de proficiencia
  const getProficiencyLevel = (level?: string): number => {
    switch (level?.toLowerCase()) {
      case 'expert': return 5;
      case 'advanced': return 4;
      case 'intermediate': return 3;
      case 'beginner': return 2;
      case 'basic': return 1;
      default: return 3; // Default intermediate
    }
  };

  // Función para obtener la etiqueta de proficiencia traducida
  const getProficiencyLabel = (level: number): string => {
    switch (level) {
      case 1: return t('skills.levels.basic');
      case 2: return t('skills.levels.lowIntermediate');
      case 3: return t('skills.levels.intermediate');
      case 4: return t('skills.levels.advanced');
      case 5: return t('skills.levels.expert');
      default: return t('skills.levels.unknown');
    }
  };
  // Obtener las categorías desde las habilidades del JSON
  const categories = useMemo(() => {
    // Extraer las categorías de las habilidades
    const skillCategories = allSkills.map(skill => skill.name || '');
    // Agregar la categoría "all" al principio
    return [
      { id: 'all', label: t('skills.categories.all') },
      ...skillCategories.map(category => ({ 
        id: category, 
        label: category 
      }))
    ];
  }, [allSkills, t]);

  // Convertir las habilidades del JSON al formato que espera el componente
  const processedSkills: SkillItem[] = useMemo(() => {
    return allSkills.flatMap(skill => {
      const category = skill.name || '';
      const proficiencyLevel = getProficiencyLevel(skill.level);
      
      // Si hay keywords, crear una habilidad para cada keyword
      return (skill.keywords || []).map(keyword => ({
        name: keyword,
        proficiency: proficiencyLevel,
        category: category,
        keywords: skill.keywords
      }));
    });
  }, [allSkills]);

  // Ordenar las habilidades: primero por nivel de proficiencia
  const sortedSkills = useMemo(() => {
    return [...processedSkills].sort((a, b) => {
      // Ordenar por nivel de experiencia (de mayor a menor)
      return b.proficiency - a.proficiency;
    });
  }, [processedSkills]);

  // Filtrar por categoría
  const categoryFilteredSkills = useMemo(() => {
    return activeCategory === 'all' 
      ? sortedSkills
      : sortedSkills.filter(skill => skill.category === activeCategory);
  }, [sortedSkills, activeCategory]);
  
  // Limitar la cantidad de habilidades mostradas si showAll es false
  const filteredSkills = showAll ? categoryFilteredSkills : categoryFilteredSkills.slice(0, skillsLimit);
  
  // Determinar si hay más habilidades para mostrar
  const hasMoreSkills = categoryFilteredSkills.length > skillsLimit;
  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('skills.title')}
          </span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 skills-grid">
         {filteredSkills.length > 0 ? (
           filteredSkills.map((skill, index) => (
             <div 
                key={`${skill.category}-${skill.name}-${index}`}
                data-aos="fade-up" 
                data-aos-delay={150 + (index % 9) * 50}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500/30 transition-all shadow-md hover:shadow-blue-500/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-white flex items-center">
                    {skill.name}
                    {skill.isNew && (
                      <span className="ml-1 text-[10px] bg-blue-600/30 text-blue-200 px-1 py-0 rounded-full border border-blue-400/30">
                        new
                      </span>
                    )}
                  </h3>
                  {skill.proficiency === 5 ? (
                    <span className="text-xs text-blue-400 font-semibold">
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1.5">
                  {skill.proficiency === 5 ? (
                    <div className="relative">
                      {/* Capa de brillo base */}
                      <div 
                        className="absolute h-2.5 rounded-full bg-blue-500/20 blur-sm"
                        style={{ width: `${skill.proficiency * 20 + 5}%` }}
                      ></div>
                      {/* Barra principal con efecto de pulso sutil */}
                      <div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse-subtle relative"
                        style={{ width: `${skill.proficiency * 20}%` }}
                      ></div>
                    </div>
                  ) : (
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      style={{ width: `${skill.proficiency * 20}%` }}
                    ></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <NoSkillsMessage />
          )}
        </div>
        
        {hasMoreSkills && (
         <div className="flex justify-center mt-10">
           <button
             onClick={() => setShowAll(!showAll)}
             className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-100 rounded-lg transition-all shadow-md hover:shadow-blue-500/20 flex items-center gap-2"
             data-aos="fade-up"
           >
              {showAll
                ? t('skills.showLess')
                : activeCategory === 'all'
                  ? `${t('skills.showAll')} (${categoryFilteredSkills.length})`
                  : `${t('skills.showMore')} (${categoryFilteredSkills.length - filteredSkills.length})`}
               <span className={`transition-transform ${showAll ? 'rotate-180' : ''}`}>
                 ↓
               </span>
             </button>
           </div>
         )}
       </div>
     </section>
   );
};