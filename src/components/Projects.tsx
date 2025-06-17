import React, { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  tags: string[];
  featured?: boolean;
}

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { resume, getFeaturedProjects } = useResumeData();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Project images mapping
  const projectImages: Record<string, string> = {
    'inteliai': '/logoInteliAi.png',
    'dashboard': '/DashBoardInteliAI.png',
    'arsperpetuum': '/arsperpetuum.webp',
    'okfugas': '/okfugas.png',
    'drhouse': '/dr-house.png',
    'app-regional-banco-central': '/App-regional.jpeg',
    'sistemas-bancarios-itaú': 'https://images.contentstack.io/v3/assets/blt5ad73eb84118beed/blt57d15edbce1391b5/67e6e6f38af2cc6f75ffe699/header_logo.svg',
    'agentes-autónomos-de-ia': 'https://inteliai.cl/logo.png',
    // Default image if none is specified
    'default': '/torectangulo.png'
  };

  // Get projects from resume and augment them with additional properties
  const projects: Project[] = useMemo(() => {
    return (resume.projects || []).map(project => {
      // Generate an id from the project name
      const id = project.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
      
      // Determine if a project is featured (first 2 projects)
      const featured = project.highlights?.some(highlight => 
        highlight.toLowerCase().includes('featured') || highlight.toLowerCase().includes('destacado')
      );

      // Get tags from keywords or create a default set
      const tags = project.keywords || [];

      // Obtener la URL de la imagen, priorizando la del proyecto
      const imageUrl = project.image || projectImages[id] || projectImages.default;
      
      return {
        id,
        name: project.name || 'Proyecto sin nombre',
        description: project.description || '',
        // Usar la imagen del JSON si está definida, sino buscar en el mapeo, y si no usar default
        image: imageUrl,
        // Usar la URL del JSON si está definida, sino usar #
        url: project.url || '#',
        tags,
        featured
      };
    });
  }, [resume.projects]);

  const allTags = useMemo(() => {
    return Array.from(new Set(projects.flatMap(project => project.tags)));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return selectedTag 
      ? projects.filter(project => project.tags.includes(selectedTag))
      : projects;
  }, [selectedTag, projects]);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('projects.title')}
          </span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12" data-aos="fade-up" data-aos-delay="100">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTag === null
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {t('projects.filterAll')}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {(selectedTag === null) && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 text-blue-400" data-aos="fade-right" data-aos-delay="200">{t('projects.featuredProjects')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map((project, index) => (
                  <div 
                    key={index}
                    data-aos="zoom-in" 
                    data-aos-delay={300 + (index * 100)}
                    className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all border border-gray-700 hover:border-blue-500/30 flex flex-col"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                      {/* Title first for better mobile display */}
                      <div className="p-4 bg-gray-800 border-b border-gray-700">
                        <h4 className="text-lg md:text-xl font-bold text-white flex items-center">
                          {project.name}
                          <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4 opacity-70" />
                        </h4>
                      </div>

                      {/* Image container with fixed height */}
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                            project.image?.startsWith('http') ? 'object-contain p-2' : 'object-cover'
                          }`}
                        />
                      </div>
                      
                      {/* Description container */}
                      <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-gray-800 to-gray-850">
                        <p className="text-gray-300 font-medium mb-4 text-sm md:text-base flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 text-xs rounded-md bg-blue-600/30 text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter(project => !project.featured || selectedTag !== null)
            .map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up" 
                data-aos-delay={150 + (index * 50)}
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-blue-500/10 transition-all border border-gray-700 hover:border-blue-500/30 flex flex-col h-full"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                  {/* Title first for better mobile display */}
                  <div className="p-3 bg-gray-800 border-b border-gray-700">
                    <h4 className="text-base md:text-lg font-bold text-white flex items-center">
                      {project.name}
                      <ExternalLink className="ml-2 w-3 h-3 opacity-70" />
                    </h4>
                  </div>
                  
                  {/* Image container with fixed height */}
                  <div className="h-28 sm:h-32 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                        project.image?.startsWith('http') ? 'object-contain p-2' : 'object-cover'
                      }`}
                    />
                  </div>
                  
                  {/* Description container */}
                  <div className="p-3 flex flex-col flex-grow bg-gradient-to-b from-gray-800 to-gray-850">
                    <p className="text-gray-300 text-xs md:text-sm mb-4 line-clamp-2 md:line-clamp-3 flex-grow" 
                      dangerouslySetInnerHTML={{ 
                        __html: project.description.replace(
                          /(gestión|inventario|sistema|agenda|facturación|detección|IA|chatbot)/g, 
                          '<span class="font-semibold text-white">$1</span>'
                        ) 
                      }} 
                    />
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-md bg-blue-600/20 text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-xs text-blue-300">+{project.tags.length - 4}</span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};