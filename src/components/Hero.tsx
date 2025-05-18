import React, { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t, locale } = useContext(LanguageContext);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const phrases = t('hero.phrases') as string[];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timerId: number;
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      if (isDeleting) {
        typewriterRef.current!.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        typewriterRef.current!.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
      }
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      timerId = window.setTimeout(type, typingSpeed);
    };
    timerId = window.setTimeout(type, 1000);
    return () => clearTimeout(timerId);
  }, [locale]);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2" data-aos="fade-down">
            Andrés Martínez Gajardo
          </h1>
          <div className="h-12 mb-6" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-xl md:text-3xl text-gray-300">
              <span ref={typewriterRef} className="text-blue-400"></span>
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8" data-aos="fade-up" data-aos-delay="500">
            {t('hero.description')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start" data-aos="fade-up" data-aos-delay="700">
            <a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              {t('hero.buttons.projects')}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-gray-800 rounded-md font-semibold text-white hover:bg-gray-700 transition-all border border-gray-700"
            >
              {t('hero.buttons.contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};