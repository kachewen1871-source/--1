import React, { useRef, useEffect } from 'react';

interface WheelPickerProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const ITEM_HEIGHT = 40; // Height of each item in pixels

const WheelPicker: React.FC<WheelPickerProps> = ({ options, value, onChange, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current) {
      const index = options.indexOf(value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, []); // Run once on mount to set initial position

  // Sync scroll if value changes externally (not by scroll)
  useEffect(() => {
    if (containerRef.current && !isScrolling.current) {
       const index = options.indexOf(value);
       if (index !== -1) {
         // check if current scrollTop is far off (allow small margin for manual scroll drift)
         const currentScroll = containerRef.current.scrollTop;
         const targetScroll = index * ITEM_HEIGHT;
         if (Math.abs(currentScroll - targetScroll) > ITEM_HEIGHT / 2) {
            containerRef.current.scrollTop = targetScroll;
         }
       }
    }
  }, [value, options]);

  const handleScrollEnd = () => {
    if (containerRef.current) {
      isScrolling.current = false;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      // Clamp index
      const clampedIndex = Math.max(0, Math.min(index, options.length - 1));
      
      const selectedValue = options[clampedIndex];
      if (selectedValue !== value) {
        onChange(selectedValue);
      }
    }
  };

  // Add scroll listener with debounce
  useEffect(() => {
    const container = containerRef.current;
    let timeoutId: any;
    
    const onScroll = () => {
      isScrolling.current = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScrollEnd, 100);
    };

    if (container) {
      container.addEventListener('scroll', onScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, [options, value]);

  return (
    <div className="flex-1 flex flex-col items-center h-full">
      {label && <div className="text-stone-400 text-[10px] mb-1 font-medium tracking-widest uppercase">{label}</div>}
      <div className="relative h-[120px] w-full overflow-hidden">
        {/* Highlight Bar - Center is at 40px to 80px */}
        <div className="absolute top-[40px] left-0 w-full h-[40px] bg-stone-100/50 border-t border-b border-[#b91c1c]/20 pointer-events-none z-10 box-border"></div>
        
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-white via-white/90 to-transparent pointer-events-none z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-20"></div>

        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="h-[40px]"></div> {/* Top Padding */}
          {options.map((option, idx) => (
             <div 
               key={idx} 
               className={`h-[40px] flex items-center justify-center snap-center cursor-pointer transition-all duration-150 select-none
                 ${option === value 
                   ? 'text-[#b91c1c] font-bold text-lg'
                   : 'text-stone-400 text-sm font-normal'} 
               `}
               onClick={() => {
                 if (containerRef.current) {
                   containerRef.current.scrollTo({
                     top: idx * ITEM_HEIGHT,
                     behavior: 'smooth'
                   });
                 }
               }}
             >
               <span className="leading-none pt-[2px]">{option}</span>
             </div>
          ))}
          <div className="h-[40px]"></div> {/* Bottom Padding */}
        </div>
      </div>
    </div>
  );
};

export default WheelPicker;