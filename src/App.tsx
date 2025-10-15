import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navItems = [
    { label: 'About', targetImage: 1 },
    { label: 'Services', targetImage: 6 },
    { label: 'Global', targetImage: 11 },
    { label: 'Contact', targetImage: 16 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'bg-[#0D2343] shadow-lg' : 'bg-[#0D2343]/95'
        }`}
        style={{
          padding: scrolled ? '0.75rem 0' : '1rem 0'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="text-[#BC9060] font-bold tracking-wider transition-all duration-500"
            style={{
              fontSize: scrolled ? '1.25rem' : '1.5rem'
            }}
          >
            ALLIVE
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToImage(item.targetImage)}
                className="text-white hover:text-[#BC9060] transition-all duration-300 font-medium"
                style={{
                  fontSize: scrolled ? '0.875rem' : '1rem'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={scrolled ? 20 : 24} />
            ) : (
              <Menu size={scrolled ? 20 : 24} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D2343] border-t border-white/10">
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToImage(item.targetImage)}
                  className="text-white hover:text-[#BC9060] transition-colors duration-300 font-medium py-3 px-6 text-left"
                >
                  {item.label}
                </button>
              ))}
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
              minHeight: '400px'
            }}
          >
            {loadedImages.has(imageNum) ? (
              <img
                src={`/assets/image${imageNum}.jpg`}
                alt={`Section ${imageNum}`}
                className="w-full h-auto object-cover transition-all duration-700 ease-out"
                style={{
                  opacity: visibleImages.has(imageNum) ? 1 : 0,
                  transform: visibleImages.has(imageNum) ? 'translateY(0)' : 'translateY(40px)'
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
