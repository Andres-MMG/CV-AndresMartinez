import React from 'react';

const NoSkillsMessage: React.FC = () => {
  return (
    <div className="col-span-full flex justify-center items-center p-8 text-center" data-aos="fade-up">
      <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700 shadow-md">
        <p className="text-gray-400 mb-2">No hay habilidades en esta categoría</p>
        <p className="text-sm text-gray-500">Selecciona otra categoría para ver más habilidades</p>
      </div>
    </div>
  );
};

export default NoSkillsMessage;
