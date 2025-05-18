import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'banking' | 'tech'>('all');
  const [showAll, setShowAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const { locale, t } = useContext(LanguageContext);
  const langKey = locale === 'pt-BR' ? 'pt' : locale;

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const rawExperiences = [
    // Exp M&L AI
    { key: 'exp_mlai', category: 'tech', translations: {
      es: { period: 'AGO 2024 - PRESENTE', company: 'M&L AI SpA.', position: 'Fundador & CEO / Ingeniero de Software', description: [
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
      ] },
      en: { period: 'AUG 2024 - PRESENT', company: 'M&L AI SpA.', position: 'Founder & CEO / Software Engineer', description: [
        'Founder and technical leader of M&L AI SpA., an innovative startup specialized in enterprise AI solutions. Creator of InteliAI (inteliai.cl), a SaaS platform that enables the implementation of personalized conversational agents connected to multiple social networks.',
        'Lead architect in the design and implementation of cloud infrastructure, using Docker for container orchestration, VPS management, DNS, and hosting services through Coolify.',
        'The InteliAI platform offers a complete suite of autonomous agents for various scenarios:',
        '• Personal Assistant: manages your appointments, reads and sends emails, replies on your behalf on WhatsApp and other connected social networks.',
        '• Virtual receptionists and assistants for agenda management.',
        '• Automated email processing systems and reminders.',
        '• Specialized agents for real estate and medical sectors.',
        '• Payment verification and invoice creation.',
        '• Reading of media, images, and PDF to feed inventory systems and other systems.',
        'Design and integration of microservices architecture using .NET C# and Python, with modern interfaces in React.',
        'Implementation of emerging technologies such as Redis for caching, and AI automation tools (n8n, Flowise, Chatwoot).',
        'Leadership in AI research, including prompt engineering and application of the .NET Semantic Kernel for natural language processing.',
        'To learn more about our intelligent agent platform, visit InteliAI.cl'
      ] },
      pt: { period: 'AGO 2024 - PRESENTE', company: 'M&L AI SpA.', position: 'Fundador & CEO / Engenheiro de Software', description: [
        'Fundador e líder técnico da M&L AI SpA., uma startup inovadora especializada em soluções de IA empresarial. Criador do InteliAI (inteliai.cl), uma plataforma SaaS que permite implementar agentes conversacionais personalizados com conexão a várias redes sociais.',
        'Arquiteto principal no design e implementação de infraestrutura em nuvem, utilizando Docker para orquestração de contêineres, gerenciamento de VPS, DNS e serviços de hospedagem através do Coolify.',
        'A plataforma InteliAI oferece um conjunto completo de agentes autônomos para diversos cenários:',
        '• Assistente Pessoal: gerencia seus compromissos, lê e envia e-mails, responde por você no WhatsApp e em outras redes sociais conectadas.',
        '• Recepcionistas virtuais e assistentes para gerenciamento de agendas.',
        '• Sistemas de processamento automático de e-mails e lembretes.',
        '• Agentes especializados para os setores imobiliário e médico.',
        '• Verificação de pagamentos e criação de faturas.',
        '• Leitura de mídias, imagens e PDF para alimentar sistemas de inventário e outros sistemas.',
        'Design e integração de arquitetura de microsserviços usando .NET C# e Python, com interfaces modernas em React.',
        'Implementação de tecnologias emergentes como Redis para cache e ferramentas de automação de IA (n8n, Flowise, Chatwoot).',
        'Liderança em pesquisa de IA, incluindo engenharia de prompts e aplicação do .NET Semantic Kernel para processamento de linguagem natural.',
        'Para saber mais sobre nossa plataforma de agentes inteligentes, visite InteliAI.cl'
      ] }
    }},
    // Exp Sermaluc Jefe
    { key: 'exp_sermaluc_jefe', category: 'banking', translations: {
      es: { period: 'ENE 2015 - JUL 2024', company: 'Sermaluc S.A.', position: 'Jefe de proyectos TI', description: [
        'Proyectos en Banco Central: Desarrollo y mantenimiento de la "App Regional" utilizando .NET y Blazor WebAssembly, con especial foco en la visualización de estadísticas en tiempo real y un prototipo en MAUI.',
        'Proyectos en Banco Itaú: Diseño e implementación de soluciones internas en entornos .NET / .NET Core, elaboración de flujos para la plataforma MUREX y desarrollo de APIs REST para la automatización de procesos bancarios.',
        'Proyectos en Banco Estado:',
        '• Proyecto Seguros FIDENS (2015-2016): Implementación de WebServices externos para la obtención y venta de seguros.',
        '• Proyecto Matriz Documental (2016-2018): Sistema para generar múltiples documentos PDF con FileNet.',
        '• Proyecto Carpeta Electrónica Cliente (2016-2018): Sistema de visualización de documentos de productos contratados.',
        '• Proyecto ActiveX Digitalización de Imágenes (2016-2018): Implementación para manejo de escáneres con WIA y TWAIN.',
        '• Proyecto Estructurante de Crédito: Evaluación comercial de clientes PYME.',
        'Liderazgo y coordinación de equipos de desarrollo, fomentando la adopción progresiva de prácticas DevOps y sistemas de control de versiones mediante Git.'
      ] },
      en: { period: 'JAN 2015 - JUL 2024', company: 'Sermaluc S.A.', position: 'Head of IT Projects', description: [
        'Projects at Central Bank: Development and maintenance of the "Regional App" using .NET and Blazor WebAssembly, with a special focus on real-time statistics visualization and a prototype in MAUI.',
        'Projects at Itaú Bank: Design and implementation of internal solutions in .NET / .NET Core environments, development of workflows for the MUREX platform, and development of REST APIs for the automation of banking processes.',
        'Projects at Banco Estado:',
        '• Seguros FIDENS Project (2015-2016): Implementation of external WebServices for insurance procurement and sales.',
        '• Document Matrix Project (2016-2018): System for generating multiple PDF documents with FileNet.',
        '• Electronic Folder Client Project (2016-2018): System for viewing documents of contracted products.',
        '• ActiveX Image Digitization Project (2016-2018): Implementation for scanner management with WIA and TWAIN.',
        '• Credit Structuring Project: Commercial evaluation of SME clients.',
        'Leadership and coordination of development teams, promoting the progressive adoption of DevOps practices and version control systems using Git.'
      ] },
      pt: { period: 'JAN 2015 - JUL 2024', company: 'Sermaluc S.A.', position: 'Chefe de Projetos de TI', description: [
        'Projetos no Banco Central: Desenvolvimento e manutenção do "App Regional" utilizando .NET e Blazor WebAssembly, com foco especial na visualização de estatísticas em tempo real e um protótipo em MAUI.',
        'Projetos no Banco Itaú: Design e implementação de soluções internas em ambientes .NET / .NET Core, elaboração de fluxos para a plataforma MUREX e desenvolvimento de APIs REST para automação de processos bancários.',
        'Projetos no Banco Estado:',
        '• Projeto Seguros FIDENS (2015-2016): Implementação de WebServices externos para obtenção e venda de seguros.',
        '• Projeto Matriz Documental (2016-2018): Sistema para geração de múltiplos documentos PDF com FileNet.',
        '• Projeto Carpeta Eletrônica Cliente (2016-2018): Sistema de visualização de documentos de produtos contratados.',
        '• Projeto ActiveX Digitalização de Imagens (2016-2018): Implementação para gerenciamento de scanners com WIA e TWAIN.',
        '• Projeto Estruturante de Crédito: Avaliação comercial de clientes PME.',
        'Liderança e coordenação de equipes de desenvolvimento, promovendo a adoção progressiva de práticas DevOps e sistemas de controle de versões usando Git.'
      ] }
    }},
    // Exp Sermaluc Dev
    { key: 'exp_sermaluc_dev', category: 'banking', translations: {
      es: { period: 'ABR 2007 - NOV 2014', company: 'Sermaluc S.A.', position: 'Ingeniero de Software', description: [
        'Integrando el equipo de Mantención que mantiene la aplicación Venta Crédito Hipotecario (VCH) Banco Estado.',
        'Realizo tareas como:',
        '• Coordinación del proyecto.',
        '• Análisis y desarrollo de nuevas funcionalidades.',
        '• Mejoras en las piezas de software relacionadas con el proyecto.'
      ] },
      en: { period: 'APR 2007 - NOV 2014', company: 'Sermaluc S.A.', position: 'Software Engineer', description: [
        'Integrating the Maintenance team that supports the Mortgage Credit Sale (VCH) application at Banco Estado.',
        'I perform tasks such as:',
        '• Project coordination.',
        '• Analysis and development of new functionalities.',
        '• Improvements in the software components related to the project.'
      ] },
      pt: { period: 'ABR 2007 - NOV 2014', company: 'Sermaluc S.A.', position: 'Engenheiro de Software', description: [
        'Integrando a equipe de Manutenção que mantém a aplicação Venda Crédito Hipotecário (VCH) Banco Estado.',
        'Realizo tarefas como:',
        '• Coordenação do projeto.',
        '• Análise e desenvolvimento de novas funcionalidades.',
        '• Melhorias nas peças de software relacionadas ao projeto.'
      ] }
    }},
    // Exp KITeknology
    { key: 'exp_kit_kepler', category: 'banking', translations: {
      es: { period: 'ABR 2007 - DIC 2010', company: 'KITeknology Kepler InterMedia', position: 'Analista Desarrollador', description: [
        'Coordinación y desarrollo del proyecto Venta Crédito Hipotecario (VCH) para Banco Estado.',
        'Desarrollo de WORKFLOW Bitácora para control de etapas en sucursales.',
        'Otros proyectos:',
        '• Corrección de incidentes para Banco Itaú en sistema de Cartolas Clientes.',
        '• Análisis y desarrollo del Proyecto SACU Bansander AFP.',
        '• Implementación de validación de clave usuaria contra PreviRed mediante WebServices.'
      ] },
      en: { period: 'APR 2007 - DEC 2010', company: 'KITeknology Kepler InterMedia', position: 'Analyst Developer', description: [
        'Coordination and development of the Mortgage Credit Sale (VCH) project for Banco Estado.',
        'Development of WORKFLOW Logbook for stage control in branches.',
        'Other projects:',
        '• Incident correction for Banco Itaú in the Clients Statement system.',
        '• Analysis and development of the SACU Bansander AFP Project.',
        '• Implementation of user key validation against PreviRed via WebServices.'
      ] },
      pt: { period: 'ABR 2007 - DEZ 2010', company: 'KITeknology Kepler InterMedia', position: 'Analista Desenvolvedor', description: [
        'Coordenação e desenvolvimento do projeto Venda Crédito Hipotecário (VCH) para o Banco Estado.',
        'Desenvolvimento de WORKFLOW Livro de Registro para controle de etapas em agências.',
        'Outros projetos:',
        '• Correção de incidentes para o Banco Itaú no sistema de Extratos de Clientes.',
        '• Análise e desenvolvimento do Projeto SACU Bansander AFP.',
        '• Implementação de validação de chave de usuário contra PreviRed por meio de WebServices.'
      ] }
    }},
    // Exp Newsystems
    { key: 'exp_newsystems', category: 'tech', translations: {
      es: { period: 'JUL 2001 - FEB 2007', company: 'Newsystems Ltda.', position: 'Analista Desarrollador', description: [
        'Principales responsabilidades:',
        '• Desarrollo del sistema ColWeb® (Colegio en la Web) para ServiPyme, filial del Banco del Desarrollo.',
        '• Análisis y desarrollo de OteWeb para Escuelas de Conductores.',
        '• Investigación y aplicación de nuevas tecnologías de programación.'
      ] },
      en: { period: 'JUL 2001 - FEB 2007', company: 'Newsystems Ltda.', position: 'Analyst Developer', description: [
        'Main responsibilities:',
        '• Development of the ColWeb® system (School on the Web) for ServiPyme, a subsidiary of the Development Bank.',
        '• Analysis and development of OteWeb for Driving Schools.',
        '• Research and application of new programming technologies.'
      ] },
      pt: { period: 'JUL 2001 - FEV 2007', company: 'Newsystems Ltda.', position: 'Analista Desenvolvedor', description: [
        'Principais responsabilidades:',
        '• Desenvolvimento do sistema ColWeb® (Colégio na Web) para ServiPyme, filial do Banco do Desenvolvimento.',
        '• Análise e desenvolvimento do OteWeb para Escolas de Condutores.',
        '• Pesquisa e aplicação de novas tecnologias de programação.'
      ] }
    }},
    // Exp Salas Consultoria
    { key: 'exp_salas_consultoria', category: 'tech', translations: {
      es: { period: 'ABR 2000 - JUL 2001', company: 'Salas Consultoría y Asociados', position: 'Jefe de Proyecto y Analista', description: [
        'Implementación de pilotos de Digital Dashboard y Cubos OLAP para clientes como:',
        '• Microsoft Chile',
        '• Compaq Chile',
        '• AFP Habitat',
        '• Itala',
        '• Codigas',
        '• Intra Latina',
        '• Lowe Porta & Partners',
        '• Tricolor'
      ] },
      en: { period: 'APR 2000 - JUL 2001', company: 'Salas Consultoría y Asociados', position: 'Project Manager and Analyst', description: [
        'Implementation of Digital Dashboard and OLAP Cubes pilots for clients such as:',
        '• Microsoft Chile',
        '• Compaq Chile',
        '• AFP Habitat',
        '• Itala',
        '• Codigas',
        '• Intra Latina',
        '• Lowe Porta & Partners',
        '• Tricolor'
      ] },
      pt: { period: 'ABR 2000 - JUL 2001', company: 'Salas Consultoría y Asociados', position: 'Gerente de Projeto e Analista', description: [
        'Implementação de pilotos de Painel Digital e Cubos OLAP para clientes como:',
        '• Microsoft Chile',
        '• Compaq Chile',
        '• AFP Habitat',
        '• Itala',
        '• Codigas',
        '• Intra Latina',
        '• Lowe Porta & Partners',
        '• Tricolor'
      ] }
    }},
    // Exp Dos en Uno
    { key: 'exp_dos_en_uno', category: 'tech', translations: {
      es: { period: 'ABR 2000 - JUN 2000', company: 'Dos en Uno', position: 'Programador y Asesor', description: [
        'Principales responsabilidades:',
        '• Asesoría en programación y migración de tablas (SQL Server 7.0 a Informix 7.30).',
        '• Creación de mantenedores con Visual Studio 6.0.',
        '• Modelamiento de datos con Power Designer.'
      ] },
      en: { period: 'APR 2000 - JUN 2000', company: 'Dos en Uno', position: 'Programmer and Consultant', description: [
        'Main responsibilities:',
        '• Consulting on programming and table migration (SQL Server 7.0 to Informix 7.30).',
        '• Creation of maintainers with Visual Studio 6.0.',
        '• Data modeling with Power Designer.'
      ] },
      pt: { period: 'ABR 2000 - JUN 2000', company: 'Dos en Uno', position: 'Programador e Consultor', description: [
        'Principais responsabilidades:',
        '• Consultoria em programação e migração de tabelas (SQL Server 7.0 para Informix 7.30).',
        '• Criação de mantenedores com Visual Studio 6.0.',
        '• Modelagem de dados com Power Designer.'
      ] }
    }},
    // Exp Clinica Santiago
    { key: 'exp_clinica_santiago', category: 'tech', translations: {
      es: { period: 'DIC 1999 - MAR 2000', company: 'Clínica Santiago', position: 'Programador', description: [
        'Desarrollo del proyecto Gestión Clínica incluyendo:',
        '• Modelado de Base de Datos SQL Server 7.0.',
        '• Implementación de módulos de facturación, bodega y reportes usando Visual Basic 6.0.',
        '• Instalación y configuración de red LAN Windows NT 4.0.'
      ] },
      en: { period: 'DEC 1999 - MAR 2000', company: 'Clínica Santiago', position: 'Programmer', description: [
        'Development of the Clinical Management project including:',
        '• SQL Server 7.0 Database modeling.',
        '• Implementation of billing, warehouse, and reporting modules using Visual Basic 6.0.',
        '• Installation and configuration of Windows NT 4.0 LAN network.'
      ] },
      pt: { period: 'DEZ 1999 - MAR 2000', company: 'Clínica Santiago', position: 'Programador', description: [
        'Desenvolvimento do projeto Gestão Clínica incluindo:',
        '• Modelagem de Banco de Dados SQL Server 7.0.',
        '• Implementação de módulos de faturamento, estoque e relatórios usando Visual Basic 6.0.',
        '• Instalação e configuração de rede LAN Windows NT 4.0.'
      ] }
    }},
    // Exp NetPlus
    { key: 'exp_netplus', category: 'tech', translations: {
      es: { period: 'SEP 1998 - NOV 1999', company: 'NetPlus Gestión Informática', position: 'Programador', description: [
        'Proyecto Investigaciones de Chile:',
        '• Generación de módulos de mantenedores con Visual Basic 5.0.'
      ] },
      en: { period: 'SEP 1998 - NOV 1999', company: 'NetPlus Gestión Informática', position: 'Programmer', description: [
        'Investigaciones de Chile Project:',
        '• Generation of maintenance modules with Visual Basic 5.0.'
      ] },
      pt: { period: 'SET 1998 - NOV 1999', company: 'NetPlus Gestão Informática', position: 'Programador', description: [
        'Projeto Investigações do Chile:',
        '• Geração de módulos de manutenção com Visual Basic 5.0.'
      ] }
    }},
    // Exp Intendencia SS
    { key: 'exp_intendencia_ss', category: 'tech', translations: {
      es: { period: 'ENE 1998 - AGO 1998', company: 'Intendencia de Servicios Sanitarios', position: 'Programador', description: [
        'Práctica profesional:',
        '• Desarrollo de soluciones para migración de datos desde archivos Excel y texto plano a SQL Server 6.5.',
        '• Implementación usando Visual Basic 5.0 y ActiveX Farpoint Spread 3.0.'
      ] },
      en: { period: 'JAN 1998 - AUG 1998', company: 'Intendencia de Servicios Sanitarios', position: 'Programmer', description: [
        'Professional internship:',
        '• Development of solutions for data migration from Excel files and plain text to SQL Server 6.5.',
        '• Implementation using Visual Basic 5.0 and ActiveX Farpoint Spread 3.0.'
      ] },
      pt: { period: 'JAN 1998 - AGO 1998', company: 'Intendência de Serviços Sanitários', position: 'Programador', description: [
        'Estágio profissional:',
        '• Desenvolvimento de soluções para migração de dados de arquivos Excel e texto plano para SQL Server 6.5.',
        '• Implementação usando Visual Basic 5.0 e ActiveX Farpoint Spread 3.0.'
      ] }
    }}
  ];
  const experiences = rawExperiences.map(exp => {
    const tx = exp.translations[langKey as 'es'|'en'|'pt'];
    return {
      key: exp.key,
      category: exp.category,
      period: tx.period,
      company: tx.company,
      position: tx.position,
      description: tx.description,
    };
  });

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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('experience.title')}
          </span>
        </h2>

        <div className="flex justify-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('experience.tabs.all')}
            </button>
            <button
              onClick={() => setActiveTab('banking')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'banking'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('experience.tabs.banking')}
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'tech'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('experience.tabs.tech')}
            </button>
          </div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-500 before:to-indigo-600 before:opacity-30">
          {displayedExperiences.map((exp, index) => (
            <div key={index} className="relative flex items-start group" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay={200 + (index * 100)}>
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
                      {expandedItems.includes(index)
                        ? t('experience.showLess')
                        : t('experience.showMore')}
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
              {showAll ? t('experience.showLess') : t('experience.showMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};