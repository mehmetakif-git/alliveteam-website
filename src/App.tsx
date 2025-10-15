import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronUp, Mail, Phone } from 'lucide-react';
import Footer from './Footer';

type Section = 'about' | 'services' | 'contact';
type ServiceTab = 'catering' | 'manpower';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [activeServiceTab, setActiveServiceTab] = useState<ServiceTab>('catering');
  const [showFooter, setShowFooter] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isHoveringFooter, setIsHoveringFooter] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  const slogans = [
    { service: 'CATERING', slogan: 'Excellence in Every Bite' },
    { service: 'HOUSEKEEPING', slogan: 'Spotless Spaces, Seamless Service' },
    { service: 'MANPOWER', slogan: 'Skilled Professionals, Delivered' }
  ];

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sectionImages = {
    about: [1, 2, 3, 4],
    services: {
      catering: [5, 6, 7, 8, 9],
      manpower: [10, 11, 12, 13]
    },
    contact: [16, 17]
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Section;
    if (hash && ['about', 'services', 'contact'].includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);

    return () => clearInterval(sloganInterval);
  }, []);

  useEffect(() => {
    const allImages = [
      ...sectionImages.about,
      ...sectionImages.services.catering,
      ...sectionImages.services.manpower,
      ...sectionImages.contact
    ];

    const imagePromises = allImages.map((imageNum) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadingProgress((prev) => {
            const newProgress = prev + (100 / allImages.length);
            return newProgress > 100 ? 100 : newProgress;
          });
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `/assets/image${imageNum}.jpg`;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => {
        setPreloaderVisible(false);
      }, 300);
    });

    const fallbackTimer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      if (isIdle) {
        setIsIdle(false);
      }

      idleTimerRef.current = window.setTimeout(() => {
        if (!isHoveringNav && !isHoveringFooter) {
          setIsIdle(true);
        }
      }, 2500);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = (currentScrollY + windowHeight) >= (documentHeight - 100);
      const isScrollingUp = currentScrollY < lastScrollY;

      setScrolled(currentScrollY > 100);
      setShowScrollTop(currentScrollY > 400);

      if (scrolledToBottom && !isScrollingUp) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }

      if (currentScrollY < 100) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
      resetIdleTimer();
    };

    const handleMouseMove = () => {
      resetIdleTimer();
    };

    const handleTouchStart = () => {
      resetIdleTimer();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    resetIdleTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [lastScrollY, isIdle, isHoveringNav, isHoveringFooter]);

  useEffect(() => {
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = parseInt(entry.target.getAttribute('data-image-index') || '0');
            setLoadedImages((prev) => new Set(prev).add(imageIndex));
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01
      }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = parseInt(entry.target.getAttribute('data-image-index') || '0');
            setVisibleImages((prev) => new Set(prev).add(imageIndex));
          }
        });
      },
      {
        rootMargin: '-50px',
        threshold: 0.15
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) {
        lazyObserver.observe(ref);
        revealObserver.observe(ref);
      }
    });

    return () => {
      lazyObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [activeSection, activeServiceTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (section: Section) => {
    if (section === activeSection) return;

    setIsTransitioning(true);
    setContentVisible(false);
    setMobileMenuOpen(false);

    setTimeout(() => {
      setActiveSection(section);
      window.location.hash = section;
      window.scrollTo({ top: 0, behavior: 'auto' });

      setTimeout(() => {
        setContentVisible(true);
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const getCurrentImages = () => {
    if (activeSection === 'about') {
      return sectionImages.about;
    } else if (activeSection === 'services') {
      return sectionImages.services[activeServiceTab];
    } else if (activeSection === 'contact') {
      return sectionImages.contact;
    }
    return [];
  };

  return (
    <div className="bg-white">
      <div
        className={`fixed inset-0 z-[100] bg-gradient-to-br from-[#0D2343] to-[#1a3a5f] flex flex-col items-center justify-center transition-opacity duration-[1500ms] ${
          preloaderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/logo.svg"
            alt="Loading"
            className="h-20 md:h-24 w-auto animate-[pulse_2s_ease-in-out_infinite]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(188, 144, 96, 0.3))',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className="mt-12 h-20 flex items-center justify-center overflow-hidden">
          {slogans.map((item, index) => (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-in-out text-center px-8"
              style={{
                opacity: currentSloganIndex === index ? 1 : 0,
                transform: currentSloganIndex === index ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <p className="text-[#BC9060] text-sm md:text-base font-bold tracking-[0.2em] mb-2">
                {item.service}
              </p>
              <p className="text-white text-lg md:text-2xl font-light tracking-wide">
                {item.slogan}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[#BC9060] text-base md:text-lg font-medium tracking-wide">
          Loading... {Math.round(loadingProgress)}%
        </p>
        <div className="mt-3 w-64 h-1 bg-[#0D2343]/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#BC9060] transition-all duration-300 rounded-full"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>

      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all ${
          navbarVisible && !isIdle ? (scrolled ? 'top-5' : 'top-0') : '-top-32'
        } ${
          scrolled ? 'navbar-scrolled' : 'navbar-top'
        }`}
        style={{
          width: scrolled ? 'min(50%, 900px)' : '100%',
          opacity: navbarVisible && !isIdle ? 1 : 0,
          transitionDuration: isIdle ? '400ms' : '500ms',
          transitionTimingFunction: isIdle ? 'ease-out' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        <div
          className="flex items-center justify-between w-full px-6 py-3 border transition-all"
          style={{
            borderRadius: scrolled ? '40px' : '0px',
            borderColor: scrolled ? 'rgba(13, 35, 67, 0.3)' : 'rgba(13, 35, 67, 0.2)',
            boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
            backgroundColor: 'rgba(13, 35, 67, 0.9)',
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <img
            src="/assets/logo.svg"
            alt="Allive Logo"
            className="transition-all duration-300 hover:opacity-80 cursor-pointer flex-shrink-0"
            style={{
              height: scrolled ? '32px' : '40px',
              width: 'auto'
            }}
            onClick={scrollToTop}
          />

          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => navigateToSection('about')}
              className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                activeSection === 'about'
                  ? 'bg-white text-[#0D2343]'
                  : 'text-white hover:text-[#0D2343] hover:bg-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateToSection('services')}
              className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                activeSection === 'services'
                  ? 'bg-white text-[#0D2343]'
                  : 'text-white hover:text-[#0D2343] hover:bg-white'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigateToSection('contact')}
              className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                activeSection === 'contact'
                  ? 'bg-white text-[#0D2343]'
                  : 'text-white hover:text-[#0D2343] hover:bg-white'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-white text-sm flex-shrink-0">
            <a
              href="mailto:welcome@alliveteam.com"
              className="flex items-center gap-2 hover:text-[#BC9060] transition-all duration-300"
              title="welcome@alliveteam.com"
            >
              <Mail size={18} />
              <span className={scrolled ? 'hidden' : 'block'}>welcome@alliveteam.com</span>
            </a>
            <a
              href="tel:+966583263520"
              className="flex items-center gap-2 hover:text-[#BC9060] transition-all duration-300"
              title="+966 58 326 3520"
            >
              <Phone size={18} />
              <span className={scrolled ? 'hidden' : 'block'}>+966 58 326 3520</span>
            </a>
          </div>

          <button
            className="md:hidden text-white transition-all duration-300 flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#0D2343]/95 backdrop-blur-md rounded-2xl border border-[#0D2343]/30 shadow-xl overflow-hidden">
            <div className="flex flex-col py-2">
              <button
                onClick={() => navigateToSection('about')}
                className={`font-medium py-3 px-6 text-left transition-all duration-300 ${
                  activeSection === 'about'
                    ? 'bg-white text-[#0D2343]'
                    : 'text-white hover:text-[#0D2343] hover:bg-white'
                }`}
              >
                About
              </button>
              <button
                onClick={() => navigateToSection('services')}
                className={`font-medium py-3 px-6 text-left transition-all duration-300 ${
                  activeSection === 'services'
                    ? 'bg-white text-[#0D2343]'
                    : 'text-white hover:text-[#0D2343] hover:bg-white'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => navigateToSection('contact')}
                className={`font-medium py-3 px-6 text-left transition-all duration-300 ${
                  activeSection === 'contact'
                    ? 'bg-white text-[#0D2343]'
                    : 'text-white hover:text-[#0D2343] hover:bg-white'
                }`}
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 px-6 py-2 border-t border-white/10 mt-2">
                <a
                  href="mailto:welcome@alliveteam.com"
                  className="flex items-center gap-2 text-white hover:text-[#BC9060] transition-all duration-300"
                >
                  <Mail size={18} />
                  <span>welcome@alliveteam.com</span>
                </a>
                <a
                  href="tel:+966583263520"
                  className="flex items-center gap-2 text-white hover:text-[#BC9060] transition-all duration-300"
                >
                  <Phone size={18} />
                  <span>+966 58 326 3520</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {activeSection === 'services' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-[#0D2343]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#0D2343]/30 shadow-lg">
          <button
            onClick={() => setActiveServiceTab('catering')}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
              activeServiceTab === 'catering'
                ? 'bg-white text-[#0D2343]'
                : 'text-white hover:bg-white hover:text-[#0D2343]'
            }`}
          >
            Catering
          </button>
          <button
            onClick={() => setActiveServiceTab('manpower')}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
              activeServiceTab === 'manpower'
                ? 'bg-white text-[#0D2343]'
                : 'text-white hover:bg-white hover:text-[#0D2343]'
            }`}
          >
            Manpower
          </button>
        </div>
      )}

      <div
        className="transition-opacity duration-500 ease-in-out"
        style={{
          display: 'block',
          margin: 0,
          padding: 0,
          lineHeight: 0,
          fontSize: 0,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease-in-out, transform 500ms ease-in-out'
        }}
      >
        {getCurrentImages().map((imageNum, index) => (
          <div
            key={`${activeSection}-${activeServiceTab}-${imageNum}`}
            ref={(el) => (imageRefs.current[index] = el)}
            data-image-index={imageNum}
            className="w-full relative overflow-hidden"
            style={{
              margin: 0,
              padding: 0,
              lineHeight: 0,
              fontSize: 0,
              display: 'block'
            }}
          >
            {loadedImages.has(imageNum) ? (
              <img
                src={`/assets/image${imageNum}.jpg`}
                alt={`Section ${imageNum}`}
                className="w-full h-auto object-cover transition-all duration-700 ease-out"
                style={{
                  opacity: visibleImages.has(imageNum) ? 1 : 0,
                  transform: visibleImages.has(imageNum) ? 'translateY(0)' : 'translateY(40px)',
                  display: 'block',
                  verticalAlign: 'top',
                  lineHeight: 0,
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%'
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
            )}
          </div>
        ))}
      </div>


      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#BC9060] text-white shadow-lg hover:bg-[#a67d4d] transition-all duration-300 flex items-center justify-center"
        style={{
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? 'visible' : 'hidden',
          transform: showScrollTop ? 'scale(1)' : 'scale(0.8)'
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      <Footer visible={showFooter && !isIdle} setIsHoveringFooter={setIsHoveringFooter} />
    </div>
  );
}

export default App;
