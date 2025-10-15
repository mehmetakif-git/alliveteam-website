function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0D2343] border-t border-[#0D2343]/30 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/assets/logo.svg"
            alt="Allive Logo"
            className="h-8 w-auto cursor-pointer hover:opacity-80 transition-all duration-300"
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

          <button
            onClick={scrollToTop}
            className="px-5 py-2 bg-white text-[#0D2343] rounded-full hover:bg-[#BC9060] hover:text-white transition-all duration-300 font-medium text-sm shadow-md"
          >
            Get Quote
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            © 2025 Allive Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
