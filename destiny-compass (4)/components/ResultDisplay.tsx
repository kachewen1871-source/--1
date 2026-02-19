import React from 'react';
import { BaziResult } from '../types';
import { Scroll, Compass, Building2, Briefcase } from 'lucide-react';
import RadarChart from './RadarChart';

interface ResultDisplayProps {
  result: BaziResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      
      {/* 命局简析 */}
      <div className="bg-[#fdfbf7] rounded-xl shadow-lg border border-stone-200 overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#b91c1c]"></div>
        <div className="px-6 py-5 md:px-8 md:py-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-[#b91c1c]/10 rounded-lg mr-3">
              <Scroll className="w-5 h-5 text-[#b91c1c]" />
            </div>
            <h3 className="serif text-xl font-bold tracking-widest text-[#1c1917]">命局简析</h3>
          </div>
          
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {result.analysis.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#b91c1c]/5 border border-[#b91c1c]/20 text-[#b91c1c] text-sm font-serif rounded-full whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-stone-700 text-base md:text-lg leading-relaxed font-serif text-justify">
            {result.analysis.summary}
          </p>
        </div>
      </div>

      {/* 推荐城市 - Cards with Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {result.cities.map((city, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl border border-stone-100 relative overflow-hidden hover:shadow-2xl transition-shadow">
             {/* Decorative Number */}
             <div className="absolute -top-4 -right-4 text-[120px] font-serif text-stone-50 select-none pointer-events-none">
               {idx + 1}
             </div>

             <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <div className="w-1 h-8 bg-[#b91c1c] mr-3"></div>
                  <h4 className="serif text-2xl font-bold text-[#1c1917]">{city.name}</h4>
                </div>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed h-10 line-clamp-2">
                  {city.description}
                </p>
                
                {/* Radar Chart */}
                <div className="flex justify-center mb-4">
                  <RadarChart scores={city.scores} size={180} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-center text-stone-400">
                  <div className="bg-stone-50 py-1 rounded">潜力指数: {city.scores.potential}</div>
                  <div className="bg-stone-50 py-1 rounded">宜居指数: {city.scores.health}</div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* 发展建议 */}
      <div className="bg-[#1c1917] text-[#fdfbf7] rounded-xl shadow-xl overflow-hidden p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#b91c1c] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center mb-6 relative z-10">
          <Briefcase className="w-6 h-6 text-[#b91c1c] mr-3" />
          <h3 className="serif text-xl font-bold tracking-widest">锦囊妙计</h3>
        </div>
        
        <div className="prose prose-invert prose-p:text-stone-300 prose-p:font-light prose-p:leading-8 relative z-10 text-justify">
          {result.advice}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 text-stone-400 hover:text-[#b91c1c] font-medium transition-colors text-sm tracking-widest uppercase flex items-center justify-center gap-2 group"
      >
        <span className="w-8 h-[1px] bg-stone-200 group-hover:bg-[#b91c1c] transition-colors"></span>
        重新测算
        <span className="w-8 h-[1px] bg-stone-200 group-hover:bg-[#b91c1c] transition-colors"></span>
      </button>
    </div>
  );
};

export default ResultDisplay;