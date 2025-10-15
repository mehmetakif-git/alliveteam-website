import { useEffect, useRef, useState } from 'react';
import {
  Building2,
  Users,
  UtensilsCrossed,
  Wrench,
  Shield,
  Target,
  TrendingUp,
  Award,
  Coffee,
  Salad,
  ChefHat,
  Clock,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Heart,
  Leaf,
  Zap,
  FileCheck,
  Briefcase,
  Globe,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  X,
  Star,
  Settings,
  Users2,
  HandshakeIcon,
  Search,
  Layers,
  Network
} from 'lucide-react';
import WorldMap from './WorldMap';
import AlliveGroupSection from './AlliveGroupSection';

function App() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionsRef.current).forEach((key) => {
      const element = sectionsRef.current[key];
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const setSectionRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionsRef.current[key] = el;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 1. Sticky Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D2343] shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[#BC9060]" />
            <span className="text-white font-bold text-xl">Allive Team</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'About', id: 'group-intro' },
              { label: 'Services', id: 'services' },
              { label: 'Global', id: 'world-teams' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white hover:text-[#BC9060] transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D2343] border-t border-white/10">
            <div className="px-8 py-4 space-y-4">
              {[
                { label: 'About', id: 'group-intro' },
                { label: 'Services', id: 'services' },
                { label: 'Global', id: 'world-teams' },
                { label: 'Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-white hover:text-[#BC9060] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-[#0D2343] geometric-pattern overflow-hidden">
        <div className="absolute inset-0 bg-[#0D2343] opacity-95"></div>
        <div className="relative z-10 text-center">
          <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <Building2 className="w-32 h-32 text-[#BC9060]" />
          </div>
        </div>
      </section>

{/* 3. Group Introduction Section */}
      <AlliveGroupSection />
      {/* 4. Services Overview Section */}
      <section
        id="services"
        ref={setSectionRef('services')}
        className="relative min-h-screen bg-white py-20 px-4 md:px-8"
      >
        <div className="absolute top-8 right-4 md:right-12 text-sm text-gray-400">Allive Team</div>
        <div className="absolute bottom-12 right-4 md:right-12">
          <h3 className="text-xl md:text-2xl font-bold text-black">FIELDS OF WORK</h3>
        </div>

        <div className="max-w-6xl mx-auto text-center pt-12">
          <div className="mb-16">
            <Building2 className="w-16 h-16 md:w-20 md:h-20 text-[#BC9060] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: Users, title: 'Manpower Solutions', desc: 'Strategic workforce deployment and comprehensive talent management services' },
              { icon: UtensilsCrossed, title: 'Catering Excellence', desc: 'Premium dining services for onshore and offshore operations' },
              { icon: Wrench, title: 'On-Demand Services', desc: 'Flexible solutions tailored to meet your specific operational needs' }
            ].map((service, idx) => (
              <div key={idx} className={`transform transition-all duration-700 ${isVisible['services'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className="relative bg-white p-8 md:p-10 rounded-lg shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                  <div className="aspect-square flex flex-col items-center justify-center">
                    <service.icon className="w-12 h-12 md:w-16 md:h-16 text-[#BC9060] mb-6" />
                    <h4 className="text-lg md:text-xl font-bold text-black mb-4">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Business Values Section */}
      <section
        ref={setSectionRef('values')}
        className="min-h-screen bg-white py-20 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#BC9060] text-sm font-semibold mb-2">BUSINESS VALUES</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-2">OUR BELIEFS</h2>
            <p className="text-[#BC9060] text-xl md:text-2xl italic">our value</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: 'Integrity', desc: 'We uphold the highest ethical standards in all our business operations' },
              { icon: Target, title: 'Excellence', desc: 'Committed to delivering superior quality in every service we provide' },
              { icon: TrendingUp, title: 'Innovation', desc: 'Continuously evolving to meet the changing needs of our clients' },
              { icon: Award, title: 'Commitment', desc: 'Dedicated to building lasting partnerships through reliable service' }
            ].map((value, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative h-48 mb-6">
                    <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-[#BC9060] transition-all duration-1000`}
                         style={{
                           height: isVisible['values'] ? '100%' : '0%',
                           transitionDelay: `${idx * 200}ms`
                         }}>
                    </div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-2 border-[#BC9060] flex items-center justify-center transition-all duration-700 ${isVisible['values'] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                         style={{ transitionDelay: `${idx * 200 + 500}ms` }}>
                      <value.icon className="w-8 h-8 text-[#BC9060]" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-black mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-600 text-center">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col md:flex-row items-start gap-8 max-w-3xl ml-auto">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="#BC9060" strokeWidth="1" />
                <polygon points="50,25 75,50 50,75 25,50" fill="none" stroke="#BC9060" strokeWidth="1" />
                <line x1="50" y1="10" x2="50" y2="25" stroke="#BC9060" strokeWidth="0.5" />
                <line x1="90" y1="50" x2="75" y2="50" stroke="#BC9060" strokeWidth="0.5" />
                <line x1="50" y1="90" x2="50" y2="75" stroke="#BC9060" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="25" y2="50" stroke="#BC9060" strokeWidth="0.5" />
              </svg>
            </div>
            <p className="text-gray-600 leading-relaxed pt-4">
              Our core values guide every decision we make and every action we take. We believe that success
              is built on a foundation of trust, quality, and continuous improvement. These principles have
              shaped our organization and continue to drive us forward.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Allive Dining Introduction Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-8">
            <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-[#BC9060]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-black mb-12">ALLIVE DINING</h2>

          <div className="space-y-6">
            {[
              { icon: Coffee, text: 'Premium Coffee & Beverage Services' },
              { icon: Salad, text: 'Fresh & Nutritious Meal Planning' },
              { icon: ChefHat, text: 'Professional Chef Services' },
              { icon: Clock, text: '24/7 Catering Operations' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                <span className="text-[#BC9060] text-base md:text-lg font-semibold group-hover:translate-x-2 transition-transform duration-300">{item.text}</span>
                <item.icon className="w-6 h-6 text-[#BC9060] group-hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-200 min-h-[400px] lg:min-h-full order-1 lg:order-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <UtensilsCrossed className="w-48 h-48 md:w-64 md:h-64 text-gray-400/30" />
          </div>
        </div>
      </section>

      {/* 7. Core Services Framework Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen dark-gradient">
        <div className="relative p-8 md:p-16 flex flex-col justify-center">
          <div className="absolute top-8 right-8 md:right-12 text-sm text-white/50">Allive Team</div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">CORE SERVICES</h2>
          <p className="text-[#BC9060] text-xl md:text-2xl italic mb-8">framework</p>

          <div className="space-y-6 text-white">
            <p className="leading-relaxed">
              Our comprehensive catering framework is designed to deliver exceptional dining experiences
              in the most challenging environments. From offshore platforms to remote worksites, we ensure
              that every meal meets the highest standards of quality, nutrition, and taste.
            </p>
            <p className="leading-relaxed">
              With decades of experience in the industry, our team understands the unique demands of
              industrial catering. We combine logistical expertise with culinary excellence to create
              sustainable, efficient, and satisfying meal programs.
            </p>
          </div>
        </div>

        <div className="relative bg-gray-300 min-h-[400px] lg:min-h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-48 h-48 md:w-64 md:h-64 text-gray-500/30" />
          </div>
        </div>
      </section>

      {/* 8. Our Expertise Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative bg-gray-200 min-h-[400px] lg:min-h-full order-2 lg:order-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <Lightbulb className="w-48 h-48 md:w-64 md:h-64 text-gray-400/30" />
          </div>
        </div>

        <div className="bg-[#0D2343] p-8 md:p-16 flex flex-col justify-center order-1 lg:order-2">
          <div className="space-y-12 mb-16">
            {[
              {
                title: 'Offshore Operations',
                subtitle: 'Maritime Excellence',
                desc: 'Specialized catering solutions for oil rigs, vessels, and marine installations with complete supply chain management.'
              },
              {
                title: 'Industrial Sites',
                subtitle: 'Large-Scale Dining',
                desc: 'Comprehensive food service operations for mining, construction, and manufacturing facilities worldwide.'
              },
              {
                title: 'Remote Locations',
                subtitle: 'Logistical Mastery',
                desc: 'Expert delivery of high-quality meals to the most challenging and isolated work environments.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border-l-2 border-[#BC9060] pl-6">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-[#BC9060] text-sm font-semibold mb-3">{item.subtitle}</p>
                <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white">OUR EXPERTISE</h2>
        </div>
      </section>

      {/* 9. The Allive Experience Section */}
      <section
        ref={setSectionRef('experience')}
        className="relative min-h-screen dark-gradient py-20 px-4 md:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="relative w-full max-w-4xl">
              <div className="relative z-20 mx-auto w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center animate-float">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-300 rounded-xl flex items-center justify-center">
                  <Heart className="w-24 h-24 md:w-32 md:h-32 text-gray-500/50" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-[120%] h-[120%] transition-transform duration-1000 ${isVisible['experience'] ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <ellipse cx="200" cy="200" rx="180" ry="120" fill="none" stroke="#BC9060" strokeWidth="1" opacity="0.3" className="animate-pulse-glow" />
                    <ellipse cx="200" cy="200" rx="150" ry="90" fill="none" stroke="#BC9060" strokeWidth="1" opacity="0.4" />
                  </svg>
                </div>
              </div>

              <div className={`absolute -top-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${isVisible['experience'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20">
                  <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-[#BC9060] mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1 text-sm md:text-base">Quality Assurance</h4>
                  <p className="text-[#BC9060] text-xs mb-2">ISO Certified</p>
                  <p className="text-white/70 text-xs">Rigorous quality control</p>
                </div>
              </div>

              <div className={`absolute top-1/2 -translate-y-1/2 -right-8 md:-right-32 text-center transition-all duration-700 delay-200 ${isVisible['experience'] ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20">
                  <Leaf className="w-10 h-10 md:w-12 md:h-12 text-[#BC9060] mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1 text-sm md:text-base">Sustainability</h4>
                  <p className="text-[#BC9060] text-xs mb-2">Eco-Conscious</p>
                  <p className="text-white/70 text-xs">Environmental responsibility</p>
                </div>
              </div>

              <div className={`absolute -bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 delay-400 ${isVisible['experience'] ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20">
                  <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#BC9060] mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1 text-sm md:text-base">Innovation</h4>
                  <p className="text-[#BC9060] text-xs mb-2">Future-Forward</p>
                  <p className="text-white/70 text-xs">Cutting-edge solutions</p>
                </div>
              </div>

              <div className={`absolute top-1/2 -translate-y-1/2 -left-8 md:-left-32 text-center transition-all duration-700 delay-600 ${isVisible['experience'] ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20">
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-[#BC9060] mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1 text-sm md:text-base">People First</h4>
                  <p className="text-[#BC9060] text-xs mb-2">Client-Centric</p>
                  <p className="text-white/70 text-xs">Lasting relationships</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:absolute md:bottom-12 md:right-12 mt-12 md:mt-0">
            <div className="flex gap-4">
              {[FileCheck, Shield, Award, CheckCircle2].map((Icon, idx) => (
                <div key={idx} className={`w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center transition-all duration-500 hover:scale-110 ${isVisible['experience'] ? 'opacity-100' : 'opacity-0'}`}
                     style={{ transitionDelay: `${idx * 100 + 800}ms` }}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#BC9060]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Why Us Section */}
      <section
        ref={setSectionRef('why-us')}
        className="relative min-h-screen dark-gradient py-20 px-4 md:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-20">WHY US?</h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            <div className="relative flex-shrink-0">
              <div className={`w-64 h-64 md:w-80 md:h-80 relative transition-all duration-1000 ${isVisible['why-us'] ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-45'}`}>
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <polygon points="100,20 160,60 180,120 140,170 60,170 20,120 40,60" fill="none" stroke="#BC9060" strokeWidth="2" className="animate-pulse-glow" />
                  <polygon points="100,40 140,70 155,115 125,155 75,155 45,115 60,70" fill="none" stroke="#BC9060" strokeWidth="1.5" opacity="0.7" />
                  <polygon points="100,60 120,80 130,110 110,140 90,140 70,110 80,80" fill="none" stroke="#BC9060" strokeWidth="1" opacity="0.5" />
                  <circle cx="100" cy="100" r="10" fill="#BC9060" opacity="0.8" />
                </svg>

                {[
                  { icon: Star, angle: 0 },
                  { icon: Settings, angle: 60 },
                  { icon: Users2, angle: 120 },
                  { icon: HandshakeIcon, angle: 180 },
                  { icon: Search, angle: 240 },
                  { icon: Layers, angle: 300 }
                ].map((item, idx) => {
                  const radius = 140;
                  const x = 100 + radius * Math.cos((item.angle - 90) * Math.PI / 180);
                  const y = 100 + radius * Math.sin((item.angle - 90) * Math.PI / 180);

                  return (
                    <div
                      key={idx}
                      className={`absolute w-12 h-12 md:w-16 md:h-16 transition-all duration-700`}
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: 'translate(-50%, -50%)',
                        transitionDelay: `${idx * 100 + 300}ms`,
                        opacity: isVisible['why-us'] ? 1 : 0
                      }}
                    >
                      <div className="relative w-full h-full">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 50 50">
                          <polygon points="25,5 40,15 40,35 25,45 10,35 10,15" fill="none" stroke="#BC9060" strokeWidth="1" strokeDasharray="2,2" className="animate-pulse-glow" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <item.icon className="w-6 h-6 md:w-8 md:h-8 text-[#BC9060]" />
                        </div>
                      </div>
                      <svg className="absolute left-1/2 top-1/2 w-[200%] h-[200%] pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                        <line x1="50%" y1="50%" x2={`${(100 - x) / 2}%`} y2={`${(100 - y) / 2}%`} stroke="#BC9060" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-[#BC9060] text-base md:text-lg leading-relaxed">
                With over two decades of industry experience, Allive Group has established itself as a trusted partner for organizations worldwide. Our commitment to excellence, combined with our innovative approach and deep understanding of client needs, sets us apart in the competitive landscape. We deliver not just services, but comprehensive solutions that drive success and create lasting value for our partners. Our proven track record, certified quality systems, and dedicated teams ensure that every project exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Allive Manpower Introduction Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-8">
            <Briefcase className="w-12 h-12 md:w-16 md:h-16 text-[#BC9060]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-black mb-12">ALLIVE MANPOWER</h2>

          <div className="space-y-6">
            {[
              { icon: Users2, text: 'Skilled Workforce Recruitment' },
              { icon: Target, text: 'Talent Assessment & Placement' },
              { icon: TrendingUp, text: 'Career Development Programs' },
              { icon: HandshakeIcon, text: 'Long-Term Partnership Solutions' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                <span className="text-[#BC9060] text-base md:text-lg font-semibold group-hover:translate-x-2 transition-transform duration-300">{item.text}</span>
                <item.icon className="w-6 h-6 text-[#BC9060] group-hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-200 min-h-[400px] lg:min-h-full order-1 lg:order-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <Users2 className="w-48 h-48 md:w-64 md:h-64 text-gray-400/30" />
          </div>
        </div>
      </section>

      {/* 12. Allive Services Detail Section */}
      <section
        ref={setSectionRef('services-detail')}
        className="relative min-h-screen dark-gradient py-20 px-4 md:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            <div className="space-y-8 max-w-md order-2 lg:order-1">
              {[
                { icon: Network, title: 'Global Network', desc: 'Extensive reach across continents with local expertise in every market we serve.' },
                { icon: Layers, title: 'Integrated Solutions', desc: 'Comprehensive service packages that address all aspects of your operational needs.' }
              ].map((item, idx) => (
                <div key={idx} className={`transition-all duration-700 ${isVisible['services-detail'] ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#BC9060]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-[#BC9060]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative order-1 lg:order-2">
              <div className={`w-64 h-64 md:w-96 md:h-96 relative transition-all duration-1000 ${isVisible['services-detail'] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="absolute inset-0 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Globe className="w-32 h-32 md:w-48 md:h-48 text-gray-500/50" />
                </div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#BC9060" strokeWidth="1" opacity="0.3" className="animate-pulse-glow" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#BC9060" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#BC9060" strokeWidth="0.5" opacity="0.5" />
                </svg>
              </div>
            </div>

            <div className="space-y-8 max-w-md order-3">
              {[
                { icon: CheckCircle2, title: 'Quality Assurance', desc: 'Rigorous standards and continuous monitoring to ensure excellence in every delivery.' },
                { icon: Zap, title: 'Rapid Deployment', desc: 'Quick mobilization and efficient setup to meet your urgent operational requirements.' }
              ].map((item, idx) => (
                <div key={idx} className={`transition-all duration-700 ${isVisible['services-detail'] ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#BC9060]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-[#BC9060]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. Manpower Process Section */}
      <section
        ref={setSectionRef('manpower-process')}
        className="relative min-h-screen dark-gradient py-20 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Search, title: 'Talent Sourcing', desc: 'Comprehensive recruitment strategies to identify the best candidates for your needs.' },
              { icon: Target, title: 'Skills Assessment', desc: 'Rigorous evaluation processes to ensure quality and competency.' },
              { icon: TrendingUp, title: 'Training & Development', desc: 'Continuous learning programs to enhance workforce capabilities.' }
            ].map((feature, idx) => (
              <div key={idx} className={`transition-all duration-700 ${isVisible['manpower-process'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-[#BC9060]/50 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-[#BC9060] mb-4" />
                  <h4 className="text-lg md:text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">Our Process</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Search, label: 'Identify' },
                { icon: CheckCircle2, label: 'Assess' },
                { icon: Users2, label: 'Deploy' },
                { icon: TrendingUp, label: 'Support' }
              ].map((step, idx) => (
                <div key={idx} className={`text-center transition-all duration-700 ${isVisible['manpower-process'] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{ transitionDelay: `${idx * 150 + 500}ms` }}>
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full border-4 border-[#BC9060] bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 md:w-14 md:h-14 text-[#BC9060]" />
                  </div>
                  <p className="text-white font-semibold text-sm md:text-base">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Allive World Teams Section */}
      <section
        id="world-teams"
        ref={setSectionRef('world-teams')}
        className="relative min-h-screen dark-gradient py-20 px-4 md:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 overflow-hidden">
              {'ALLIVE WORLD TEAMS'.split('').map((letter, idx) => (
                <span
                  key={idx}
                  className={`inline-block transition-all duration-500`}
                  style={{
                    opacity: isVisible['world-teams'] ? 1 : 0,
                    transform: isVisible['world-teams'] ? 'translateY(0)' : 'translateY(-20px)',
                    transitionDelay: `${idx * 50}ms`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h2>
            <p
              className="text-white/80 text-base md:text-lg transition-all duration-700"
              style={{
                opacity: isVisible['world-teams'] ? 1 : 0,
                transform: isVisible['world-teams'] ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '900ms'
              }}
            >
              Globally Connected, Locally Rooted, Driving Excellence Everywhere.
            </p>
          </div>

          <div className="relative my-16">
            <WorldMap isVisible={isVisible['world-teams'] || false} />
          </div>
        </div>
      </section>

      {/* 15. Get in Touch Section */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="dark-gradient p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">GET IN TOUCH</h2>

          <p className="text-white/80 leading-relaxed mb-12">
            Ready to discuss your requirements? Our team is available to provide expert consultation and develop customized solutions for your organization. Contact us today to learn how Allive Group can support your success.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#BC9060]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-[#BC9060]" />
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Email Us</p>
                <p className="text-[#BC9060] font-semibold text-base md:text-lg">contact@allivegroup.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#BC9060]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-[#BC9060]" />
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Call Us</p>
                <p className="text-[#BC9060] font-semibold text-base md:text-lg">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#BC9060]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-[#BC9060]" />
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Visit Us</p>
                <p className="text-white text-base md:text-lg">123 Business Avenue<br/>Corporate District<br/>Global City, GC 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 min-h-[400px] lg:min-h-full order-1 lg:order-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-48 h-48 md:w-64 md:h-64 text-gray-400/30" />
          </div>
        </div>
      </section>

      {/* 16. Footer Section */}
      <footer className="bg-[#09182F] py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-[#BC9060]" />
              <span className="text-white font-semibold text-lg">Allive Group</span>
            </div>

            <div className="flex items-center gap-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#BC9060]/20 hover:border-[#BC9060] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white/70 hover:text-[#BC9060]" />
                </a>
              ))}
            </div>

            <p className="text-white/60 text-sm text-center md:text-right">
              © 2025 Allive Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
