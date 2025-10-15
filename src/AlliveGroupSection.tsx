import { useState, useEffect, useRef } from 'react';
import { Users, UtensilsCrossed, Handshake } from 'lucide-react';

interface ServiceIcon {
  id: string;
  Icon: typeof Users;
  label: string;
  x: number;
  y: number;
}

const AlliveGroupSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: ServiceIcon[] = [
    {
      id: 'manpower',
      Icon: Users,
      label: 'MANPOWER',
      x: 15,
      y: 65
    },
    {
      id: 'catering',
      Icon: UtensilsCrossed,
      label: 'ON/OFFSHORE CATERING',
      x: 50,
      y: 50
    },
    {
      id: 'services',
      Icon: Handshake,
      label: 'ON-DEMAND SERVICES',
      x: 85,
      y: 25
    }
  ];

  const createHexagonPath = (cx: number, cy: number, size: number): string => {
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      points.push([x, y]);
    }
    return `M ${points.map(p => p.join(',')).join(' L ')} Z`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#0D2343' }}
    >
      <div className="absolute inset-0 max-w-[1920px] mx-auto">
        <h2
          className="absolute top-8 left-8 md:top-12 md:left-16 text-4xl md:text-6xl font-bold text-white z-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          ALLIVE GROUP
        </h2>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="hexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="hexGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5f5f5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d0d0d0" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="hexGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.5" />
            </linearGradient>

            <filter id="hexGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="iconGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              transformOrigin: '150px 950px',
              transition: 'all 1s ease-out'
            }}
          >
            <path
              d={createHexagonPath(180, 950, 80)}
              fill="url(#hexGradient1)"
              filter="url(#hexGlow)"
            />
            <path
              d={createHexagonPath(140, 890, 85)}
              fill="url(#hexGradient2)"
              filter="url(#hexGlow)"
            />
            <path
              d={createHexagonPath(220, 920, 75)}
              fill="url(#hexGradient3)"
              filter="url(#hexGlow)"
            />

            <path
              d={createHexagonPath(160, 920, 95)}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
            />
            <path
              d={createHexagonPath(200, 900, 65)}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />
            <path
              d={createHexagonPath(130, 940, 70)}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
            />
            <path
              d={createHexagonPath(175, 880, 55)}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
            />
            <path
              d={createHexagonPath(210, 960, 50)}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
            />
          </g>

          {services.map((service, idx) => {
            const iconX = (service.x / 100) * 1920;
            const iconY = (service.y / 100) * 1080;
            const hexCenterX = 180;
            const hexCenterY = 920;

            return (
              <g key={service.id}>
                <line
                  x1={hexCenterX}
                  y1={hexCenterY}
                  x2={iconX}
                  y2={iconY}
                  stroke="#BC9060"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.4"
                  style={{
                    strokeDashoffset: isVisible ? 0 : 1000,
                    transition: `stroke-dashoffset 1.2s ease-out ${idx * 0.3}s`
                  }}
                />
              </g>
            );
          })}
        </svg>

        {services.map((service, idx) => {
          const { Icon } = service;

          return (
            <div
              key={service.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${service.x}%`,
                top: `${service.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
                transition: `all 0.8s ease-out ${idx * 0.2 + 0.3}s`
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: '#0D2343',
                    border: '2px solid #BC9060'
                  }}
                >
                  <Icon
                    size={36}
                    color="#BC9060"
                    className="transition-all duration-300"
                  />

                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: '0 0 20px 5px rgba(188, 144, 96, 0.5)',
                      filter: 'blur(8px)'
                    }}
                  />
                </div>

                <p
                  className="text-white text-xs md:text-sm font-semibold text-center max-w-[120px] whitespace-nowrap"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {service.label}
                </p>
              </div>
            </div>
          );
        })}

        <div
          className="absolute bottom-8 right-8 md:bottom-16 md:right-16 max-w-[400px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease-out 0.5s'
          }}
        >
          <p
            className="text-xs md:text-sm leading-relaxed tracking-wide"
            style={{ color: '#BC9060' }}
          >
            WE ARE A TEAM OF SEASONED EXPERTS, UNITING OUR STRENGTHS AND EXPERTISE THROUGH A SEAMLESS COLLABORATION OF RESOURCES AND KNOWLEDGE FROM THE FIELDS WE EXCEL IN, TO DELIVER TAILORED, UNMATCHED SOLUTIONS THAT EXCEED YOUR NEEDS
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlliveGroupSection;
