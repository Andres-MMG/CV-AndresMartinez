import React, { useState } from 'react';

type SkillCategory = 'languages' | 'frameworks' | 'tools' | 'devops' | 'database' | 'ai';

interface Skill {
  name: string;
  proficiency: number; // 1-5
  category: SkillCategory;
  isNew?: boolean;
}

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

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

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Habilidades Técnicas
          </span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as SkillCategory | 'all')}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500/30 transition-all shadow-md hover:shadow-blue-500/10"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-white flex items-center">
                  {skill.name}
                  {skill.isNew && (
                    <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      NUEVO
                    </span>
                  )}
                </h3>
                <span className="text-xs text-gray-400">
                  {getProficiencyLabel(skill.proficiency)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  style={{ width: `${skill.proficiency * 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
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