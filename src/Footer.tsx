import { Mail, Phone } from 'lucide-react';

interface FooterProps {
  visible: boolean;
}

function Footer({ visible }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: visible
          ? 'opacity 300ms ease-in-out, transform 300ms ease-in-out, visibility 300ms'
          : 'opacity 200ms ease-in-out, transform 200ms ease-in-out, visibility 200ms',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <div
        className="w-full px-6 py-4"
        style={{
          backgroundColor: 'rgba(13, 35, 67, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img
              src="/assets/logo.svg"
              alt="Allive Logo"
              className="h-8 w-auto cursor-pointer hover:opacity-80 transition-all duration-300 flex-shrink-0"
              onClick={scrollToTop}
            />

            <div className="flex items-center gap-6">
              <a
                href="#about"
                className="text-white hover:text-[#BC9060] transition-all duration-300 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#services"
                className="text-white hover:text-[#BC9060] transition-all duration-300 text-sm font-medium"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-white hover:text-[#BC9060] transition-all duration-300 text-sm font-medium"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4 text-white text-sm flex-shrink-0">
              <a
                href="mailto:welcome@alliveteam.com"
                className="flex items-center gap-2 hover:text-[#BC9060] transition-all duration-300"
              >
                <Mail size={18} />
                <span className="hidden lg:block">welcome@alliveteam.com</span>
              </a>
              <a
                href="tel:+966583263520"
                className="flex items-center gap-2 hover:text-[#BC9060] transition-all duration-300"
              >
                <Phone size={18} />
                <span className="hidden lg:block">+966 58 326 3520</span>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-white/70 text-xs md:text-sm">
              © 2025 Allive Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
