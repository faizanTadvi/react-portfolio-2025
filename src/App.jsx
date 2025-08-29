import React, { useState, useEffect, useRef } from 'react';

// Custom hook for the cursor spotlight effect
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

// Custom hook for the typing animation effect
const useTypingEffect = (text, speed = 100) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text) {
      let i = 0;
      setDisplayedText(''); // Reset on text change
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
      return () => clearInterval(typingInterval);
    }
  }, [text, speed]);

  return displayedText;
};


// Helper hook for detecting if an element is in view
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// SVG Icons as Components for clarity and reusability
const icons = {
  github: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
  ),
  linkedin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  externalLink: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
  ),
  menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
  ),
  close: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
  ),
};

// Data for the portfolio
const portfolioData = {
  name: "Faizan Lukman Tadvi",
  headline: " Hey , I'm Faizan Tadvi.",
  subHeadline: "I build fast, modern web applications that get results.",
  about: "Motivated Computer Science student with a passion for web development and automation. Eager to contribute technical skills in Java, JavaScript, and modern frameworks to a forward-thinking team as a Software Developer Intern or Junior Engineer.",
  contact: {
    email: "tadvifaizan2004@gmail.com",
    linkedin: "http://linkedin.com/in/faizan-tadvi-3bb33a369",
    github: "https://github.com/faizanTadvi",
  },
  skills: ["Java", "JavaScript", "React", "HTML", "CSS", "Firebase", "Git", "GitHub", "Figma", "VS Code"],
  projects: [
    {
      title: "Husnhira Cosmetics (Client)",
      description: "Developed and designed a professional e-commerce website for a cosmetics brand, focusing on user experience and brand identity.",
      stack: ["E-commerce", "Frontend Dev", "Client Collaboration"],
      link: "https://www.husnhira.com/",
    },
    {
      title: "AI Chat Bot",
      description: "An intelligent, conversational chatbot application built with modern AI integration for seamless user interaction.",
      stack: ["React", "Vite", "API Integration"],
      link: "https://ai-chat-iq3mbb48e-faizan-tadvis-projects.vercel.app/",
    },
    {
      title: "Zen Mode - Web App",
      description: "A cross-platform app with calendar integration, music mode for calming sounds, and daily quotes.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "https://daily-quotes-c40t7opvz-faizan-tadvis-projects.vercel.app/",
    },
    {
      title: "Super Clicker Game",
      description: "A web-based clicker game that tests user speed and accuracy.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "https://superclicker-omega.vercel.app/",
    },
  ],
};

// Reusable component for animated sections
const AnimatedSection = ({ children, id, className }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </section>
  );
};

// Cursor Spotlight Component
const CursorSpotlight = () => {
  const position = useMousePosition();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }}
    ></div>
  );
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { title: "About", id: "about" },
    { title: "Projects", id: "projects" },
    { title: "Skills", id: "skills" },
    { title: "Contact", id: "contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="text-xl font-bold text-white transition-colors hover:text-cyan-400">
          {portfolioData.name.split(' ')[0]}.
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className="text-gray-300 hover:text-cyan-400 transition-colors">
              {link.title}
            </a>
          ))}
          <a href="/Faizan.Tadvi_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-400 border border-cyan-400 font-medium py-2 px-4 rounded-md hover:bg-cyan-400 hover:text-gray-900 transition-colors">
            Resume
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-white font-medium py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors">
            Contact Me
          </a>
        </nav>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <icons.close /> : <icons.menu />}
        </button>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-900`}>
        {navLinks.map(link => (
          <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className="block py-3 px-6 text-gray-300 hover:bg-gray-800">
            {link.title}
          </a>
        ))}
        <a href="/Faizan.Tadvi_CV.pdf" target="_blank" rel="noopener noreferrer" className="block py-3 px-6 text-cyan-400 hover:bg-gray-800">
          Resume
        </a>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const typedHeadline = useTypingEffect(portfolioData.headline, 80);

  return (
    <section id="hero" className="min-h-screen flex items-center bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 min-h-[60px] md:min-h-[80px]">
          {typedHeadline}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          {portfolioData.subHeadline}
        </p>
        <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }} className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 transform hover:-translate-y-1">
          View My Work
        </a>
      </div>
    </section>
  );
};

// About Component
const About = () => (
  <AnimatedSection id="about" className="py-24 bg-gray-800">
    <div className="container mx-auto px-6">
      {/* --- LAYOUT FIX: Changed grid to 5 columns for better balance --- */}
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
            <img
              src="/profile-photo.png"
              alt="Faizan Tadvi"
              className="w-44 h-44 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            {portfolioData.about}
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

// Projects Component
const Projects = () => (
  <AnimatedSection id="projects" className="py-24 bg-gray-900">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 group hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                  <icons.externalLink />
                </a>
              )}
            </div>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Skills Component
const Skills = () => (
  <AnimatedSection id="skills" className="py-24 bg-gray-800">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Technical Skills</h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {portfolioData.skills.map(skill => (
          <div key={skill} className="bg-gray-700 text-gray-200 font-medium px-5 py-2 rounded-md transition-all duration-300 hover:bg-cyan-500 hover:text-white">
            {skill}
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Contact Component
const Contact = () => (
  <AnimatedSection id="contact" className="py-24 bg-gray-900">
    <div className="container mx-auto px-6 text-center max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Create Something Amazing</h2>
      <p className="text-lg text-gray-400 mb-8">
        I'm currently available for freelance work and open to discussing new projects. Feel free to reach out.
      </p>
      <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
        Get In Touch
      </a>
    </div>
  </AnimatedSection>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-8">
    <div className="container mx-auto px-6 text-center text-gray-500">
      <div className="flex justify-center space-x-6 mb-4">
        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
          <icons.github className="w-6 h-6" />
        </a>
        <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
          <icons.linkedin className="w-6 h-6" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
    </div>
  </footer>
);

// Main App Component
export default function App() {
  return (
    <div className="bg-gray-900">
      <CursorSpotlight />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
