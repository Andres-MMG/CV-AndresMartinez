import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  featured?: boolean;
}

export const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const projects: Project[] = [
    {
      title: 'InteliAI',
      description: 'Landing page para plataforma de agentes IA. Incluye planes de precios, integración con MercadoPago, demos de chat IA y formularios inteligentes.',
      image: '/logoInteliAi.png',
      url: 'https://inteliai.cl',
      tags: ['AI', 'React', 'TypeScript','Tailwind', 'MercadoPago', 'Landing Page'],
      featured: true
    },
    {
      title: 'Dashboard InteliAI',
      description: 'Panel para gestión de agentes IA con monitoreo en tiempo real. Permite configurar conocimiento, integraciones y visualizar métricas de rendimiento.',
      image: '/DashBoardInteliAI.png',
      url: 'https://dashboard.inteliai.cl',
      tags: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Redis', 'Dashboard', 'Analytics'],
      featured: true
    },
    {
      title: 'Ars Perpetuum',
      description: 'E-commerce de arte con gestión de inventario y pagos online.',
      image: '/arsperpetuum.webp',
      url: 'https://arsperpetuum.cl',
      tags: ['WordPress', 'WooCommerce', 'E-commerce','MercadoPago'],
    },
    {
      title: 'OK Fugas',
      description: 'Web para detección de fugas con sistema de citas y formulario IA.',
      image: '/okfugas.png',
      url: 'https://www.okfugas.cl',
      tags: ['WordPress', 'PHP', 'Scheduling', 'AI'],
    },
    {
      title: 'Dr. House',
      description: 'Web para detección de aguas con gestor de servicios, citas y chatbot IA.',
      image: '/dr-house.png',
      url: 'https://dr-house.cl',
      tags: ['React', 'TypeScript', 'PHP', 'WordPress', 'AI', 'Chatbots'],
    }
  ];

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  const filteredProjects = selectedTag 
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Mis Proyectos
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
            Todos
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
            <h3 className="text-xl font-semibold mb-6 text-blue-400" data-aos="fade-right" data-aos-delay="200">Proyectos Destacados</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map((project, index) => (
                  <div 
                    key={index}
                    data-aos="zoom-in" 
                    data-aos-delay={300 + (index * 100)}
                    className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all border border-gray-700 hover:border-blue-500/30"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative">
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center">
                          {project.title}
                          <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4 opacity-70" />
                        </h4>
                        <p className="text-white font-medium mb-4 text-shadow-sm shadow-black text-sm md:text-base">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
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
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-blue-500/10 transition-all border border-gray-700 hover:border-blue-500/30"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative h-36 md:h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center">
                      {project.title}
                      <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4 opacity-70" />
                    </h4>
                    <p className="text-gray-300 text-xs md:text-sm mb-4 line-clamp-2 md:line-clamp-3" dangerouslySetInnerHTML={{ __html: project.description.replace(/(gestión|inventario|sistema|agenda|facturación|detección|IA|chatbot)/g, '<span class="font-semibold text-white">$1</span>') }} />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-md bg-blue-600/20 text-blue-300"
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
    </section>
  );
};