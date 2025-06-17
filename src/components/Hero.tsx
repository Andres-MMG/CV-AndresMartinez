import React, { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

export const Hero: React.FC = () => {
  const { t, locale } = useContext(LanguageContext);
  const { resume, loading, getFullName, getCurrentJob } = useResumeData();
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
  const currentJob = getCurrentJob();

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando información...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2" data-aos="fade-down">
            {getFullName()}
          </h1>
          <div className="h-12 mb-6" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-xl md:text-3xl text-gray-300">
              <span ref={typewriterRef} className="text-blue-400"></span>
              <span className="animate-pulse">|</span>
            </h2>          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-4" data-aos="fade-up" data-aos-delay="500">
            {resume.basics?.summary || t('hero.description')}
          </p>
          
          {/* Información del trabajo actual */}
          {currentJob && (
            <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
              <p className="text-blue-400 font-semibold">
                {currentJob.position} @ {currentJob.name}
              </p>
              <p className="text-gray-400 text-sm">
                {currentJob.location} • {currentJob.startDate ? new Date(currentJob.startDate).getFullYear() : ''} - Presente
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};