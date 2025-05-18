import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, setLocale } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Ajustar clases del header según tema claro/oscuro
  const headerBg = isScrolled
    ? (theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-900/90 backdrop-blur-md shadow-lg')
    : (theme === 'light' ? 'bg-transparent' : 'bg-transparent');
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-400">
            <img src="/Andres.png" alt="Andrés Martínez" className="h-full w-full object-cover" />
          </div>
        </div>
        {/* Right icons and navigation */}
        <div className="flex items-center space-x-4">
          {/* Language Menu */}
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="p-2 text-gray-300 hover:text-white" aria-label="Select language">
              <Globe size={24} />
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-gray-800 text-gray-100 rounded-md shadow-lg z-50">
                <button onClick={() => { setLocale('es'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">Español</button>
                <button onClick={() => { setLocale('en'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">English</button>
                <button onClick={() => { setLocale('pt-BR'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">Português</button>
              </div>
            )}
          </div>
          {/* Theme Toggle */}
          <button className="p-2 rounded-full text-gray-300 hover:text-white hidden" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          {/* Mobile controls: language selector and theme toggle */}
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => setLocale('es')} className={`text-sm ${locale==='es'?'text-white':'text-gray-300 hover:text-white'}`}>
                <Globe className="inline-block mr-1" size={16} /> ES
              </button>
              <button onClick={() => setLocale('en')} className={`text-sm ${locale==='en'?'text-white':'text-gray-300 hover:text-white'}`}>
                <Globe className="inline-block mr-1" size={16} /> EN
              </button>
              <button onClick={() => setLocale('pt-BR')} className={`text-sm ${locale==='pt-BR'?'text-white':'text-gray-300 hover:text-white'}`}>
                <Globe className="inline-block mr-1" size={16} /> PT
              </button>
            </div>
            <button className="p-2 rounded-full text-gray-300 hover:text-white hidden" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </div>
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  const { t } = useContext(LanguageContext);
  const items = ['home','about','experience','skills','projects','contact'];
   
   return (
     <>
      {items.map(key => (
        <a
          key={key}
          href={`#${key}`}
          className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
          onClick={onClick}
        >
          {t(`nav.${key}`)}
        </a>
      ))}
     </>
   );
 };