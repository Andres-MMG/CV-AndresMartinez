import React, { useState } from 'react';
import NoSkillsMessage from './NoSkillsMessage';

type SkillCategory = 'languages' | 'frameworks' | 'tools' | 'devops' | 'database' | 'ai';

interface Skill {
  name: string;
  proficiency: number; // 1-5
  category: SkillCategory;
  isNew?: boolean;
}

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [showAll, setShowAll] = useState(false);
  const skillsLimit = 12; // Número de habilidades a mostrar inicialmente

  const skills: Skill[] = [
    { name: 'C#', proficiency: 5, category: 'languages' },
    { name: 'TypeScript', proficiency: 4, category: 'languages', isNew: true },
    { name: 'JavaScript', proficiency: 4, category: 'languages' },
    { name: 'PHP', proficiency: 3, category: 'languages', isNew: true },
    { name: 'Python', proficiency: 3, category: 'languages', isNew: true },
    { name: 'Visual Basic', proficiency: 5, category: 'languages' },
    
    { name: '.NET', proficiency: 5, category: 'frameworks' },
    { name: 'ASP.NET', proficiency: 5, category: 'frameworks' },
    { name: 'Blazor', proficiency: 4, category: 'frameworks' },
    { name: 'React', proficiency: 4, category: 'frameworks', isNew: true },
    { name: 'Tailwind CSS', proficiency: 4, category: 'frameworks', isNew: true },
    { name: 'WordPress', proficiency: 3, category: 'frameworks', isNew: true },
    { name: 'WooCommerce', proficiency: 3, category: 'frameworks', isNew: true },
    
    { name: 'SQL Server', proficiency: 5, category: 'database' },
    { name: 'PostgreSQL', proficiency: 4, category: 'database', isNew: true },
    { name: 'SQLite', proficiency: 3, category: 'database', isNew: true },
    { name: 'Redis', proficiency: 3, category: 'database', isNew: true },
    { name: 'Supabase', proficiency: 3, category: 'database', isNew: true },
    
    { name: 'Docker', proficiency: 4, category: 'devops', isNew: true },
    { name: 'Git', proficiency: 4, category: 'devops' },
    { name: 'CI/CD', proficiency: 3, category: 'devops' },
    { name: 'Coolify', proficiency: 4, category: 'devops', isNew: true },
    { name: 'Caprover', proficiency: 3, category: 'devops', isNew: true },
    
    { name: 'ChatGPT', proficiency: 5, category: 'ai', isNew: true },
    { name: 'GitHub Copilot', proficiency: 5, category: 'ai', isNew: true },
    { name: 'Prompt Engineering', proficiency: 4, category: 'ai', isNew: true },
    { name: 'Agent Creation', proficiency: 4, category: 'ai', isNew: true },
    { name: 'Chatbots con IA', proficiency: 5, category: 'ai', isNew: true },
    { name: 'Formularios Inteligentes', proficiency: 4, category: 'ai', isNew: true },
    { name: 'n8n', proficiency: 4, category: 'tools', isNew: true },
    { name: 'Flowise', proficiency: 4, category: 'tools', isNew: true },
    { name: 'Evolution-API', proficiency: 4, category: 'tools', isNew: true },
    { name: 'Strapi', proficiency: 3, category: 'tools', isNew: true },
    { name: 'Odoo', proficiency: 3, category: 'tools', isNew: true },
  ];

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'languages', label: 'Lenguajes' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'database', label: 'Bases de Datos' },
    { id: 'devops', label: 'DevOps' },
    { id: 'ai', label: 'IA' },
    { id: 'tools', label: 'Herramientas' },
  ];

  // Ordenar las habilidades: primero lenguajes, luego expertos, después nuevos, finalmente por nivel
  const sortedSkills = [...skills].sort((a, b) => {
    // Primero, priorizar la categoría "languages"
    if (a.category === 'languages' && b.category !== 'languages') return -1;
    if (a.category !== 'languages' && b.category === 'languages') return 1;
    
    // Segundo, dentro de cada categoría, mostrar primero habilidades de nivel experto (5)
    if (a.proficiency === 5 && b.proficiency !== 5) return -1;
    if (a.proficiency !== 5 && b.proficiency === 5) return 1;
    
    // Tercero, ordenar por nuevos
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    
    // Por último, ordenar por nivel de experiencia (de mayor a menor)
    return b.proficiency - a.proficiency;
  });

  // Filtrar por categoría
  const categoryFilteredSkills = activeCategory === 'all' 
    ? sortedSkills
    : sortedSkills.filter(skill => skill.category === activeCategory);
  
  // Limitar la cantidad de habilidades mostradas si showAll es false
  const filteredSkills = showAll ? categoryFilteredSkills : categoryFilteredSkills.slice(0, skillsLimit);
  
  // Determinar si hay más habilidades para mostrar
  const hasMoreSkills = categoryFilteredSkills.length > skillsLimit;

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Habilidades Técnicas
          </span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12" data-aos="fade-up" data-aos-delay="100">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id as SkillCategory | 'all');
                setShowAll(false); // Restablecer showAll al cambiar de categoría
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 skills-grid">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <div 
                key={index}
                data-aos="fade-up" 
                data-aos-delay={150 + (index % 9) * 50}
                className={`bg-gray-800 rounded-lg p-4 border transition-all shadow-md ${
                  skill.proficiency === 5 
                  ? 'border-yellow-500/40 shadow-yellow-400/20 relative overflow-hidden ring-2 ring-yellow-500/20 hover:ring-yellow-500/40 hover:shadow-yellow-500/30' 
                  : 'border-gray-700 hover:border-blue-500/30 hover:shadow-blue-500/10'
                }`}
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
                    <div className="relative inline-block hover:scale-110 transition-transform">
                      {/* Capa base con glow */}
                      <div className="text-xs font-bold bg-yellow-900/20 px-1.5 py-0.5 rounded border border-yellow-500/30 glow-effect">
                        <span className="text-transparent">{getProficiencyLabel(skill.proficiency)}</span>
                      </div>
                      
                      {/* Texto amarillo brillante */}
                      <div className="absolute inset-0 flex items-center justify-center text-yellow-300 text-xs font-bold">
                        {getProficiencyLabel(skill.proficiency)}
                      </div>
                      
                      {/* Texto negro encima - aumentado el z-index para asegurar que esté por encima */}
                      <div className="absolute inset-0 flex items-center justify-center z-10" style={{transform: 'translate(-0.5px, -0.5px)'}}>
                        <span className="text-black text-shadow-sm text-xs font-bold">{getProficiencyLabel(skill.proficiency)}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1.5">
                  {skill.proficiency === 5 ? (
                    <div className="relative">
                      {/* Barra negra delgada de base */}
                      <div 
                        className="absolute h-2 top-0.5 left-0 rounded-full bg-black/80"
                        style={{ width: `${skill.proficiency * 20}%` }}
                      ></div>
                      {/* Barra amarilla brillante */}
                      <div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 animate-gentle-pulse"
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
              {showAll ? 'Ver menos' : activeCategory === 'all' ? `Ver todas (${categoryFilteredSkills.length})` : `Ver más (${categoryFilteredSkills.length - filteredSkills.length})`}
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

function getProficiencyLabel(level: number): string {
  switch (level) {
    case 1: return 'Básico';
    case 2: return 'Intermedio Bajo';
    case 3: return 'Intermedio';
    case 4: return 'Avanzado';
    case 5: return 'Experto';
    default: return 'Desconocido';
  }
}