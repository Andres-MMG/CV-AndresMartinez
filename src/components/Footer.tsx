import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-400">
                <img 
                  src="/Andres.png" 
                  alt="Andrés Martínez" 
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Andrés Martínez. {t('footer.allRightsReserved')}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/Andres-MMG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/andres-m-martinez-g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://x.com/Andres_MMG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};