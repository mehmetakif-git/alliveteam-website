import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
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

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToImage = (imageNumber: number) => {
    const targetRef = imageRefs.current[imageNumber - 1];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0D2343] shadow-lg' : 'bg-[#0D2343]/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-[#BC9060] text-xl md:text-2xl font-bold tracking-wider">
            ALLIVE
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToImage(item.targetImage)}
                className="text-white hover:text-[#BC9060] transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="w-full relative"
            style={{
              minHeight: '400px'
            }}
          >
            {loadedImages.has(imageNum) ? (
              <img
                src={`/assets/image${imageNum}.jpg`}
                alt={`Section ${imageNum}`}
                className="w-full h-auto object-cover transition-opacity duration-500"
                style={{
                  opacity: loadedImages.has(imageNum) ? 1 : 0
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
