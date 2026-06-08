import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AuroraBackground } from './components/AuroraBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-primary/20 selection:text-primary">
      {/* Interactive Swirling Nebula Background */}
      <AuroraBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
