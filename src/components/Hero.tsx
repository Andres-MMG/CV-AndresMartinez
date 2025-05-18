import React, { useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const typewriterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const phrases = [
      'Ingeniero de Software',
      'Desarrollador Full Stack',
      'Emprendedor Tech',
      'Especialista en IA',
      'Fundador de InteliAI'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        if (typewriterRef.current) {
          typewriterRef.current.textContent = currentPhrase.substring(0, currentCharIndex - 1);
          currentCharIndex--;
        }
        typingSpeed = 50;
      } else {
        if (typewriterRef.current) {
          typewriterRef.current.textContent = currentPhrase.substring(0, currentCharIndex + 1);
          currentCharIndex++;
        }
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }
      
      setTimeout(type, typingSpeed);
    };
    
    const typingTimeout = setTimeout(type, 1000);
    
    return () => clearTimeout(typingTimeout);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            Andrés Martínez Gajardo
          </h1>
          <div className="h-12 mb-6">
            <h2 className="text-xl md:text-3xl text-gray-300">
              <span ref={typewriterRef} className="text-blue-400"></span>
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8">
            Transformando ideas en soluciones digitales impulsadas por IA. 
            Más de 20 años de experiencia creando software de calidad.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-gray-800 rounded-md font-semibold text-white hover:bg-gray-700 transition-all border border-gray-700"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};