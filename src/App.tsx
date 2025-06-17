import React, { useContext } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-gray-100'
    }`}>
      <ParticleBackground />
      <div className="relative z-10">
        <Header />        
        <main>
          <Hero />          
          <div className="container mx-auto px-4 py-8">
            <About />
          </div>          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;