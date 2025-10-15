import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

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

  const slogans = [
    { service: 'CATERING', slogan: 'Excellence in Every Bite' },
    { service: 'HOUSEKEEPING', slogan: 'Spotless Spaces, Seamless Service' },
    { service: 'MANPOWER', slogan: 'Skilled Professionals, Delivered' }
  ];

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navItems = [
    { label: 'About', targetImage: 1 },
    { label: 'Services', targetImage: 6 },
    { label: 'Global', targetImage: 11 },
    { label: 'Contact', targetImage: 16 }
  ];

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);

    return () => clearInterval(sloganInterval);
  }, []);

  useEffect(() => {
    const imagePromises = Array.from({ length: 18 }, (_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadingProgress((prev) => {
            const newProgress = prev + (100 / 18);
            return newProgress > 100 ? 100 : newProgress;
          });
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `/assets/image${i + 1}.jpg`;
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 400);

      if (currentScrollY < 100) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
  }, []);

  const scrollToImage = (imageNumber: number) => {
    const targetRef = imageRefs.current[imageNumber - 1];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          navbarVisible ? 'top-6' : '-top-32'
        }`}
      >
        <div
          className={`flex items-center gap-2 px-6 py-3 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 border-gray-200 shadow-xl'
              : 'bg-white/90 border-white/20 shadow-md'
          }`}
        >
          <img
            src="/assets/logo.svg"
            alt="Allive Logo"
            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{
              height: scrolled ? '32px' : '40px',
              width: 'auto'
            }}
            onClick={scrollToTop}
          />

          <div className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToImage(item.targetImage)}
                className="px-4 py-2 text-[#0D2343] hover:text-[#BC9060] hover:bg-[#BC9060]/10 rounded-full transition-all duration-300 font-medium text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="ml-4 hidden md:block px-5 py-2 bg-[#BC9060] text-white rounded-full hover:bg-[#a67d4f] transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
            onClick={() => scrollToImage(16)}
          >
            Get Quote
          </button>

          <button
            className="md:hidden ml-4 text-[#0D2343] transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="flex flex-col py-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToImage(item.targetImage);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#0D2343] hover:text-[#BC9060] hover:bg-[#BC9060]/10 transition-all duration-300 font-medium py-3 px-6 text-left"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToImage(16);
                  setMobileMenuOpen(false);
                }}
                className="mx-4 my-2 px-5 py-2 bg-[#BC9060] text-white rounded-full hover:bg-[#a67d4f] transition-all duration-300 font-medium text-sm text-center"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-16">
        {Array.from({ length: 18 }, (_, i) => i + 1).map((imageNum) => (
          <div
            key={imageNum}
            ref={(el) => (imageRefs.current[imageNum - 1] = el)}
            data-image-index={imageNum}
            className="w-full relative overflow-hidden"
            style={{
              minHeight: '400px',
              lineHeight: 0,
              fontSize: 0
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
                  padding: 0
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
    </div>
  );
}

export default App;
