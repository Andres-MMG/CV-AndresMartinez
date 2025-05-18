import React from 'react';

export const Education: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Educación
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all shadow-md hover:shadow-blue-500/10">
            <div className="text-blue-400 text-sm font-semibold mb-2">2009 - 2010</div>
            <h3 className="text-xl font-bold text-white mb-2">Analista de Sistemas</h3>
            <p className="text-gray-300">Universidad de Ciencias de la Informática (UCINF)</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all shadow-md hover:shadow-blue-500/10">
            <div className="text-blue-400 text-sm font-semibold mb-2">1993 - 1996</div>
            <h3 className="text-xl font-bold text-white mb-2">Técnico en Programación de Sistemas Computacionales</h3>
            <p className="text-gray-300">Centro Politécnico Particular Nº 2 de Ñuñoa</p>
          </div>
        </div>
      </div>
    </section>
  );
};