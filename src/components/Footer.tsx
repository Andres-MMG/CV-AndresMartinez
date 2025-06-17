import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { getSocialProfiles } = useResumeData();
  
  // Get profile information
  const profiles = getSocialProfiles();
  
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
            {profiles.map((profile, index) => {
              let Icon;
              let ariaLabel;
              
              switch(profile.network?.toLowerCase()) {
                case 'github':
                  Icon = Github;
                  ariaLabel = 'Github';
                  break;
                case 'linkedin':
                  Icon = Linkedin;
                  ariaLabel = 'LinkedIn';
                  break;
                case 'twitter':
                  Icon = Twitter;
                  ariaLabel = 'Twitter';
                  break;
                default:
                  return null; // Skip unsupported networks
              }
              
              return (
                <a 
                  key={index}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={ariaLabel}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            }).filter(Boolean)}
          </div>
        </div>
      </div>
    </footer>
  );
};