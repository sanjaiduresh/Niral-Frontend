import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import all the components from LandingPage directory
import Navbar from "../components/LandingPage/Navbar";
import Hero from "../components/LandingPage/Hero";
import Services from "../components/LandingPage/Services";
import Features from "../components/LandingPage/Features";
import AdvancedFeatures from "../components/LandingPage/AdvancedFeatures";
import About from "../components/LandingPage/About";
import Testimonials from "../components/LandingPage/Testimonials";
import CTA from "../components/LandingPage/CTA";
import Footer from "../components/LandingPage/Footer";
import ScrollToTop from "../components/LandingPage/ScrollToTop";
import Notification from "../components/LandingPage/Notification";

const Landing = () => {
  const hospitals = [
    "AIIMS Delhi",
    "Apollo Hospitals",
    "Fortis Healthcare",
    "Manipal Hospitals",
    "Max Healthcare",
    "Medanta Medicity",
    "Narayana Health",
    "Tata Memorial Hospital",
    "Kokilaben Hospital",
    "Artemis Hospital",
    "Lilavati Hospital Mumbai",
    "Christian Medical College Vellore",
    "Hinduja Hospital Mumbai",
    "KIMS Hyderabad",
    "Ruby Hall Clinic Pune",
    "Jaslok Hospital Mumbai",
    "Sankara Nethralaya Chennai",
    "Sir Ganga Ram Hospital Delhi",
    "Wockhardt Hospitals",
    "Bombay Hospital"
  ];
  
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Theme toggle state
  const [darkMode, setDarkMode] = useState(true);
  
  // Notification state for demo
  const [showNotification, setShowNotification] = useState(false);
  
  // Trigger notification in demo
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 3000);
    
    return () => clearTimeout(notificationTimer);
  }, []);
  
  // Handle scroll events for navbar styling and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      
      // Determine active section based on scroll position
      const sections = ["home", "services", "features", "about", "testimonials"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar 
        isScrolled={isScrolled} 
        activeSection={activeSection} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
      {/* Scroll to top button */}
      <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />

      {/* Notification popup */}
      <Notification showNotification={showNotification} setShowNotification={setShowNotification} />

      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-300 transition-colors duration-500">
        {/* Hero Section */}
        <Hero hospitals={hospitals} darkMode={darkMode} />

        {/* Services Section */}
        <Services />

        {/* Features Section */}
        <Features />

        {/* Advanced Features Section */}
        <AdvancedFeatures />

        {/* About Section */}
        <About />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Call to Action Section */}
        <CTA />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
