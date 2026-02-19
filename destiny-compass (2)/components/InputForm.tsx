import React, { useState } from 'react';
import { UserInput } from '../types';
import { Compass, Loader2 } from 'lucide-react';
import WheelPicker from './WheelPicker';
import { cityData, provinces, years, months, days, hours, minutes } from '../utils/cityData';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  // Form State - Default year set to 2000
  const [selectedYear, setSelectedYear] = useState('2000');
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedProvince, setSelectedProvince] = useState('北京市');
  const [selectedCity, setSelectedCity] = useState('东城区');

  // Update cities when province changes
  const currentCities = cityData[selectedProvince] || cityData['其他'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    onSubmit({
      birthDate: formattedDate,
      birthTime: `${selectedHour}:${selectedMinute}`,
      birthPlace: `${selectedProvince}${selectedCity}`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="bg-[#fdfbf7] p-4 rounded-xl shadow-xl border border-stone-200 relative overflow-hidden">
        {/* Header - Compact */}
        <div className="text-center mb-4 flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-[#b91c1c] rounded-full flex items-center justify-center border-2 border-double border-[#fdfbf7] shadow-sm">
            <Compass className="w-4 h-4 text-[#fdfbf7]" />
          </div>
          <div>
            <h2 className="text-lg font-bold serif text-[#1c1917] tracking-widest text-left">八字城市指南</h2>
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="mb-3">
           <div className="flex items-center mb-1.5">
             <div className="w-1 h-3 bg-[#b91c1c] mr-2 rounded-full"></div>
             <span className="text-[10px] font-bold text-stone-500 tracking-[0.2em] uppercase">生辰</span>
           </div>
           
           <div className="flex bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm py-1">
              <WheelPicker options={years} value={selectedYear} onChange={setSelectedYear} label="年" />
              <div className="w-[1px] bg-stone-100 my-1"></div>
              <WheelPicker options={months} value={selectedMonth} onChange={setSelectedMonth} label="月" />
              <div className="w-[1px] bg-stone-100 my-1"></div>
              <WheelPicker options={days} value={selectedDay} onChange={setSelectedDay} label="日" />
              <div className="w-[1px] bg-stone-100 my-1"></div>
              <WheelPicker options={hours} value={selectedHour} onChange={setSelectedHour} label="时" />
              <div className="w-[1px] bg-stone-100 my-1"></div>
              <WheelPicker options={minutes} value={selectedMinute} onChange={setSelectedMinute} label="分" />
           </div>
        </div>

        {/* Place Section */}
        <div className="mb-5">
           <div className="flex items-center mb-1.5">
             <div className="w-1 h-3 bg-[#b91c1c] mr-2 rounded-full"></div>
             <span className="text-[10px] font-bold text-stone-500 tracking-[0.2em] uppercase">地点</span>
           </div>
           <div className="flex bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm py-1">
              <WheelPicker 
                options={provinces} 
                value={selectedProvince} 
                onChange={(val) => {
                  setSelectedProvince(val);
                  const newCities = cityData[val] || [];
                  if (newCities.length > 0) setSelectedCity(newCities[0]);
                }} 
                label="省份" 
              />
              <div className="w-[1px] bg-stone-100 my-1"></div>
              <WheelPicker options={currentCities} value={selectedCity} onChange={setSelectedCity} label="城市" />
           </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-serif font-bold text-base text-white tracking-[0.3em] transition-all relative overflow-hidden shadow-md flex items-center justify-center gap-2
            ${isLoading 
              ? 'bg-stone-400 cursor-not-allowed opacity-90' 
              : 'bg-[#b91c1c] hover:bg-[#991b1b] hover:shadow-lg active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>推演天机...</span>
            </>
          ) : (
            '开始推演'
          )}
        </button>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default InputForm;