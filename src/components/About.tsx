import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';
import { ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const { resume, loading, getFullName, getContactInfo } = useResumeData();

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando información...</p>
        </div>
      </section>
    );
  }

  const contactInfo = getContactInfo();

  return (    <section id="about" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1 order-1 md:order-1 hidden md:block" data-aos="fade-right" data-aos-delay="100">
            <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10" style={{aspectRatio: "3/4"}}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40"></div>
              <img 
                src={"/torectangulo.png"} 
                alt={getFullName()} 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
            <div className="col-span-1 md:col-span-2 order-2 md:order-2" data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
                {t('about.title')}
              </span>
            </h2>
            
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              {resume.basics?.label || t('about.subtitle')}
            </h3>
              {/* Resumen desde JSON Resume */}
            <p className="text-gray-300 mb-4">
              {resume.basics?.summary || t('about.paragraph1')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">              <div>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.name')}</span>{" "}
                  <span className="text-gray-400">{getFullName()}</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.email')}</span>{" "}
                  <span className="text-gray-400">{contactInfo.email || 'No disponible'}</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.phone')}</span>{" "}
                  <span className="text-gray-400">{contactInfo.phone || 'No disponible'}</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Fecha de nacimiento:</span>{" "}
                  <span className="text-gray-400">
                    {resume.basics?.birthDate ? new Date(resume.basics.birthDate).toLocaleDateString('es-CL') : 'No disponible'}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Nacionalidad:</span>{" "}
                  <span className="text-gray-400">{resume.basics?.nationality || 'No disponible'}</span>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.location')}</span>{" "}
                  <span className="text-gray-400">
                    {contactInfo.location?.city || 'Santiago'}, {contactInfo.location?.countryCode || 'Chile'}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.website')}</span>{" "}
                  <a 
                    href={contactInfo.website || '#'} 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactInfo.website ? new URL(contactInfo.website).hostname : 'No disponible'}
                  </a>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Estado civil:</span>{" "}
                  <span className="text-gray-400">{resume.basics?.maritalStatus || 'No disponible'}</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">RUN:</span>{" "}
                  <span className="text-gray-400">{resume.basics?.nationalId || 'No disponible'}</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">{t('about.availability')}</span>{" "}
                  <span className="text-blue-400">{resume.basics?.label || 'Consultoría & Proyectos'}</span>
                </p>
              </div>
            </div>            {/* Redes sociales desde JSON Resume */}
            {contactInfo.profiles && contactInfo.profiles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold mb-3 text-gray-200">Redes y Perfiles</h4>
                <div className="flex flex-wrap gap-3">
                  {contactInfo.profiles.map((profile, index) => (
                    <a
                      key={index}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="capitalize">{profile.network}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
              {/* Botón para descargar resume JSON */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={() => {
                  const dataStr = JSON.stringify(resume, null, 2);
                  const blob = new Blob([dataStr], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = "andres-martinez-resume.json";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                data-aos="fade-up"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Descargar JSON Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};