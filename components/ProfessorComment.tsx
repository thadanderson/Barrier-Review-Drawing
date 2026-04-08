
import React, { useEffect, useState } from 'react';

interface ProfessorCommentProps {
  quote: string;
}

const ProfessorComment: React.FC<ProfessorCommentProps> = ({ quote }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset visibility to trigger animation on new quote
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div 
      className={`
        absolute -top-12 -right-4 md:-right-12 z-20 
        transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)
        ${isVisible ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-50 rotate-12'}
      `}
    >
      <div className="relative bg-white text-black p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-black max-w-[200px] md:max-w-xs">
        {/* Comic speech tail */}
        <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b-2 border-r-2 border-black rotate-45 transform skew-x-12"></div>
        
        <p className="font-bold text-sm md:text-base leading-tight font-sans italic">
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default ProfessorComment;
