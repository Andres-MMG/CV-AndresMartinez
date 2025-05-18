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
      description: 'Landing page promocional para la plataforma de agentes inteligentes, con presentación de diferentes planes y tarifas para empresas. Incluye integración con MercadoPago para suscripciones, demos interactivas con chat web IA y formularios inteligentes para filtrado de consultas.',
      image: '/src/components/images/logoInteliAi.png',
      url: 'https://inteliai.cl',
      tags: ['AI', 'React', 'TypeScript','Tailwind', 'MercadoPago', 'Landing Page'],
      featured: true
    },
    {
      title: 'Dashboard InteliAI',
      description: 'Panel administrativo para la gestión de agentes de IA con monitoreo en tiempo real. Permite configurar conocimiento personalizado, gestionar integraciones y visualizar métricas de rendimiento para optimizar las interacciones con usuarios.',
      image: '/src/components/images/DashBoardInteliAI.png',
      url: 'https://dashboard.inteliai.cl',
      tags: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Redis', 'Dashboard', 'Analytics'],
      featured: true
    },
    {
      title: 'Ars Perpetuum',
      description: 'Tienda en línea de productos artísticos con sistema de gestión de inventario y procesamiento de pagos.',
      image: '/src/components/images/arsperpetuum.webp',
      url: 'https://arsperpetuum.cl',
      tags: ['WordPress', 'WooCommerce', 'E-commerce','MercadoPago'],
    },
    {
      title: 'OK Fugas',
      description: 'Plataforma para empresa de detección de fugas, con sistema de gestión de citas y calendario. Incluye formulario con IA para filtrado automático',
      image: '/src/components/images/okfugas.png',
      url: 'https://www.okfugas.cl',
      tags: ['WordPress', 'PHP', 'Scheduling', 'AI'],
    },
    {
      title: 'Dr. House',
      description: 'Empresa especializada en detección de aguas con sistema de gestión de servicios, citas y calendario. Cuenta con formulario inteligente con IA y chatbot para atención al cliente. Desarrollada con React y TypeScript.',
      image: '/src/components/images/dr-house.png',
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Mis Proyectos
          </span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
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
            <h3 className="text-xl font-semibold mb-6 text-blue-400">Proyectos Destacados</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map((project, index) => (
                  <div 
                    key={index}
                    className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all border border-gray-700 hover:border-blue-500/30"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-2xl font-bold text-white mb-2 flex items-center">
                          {project.title}
                          <ExternalLink className="ml-2 w-4 h-4 opacity-70" />
                        </h4>
                        <p className="text-white font-medium mb-4 text-shadow-sm shadow-black">
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
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-blue-500/10 transition-all border border-gray-700 hover:border-blue-500/30"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                      {project.title}
                      <ExternalLink className="ml-2 w-4 h-4 opacity-70" />
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: project.description.replace(/(gestión|inventario|sistema|agenda|facturación|detección)/g, '<span class="font-semibold text-white">$1</span>') }} />
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