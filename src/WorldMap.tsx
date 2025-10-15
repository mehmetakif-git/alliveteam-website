import { useEffect, useState } from 'react';

interface Location {
  x: number;
  y: number;
  name: string;
  lat: number;
  lng: number;
}

interface Connection {
  from: Location;
  to: Location;
}

const WorldMap = ({ isVisible }: { isVisible: boolean }) => {
  const [animatedArcs, setAnimatedArcs] = useState<number[]>([]);

  const locations: Location[] = [
    { x: 200, y: 230, name: 'North America', lat: 40.7128, lng: -74.0060 },
    { x: 350, y: 190, name: 'Europe', lat: 51.5074, lng: -0.1278 },
    { x: 500, y: 210, name: 'Middle East', lat: 25.2854, lng: 51.5310 },
    { x: 650, y: 220, name: 'Asia', lat: 35.6762, lng: 139.6503 },
    { x: 820, y: 270, name: 'Australia', lat: -33.8688, lng: 151.2093 }
  ];

  const connections: Connection[] = [
    { from: locations[1], to: locations[0] },
    { from: locations[1], to: locations[2] },
    { from: locations[2], to: locations[3] },
    { from: locations[3], to: locations[4] },
    { from: locations[0], to: locations[3] },
    { from: locations[2], to: locations[4] }
  ];

  useEffect(() => {
    if (isVisible) {
      setAnimatedArcs([]);
      connections.forEach((_, idx) => {
        setTimeout(() => {
          setAnimatedArcs(prev => [...prev, idx]);
        }, idx * 1000);
      });
    } else {
      setAnimatedArcs([]);
    }
  }, [isVisible]);

  const generateWorldDots = () => {
    const dots = [];
    const spacing = 10;
    const viewBoxWidth = 1000;
    const viewBoxHeight = 500;
    const fadeZoneTop = 60;
    const fadeZoneBottom = 440;

    const continentShapes = [
      { centerX: 200, centerY: 230, radiusX: 120, radiusY: 100 },
      { centerX: 380, centerY: 200, radiusX: 100, radiusY: 80 },
      { centerX: 520, centerY: 230, radiusX: 80, radiusY: 70 },
      { centerX: 680, centerY: 220, radiusX: 140, radiusY: 110 },
      { centerX: 850, centerY: 290, radiusX: 90, radiusY: 70 }
    ];

    for (let x = 0; x < viewBoxWidth; x += spacing) {
      for (let y = fadeZoneTop; y < fadeZoneBottom; y += spacing) {
        let inContinent = false;
        let continentDensity = 0.3;

        for (const continent of continentShapes) {
          const dx = (x - continent.centerX) / continent.radiusX;
          const dy = (y - continent.centerY) / continent.radiusY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 1) {
            inContinent = true;
            continentDensity = Math.max(0.6, 1 - distance);
            break;
          }
        }

        const distanceFromTop = y - fadeZoneTop;
        const distanceFromBottom = fadeZoneBottom - y;
        const minDistance = Math.min(distanceFromTop, distanceFromBottom);
        const fadeDistance = 70;

        let fadeOpacity = 1;
        if (minDistance < fadeDistance) {
          fadeOpacity = Math.pow(minDistance / fadeDistance, 1.5);
        }

        const baseOpacity = inContinent ? 0.35 : 0.15;
        const randomVariation = Math.random() * 0.1;
        const finalOpacity = (baseOpacity + randomVariation) * fadeOpacity * continentDensity;

        if (Math.random() < continentDensity) {
          dots.push(
            <circle
              key={`dot-${x}-${y}`}
              cx={x + (Math.random() - 0.5) * spacing * 0.5}
              cy={y + (Math.random() - 0.5) * spacing * 0.5}
              r={inContinent ? "1.2" : "0.8"}
              fill="#D1D5DB"
              opacity={finalOpacity}
            />
          );
        }
      }
    }
    return dots;
  };

  const createCurvedPath = (from: Location, to: Location) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const controlPointOffset = distance * 0.25;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - controlPointOffset;

    return `M ${from.x} ${from.y} Q ${midX} ${midY}, ${to.x} ${to.y}`;
  };

  const getPathLength = (from: Location, to: Location) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.sqrt(dx * dx + dy * dy) * 1.3;
  };

  return (
    <div className="relative w-full">
      <svg
        className="w-full h-auto"
        viewBox="0 0 1000 500"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BC9060" stopOpacity="0" />
            <stop offset="15%" stopColor="#BC9060" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#BC9060" stopOpacity="1" />
            <stop offset="85%" stopColor="#BC9060" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BC9060" stopOpacity="0" />
          </linearGradient>

          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="markerGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="pingGradient">
            <stop offset="0%" stopColor="#BC9060" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#BC9060" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#BC9060" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="world-dots">
          {generateWorldDots()}
        </g>

        {connections.map((connection, idx) => {
          const isAnimated = animatedArcs.includes(idx);
          const pathD = createCurvedPath(connection.from, connection.to);
          const pathLength = getPathLength(connection.from, connection.to);

          return (
            <g key={`connection-${idx}`}>
              <path
                d={pathD}
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#pathGlow)"
                strokeDasharray={pathLength}
                strokeDashoffset={isAnimated ? 0 : pathLength}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isAnimated ? 1 : 0,
                  transitionProperty: 'stroke-dashoffset, opacity'
                }}
              />
            </g>
          );
        })}

        {locations.map((location, idx) => {
          const shouldShow = animatedArcs.some(arcIdx => {
            const conn = connections[arcIdx];
            return conn.from === location || conn.to === location;
          });

          return (
            <g key={`location-${idx}`}>
              {shouldShow && (
                <>
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r="6"
                    fill="url(#pingGradient)"
                    className="animate-radar-ping"
                  />
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r="6"
                    fill="url(#pingGradient)"
                    className="animate-radar-ping"
                    style={{ animationDelay: '1s' }}
                  />
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r="6"
                    fill="url(#pingGradient)"
                    className="animate-radar-ping"
                    style={{ animationDelay: '2s' }}
                  />
                </>
              )}

              <circle
                cx={location.x}
                cy={location.y}
                r="6"
                fill="#BC9060"
                filter="url(#markerGlow)"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: 'opacity 0.4s ease-out'
                }}
              />

              <circle
                cx={location.x}
                cy={location.y}
                r="3"
                fill="#FFFFFF"
                style={{
                  opacity: shouldShow ? 0.9 : 0,
                  transition: 'opacity 0.4s ease-out'
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorldMap;
