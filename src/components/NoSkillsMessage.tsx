import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const NoSkillsMessage: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="col-span-full flex justify-center items-center p-8 text-center" data-aos="fade-up">
      <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700 shadow-md">
        <p className="text-gray-400 mb-2">{t('skills.noSkills')}</p>
        <p className="text-sm text-gray-500">{t('skills.selectCategory')}</p>
      </div>
    </div>
  );
};

export default NoSkillsMessage;
