import React from 'react';
import { CityScores } from '../types';

interface RadarChartProps {
  scores: CityScores;
  size?: number;
  color?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 200, color = "#b91c1c" }) => {
  const radius = size / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const levels = 4;
  const maxScore = 100;
  
  // Dimensions order: Career, Wealth, Health, Relationship, Potential
  // This corresponds to top, top-right, bottom-right, bottom-left, top-left roughly (pentagon)
  const keys: (keyof CityScores)[] = ['career', 'wealth', 'health', 'relationship', 'potential'];
  const labels = ['事业', '财运', '健康', '感情', '潜力'];
  
  const angleStep = (Math.PI * 2) / 5;

  // Helper to calculate coordinates
  const getCoordinates = (value: number, index: number) => {
    // Start from top (index 0 implies -PI/2)
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / maxScore) * (radius - 30); // Leave padding for labels
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const points = keys.map((key, i) => {
    const { x, y } = getCoordinates(scores[key], i);
    return `${x},${y}`;
  }).join(' ');

  // Grid polygons
  const gridPolygons = Array.from({ length: levels }).map((_, levelIndex) => {
    const levelScore = (maxScore / levels) * (levelIndex + 1);
    const polyPoints = keys.map((_, i) => {
      const { x, y } = getCoordinates(levelScore, i);
      return `${x},${y}`;
    }).join(' ');
    return polyPoints;
  });

  // Axis lines
  const axes = keys.map((_, i) => {
    const { x, y } = getCoordinates(maxScore, i);
    return { x1: centerX, y1: centerY, x2: x, y2: y };
  });

  // Labels
  const labelEls = labels.map((label, i) => {
    const { x, y } = getCoordinates(maxScore + 20, i);
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] fill-stone-500 font-serif"
      >
        {label}
      </text>
    );
  });

  return (
    <div className="relative flex justify-center items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {gridPolygons.map((poly, i) => (
          <polygon
            key={i}
            points={poly}
            fill="none"
            stroke="#e7e5e4"
            strokeWidth="1"
            className="transition-all"
          />
        ))}
        
        {/* Axes */}
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="#e7e5e4"
            strokeWidth="1"
          />
        ))}

        {/* Data Area */}
        <polygon
          points={points}
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />

        {/* Data Points */}
        {keys.map((key, i) => {
          const { x, y } = getCoordinates(scores[key], i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="white"
              stroke={color}
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {labelEls}
      </svg>
    </div>
  );
};

export default RadarChart;