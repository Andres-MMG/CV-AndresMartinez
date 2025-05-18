import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Sobre Mí
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1 order-1 md:order-1 hidden md:block" data-aos="fade-right" data-aos-delay="100">
            <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10" style={{aspectRatio: "3/4"}}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40"></div>
              <img 
                src="/torectangulo.png" 
                alt="Andrés Martínez" 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 order-2 md:order-2" data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Ingeniero de Software & Emprendedor
            </h3>
            <p className="text-gray-300 mb-4">
              Con más de 20 años de experiencia en el desarrollo de software, he evolucionado desde 
              crear soluciones para el sector bancario hasta fundar mi propia empresa de tecnología.
            </p>
            <p className="text-gray-300 mb-6">
              Apasionado por el aprendizaje continuo, me he sumergido en el ecosistema de la IA, 
              desarrollando agentes inteligentes que transforman la manera en que las empresas interactúan 
              con sus clientes. Mi enfoque combina la solidez técnica adquirida en el sector financiero 
              con la innovación y agilidad de las startups tecnológicas.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Nombre:</span>{" "}
                  <span className="text-gray-400">Andrés Martínez Gajardo</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Email:</span>{" "}
                  <span className="text-gray-400">andres@inteliai.cl / andres@mylai.cl</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Teléfono:</span>{" "}
                  <span className="text-gray-400">+56 9 55155418</span>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Ubicación:</span>{" "}
                  <span className="text-gray-400">Santiago, Chile</span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-200">Disponibilidad:</span>{" "}
                  <span className="text-blue-400">Consultoría & Proyectos</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};