import React, { useState } from 'react';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'banking' | 'tech'>('all');
  const [showAll, setShowAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const experiences = [
    {
      period: 'AGO 2024 - PRESENTE',
      company: 'M&L AI SpA.',
      position: 'Fundador & CEO / Ingeniero de Software',
      description: [
        'Fundador y líder técnico de M&L AI SpA., una startup innovadora especializada en soluciones de IA empresarial. Creador de InteliAI (inteliai.cl), una plataforma SaaS que permite implementar agentes conversacionales personalizados con conexión a múltiples redes sociales.',
        'Arquitecto principal en el diseño e implementación de infraestructura cloud, utilizando Docker para orquestación de contenedores, gestión de VPS, DNS, y servicios de hosting mediante Coolify.',
        'La plataforma InteliAI ofrece una suite completa de agentes autónomos para diversos escenarios:',
        '• Asistente Personal: maneja tus citas, lee y envía correos, responde por ti en WhatsApp y otras redes sociales conectadas.',
        '• Recepcionistas virtuales y asistentes para gestión de agendas.',
        '• Sistemas de procesamiento automático de correos y recordatorios.',
        '• Agentes especializados para sectores inmobiliarios y médicos.',
        '• Verificación de pagos y creación de facturas.',
        '• Lectura de medios, imágenes y PDF para alimentar sistemas de inventarios y otros sistemas.',
        'Diseño e integración de arquitectura de microservicios utilizando .NET C# y Python, con interfaces modernas en React.',
        'Implementación de tecnologías emergentes como Redis para caché, y herramientas de automatización IA (n8n, Flowise, Chatwoot).',
        'Liderazgo en investigación de IA, incluyendo ingeniería de prompts y aplicación del .NET Semantic Kernel para procesamiento de lenguaje natural.',
        'Para conocer más sobre nuestra plataforma de agentes inteligentes, visita InteliAI.cl'
      ],
      category: 'tech'
    },
    {
      period: 'ENE 2015 - JUL 2024',
      company: 'Sermaluc S.A.',
      position: 'Jefe de proyectos TI',
      description: [
        'Proyectos en Banco Central: Desarrollo y mantenimiento de la "App Regional" utilizando .NET y Blazor WebAssembly, con especial foco en la visualización de estadísticas en tiempo real y un prototipo en MAUI.',
        'Proyectos en Banco Itaú: Diseño e implementación de soluciones internas en entornos .NET / .NET Core, elaboración de flujos para la plataforma MUREX y desarrollo de APIs REST para la automatización de procesos bancarios.',
        'Proyectos en Banco Estado:',
        '• Proyecto Seguros FIDENS (2015-2016): Implementación de WebServices externos para la obtención y venta de seguros.',
        '• Proyecto Matriz Documental (2016-2018): Sistema para generar múltiples documentos PDF con FileNet.',
        '• Proyecto Carpeta Electrónica Cliente (2016-2018): Sistema de visualización de documentos de productos contratados.',
        '• Proyecto ActiveX Digitalización de Imágenes (2016-2018): Implementación para manejo de escáneres con WIA y TWAIN.',
        '• Proyecto Estructurante de Crédito: Evaluación comercial de clientes PYME.',
        'Liderazgo y coordinación de equipos de desarrollo, fomentando la adopción progresiva de prácticas DevOps y sistemas de control de versiones mediante Git.'
      ],
      category: 'banking'
    },
    {
      period: 'ABR 2007 - NOV 2014',
      company: 'Sermaluc S.A.',
      position: 'Ingeniero de Software',
      description: [
        'Integrando el equipo de Mantención que mantiene la aplicación Venta Crédito Hipotecario (VCH) Banco Estado.',
        'Realizo tareas como:',
        '• Coordinación del proyecto.',
        '• Análisis y desarrollo de nuevas funcionalidades.',
        '• Mejoras en las piezas de software relacionadas con el proyecto.'
      ],
      category: 'banking'
    },
    {
      period: 'ABR 2007 - DIC 2010',
      company: 'KITeknology Kepler InterMedia',
      position: 'Analista Desarrollador',
      description: [
        'Coordinación y desarrollo del proyecto Venta Crédito Hipotecario (VCH) para Banco Estado.',
        'Desarrollo de WORKFLOW Bitácora para control de etapas en sucursales.',
        'Otros proyectos:',
        '• Corrección de incidentes para Banco Itaú en sistema de Cartolas Clientes.',
        '• Análisis y desarrollo del Proyecto SACU Bansander AFP.',
        '• Implementación de validación de clave usuaria contra PreviRed mediante WebServices.'
      ],
      category: 'banking'
    },
    {
      period: 'JUL 2001 - FEB 2007',
      company: 'Newsystems Ltda.',
      position: 'Analista Desarrollador',
      description: [
        'Principales responsabilidades:',
        '• Desarrollo del sistema ColWeb® (Colegio en la Web) para ServiPyme, filial del Banco del Desarrollo.',
        '• Análisis y desarrollo de OteWeb para Escuelas de Conductores.',
        '• Investigación y aplicación de nuevas tecnologías de programación.'
      ],
      category: 'tech'
    },
    {
      period: 'ABR 2000 - JUL 2001',
      company: 'Salas Consultoría y Asociados',
      position: 'Jefe de Proyecto y Analista',
      description: [
        'Implementación de pilotos de Digital Dashboard y Cubos OLAP para clientes como:',
        '• Microsoft Chile',
        '• Compaq Chile',
        '• AFP Habitat',
        '• Itala',
        '• Codigas',
        '• Intra Latina',
        '• Lowe Porta & Partners',
        '• Tricolor'
      ],
      category: 'tech'
    },
    {
      period: 'ABR 2000 - JUN 2000',
      company: 'Dos en Uno',
      position: 'Programador y Asesor',
      description: [
        'Principales responsabilidades:',
        '• Asesoría en programación y migración de tablas (SQL Server 7.0 a Informix 7.30).',
        '• Creación de mantenedores con Visual Studio 6.0.',
        '• Modelamiento de datos con Power Designer.'
      ],
      category: 'tech'
    },
    {
      period: 'DIC 1999 - MAR 2000',
      company: 'Clínica Santiago',
      position: 'Programador',
      description: [
        'Desarrollo del proyecto Gestión Clínica incluyendo:',
        '• Modelado de Base de Datos SQL Server 7.0.',
        '• Implementación de módulos de facturación, bodega y reportes usando Visual Basic 6.0.',
        '• Instalación y configuración de red LAN Windows NT 4.0.'
      ],
      category: 'tech'
    },
    {
      period: 'SEP 1998 - NOV 1999',
      company: 'NetPlus Gestión Informática',
      position: 'Programador',
      description: [
        'Proyecto Investigaciones de Chile:',
        '• Generación de módulos de mantenedores con Visual Basic 5.0.'
      ],
      category: 'tech'
    },
    {
      period: 'ENE 1998 - AGO 1998',
      company: 'Intendencia de Servicios Sanitarios',
      position: 'Programador',
      description: [
        'Práctica profesional:',
        '• Desarrollo de soluciones para migración de datos desde archivos Excel y texto plano a SQL Server 6.5.',
        '• Implementación usando Visual Basic 5.0 y ActiveX Farpoint Spread 3.0.'
      ],
      category: 'tech'
    }
  ];

  const filteredExperiences = activeTab === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeTab);

  const displayedExperiences = showAll 
    ? filteredExperiences 
    : filteredExperiences.slice(0, 2);

  const shouldShowExpandButton = (description: string[]) => {
    return description.length > 3;
  };

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Mi Trayectoria
          </span>
        </h2>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('banking')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'banking'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sector Bancario
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'tech'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tecnología
            </button>
          </div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-500 before:to-indigo-600 before:opacity-30">
          {displayedExperiences.map((exp, index) => (
            <div key={index} className="relative flex items-start group">
              <div className="absolute left-0 md:left-1/2 ml-1.5 md:-ml-1.5 h-3 w-3 rounded-full border-2 border-blue-500 bg-gray-900 group-hover:border-indigo-600 transition-colors"></div>
              
              <div className="ml-10 md:ml-0 md:w-1/2 md:pr-10 md:text-right group-odd:md:ml-auto group-odd:md:pl-10 group-odd:md:pr-0">
                <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-blue-500/10 transition-all border border-gray-700 hover:border-blue-500/30">
                  <div className="mb-1 text-xs font-semibold uppercase text-indigo-400">
                    {exp.period}
                  </div>
                  <div className="text-xl font-bold text-gray-100 mb-1">
                    {exp.position}
                  </div>
                  <div className="text-sm font-semibold text-blue-400 mb-3">
                    {exp.company}
                  </div>
                  <ul className="text-gray-400 space-y-2 list-none">
                    {exp.description.slice(0, expandedItems.includes(index) ? undefined : 3).map((desc, i) => (
                      <li key={i} className="text-sm">{desc}</li>
                    ))}
                  </ul>
                  {shouldShowExpandButton(exp.description) && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {expandedItems.includes(index) ? 'Ver menos' : 'Ver más'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length > 2 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700 hover:border-blue-500/30"
            >
              {showAll ? 'Ver menos' : 'Ver más experiencia'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};