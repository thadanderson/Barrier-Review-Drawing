import React, { useState, useEffect, useRef } from 'react';
import { RouletteItem } from '../types';
import { soundService } from '../services/soundService';

interface DrawSelectorProps {
  items: RouletteItem[];
  onSpinEnd: (item: RouletteItem) => void;
}

const ITEM_HEIGHT = 80; // Fixed height for calculation
const VISIBLE_ITEMS = 5; // How many items to render in the viewport (odd number better for centering)
const REPEAT_COUNT = 30; // How many times to repeat the list for the scrolling effect

// Speed Presets
const SPEED_OPTIONS = [
  { id: 'blitz', label: '0.8s', duration: 800, flavor: 'Blitz' },
  { id: 'rapid', label: '2.5s', duration: 2500, flavor: 'Rapid' },
  { id: 'normal', label: '4.5s', duration: 4500, flavor: 'Normal' },
  { id: 'slow', label: '8.0s', duration: 8000, flavor: 'Slow' },
  { id: 'epic', label: '15.0s', duration: 15000, flavor: 'Epic' },
];

const DrawSelector: React.FC<DrawSelectorProps> = ({ items, onSpinEnd }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [stripOffset, setStripOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  
  // Audio ref to manage ticking loop
  const tickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Default to 'Normal' speed
  const [selectedSpeed, setSelectedSpeed] = useState(SPEED_OPTIONS[2]);
  
  // Create a long strip of items by repeating the source list
  // We need enough repeats to scroll for a few seconds without running out
  const stripItems = React.useMemo(() => {
    if (items.length === 0) return [];
    const arr: RouletteItem[] = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      arr.push(...items);
    }
    return arr;
  }, [items]);

  // Audio Ticking Logic (simulates slowing down)
  const startTicking = (duration: number) => {
    if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
    
    let startTime = Date.now();
    let tickCount = 0;
    
    const playNextTick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Stop if done
      if (progress >= 1) return;

      soundService.playTick();
      
      // Calculate next delay based on progress (ease-out effect)
      // Start fast (30ms), end slow (300ms)
      const currentDelay = 30 + (progress * progress * 400); 
      
      tickTimeoutRef.current = setTimeout(playNextTick, currentDelay);
    };

    playNextTick();
  };

  const spin = () => {
    if (isSpinning || items.length === 0) return;

    soundService.playClick(); // Button click sound
    setIsSpinning(true);
    setWinningIndex(null);

    // 1. Reset Position (Instant Jump)
    setTransitionEnabled(false);
    setStripOffset(0);

    // Force a reflow
    setTimeout(() => {
      // 2. Calculate Winner
      const randomOffset = Math.floor(Math.random() * items.length);
      const targetSetIndex = REPEAT_COUNT - 2; // Second to last set
      const totalIndex = (targetSetIndex * items.length) + randomOffset;
      
      const viewportHalf = (VISIBLE_ITEMS * ITEM_HEIGHT) / 2;
      const itemHalf = ITEM_HEIGHT / 2;
      const targetPixel = (totalIndex * ITEM_HEIGHT) - viewportHalf + itemHalf;

      // 3. Start Audio Ticking
      startTicking(selectedSpeed.duration);

      // 4. Animate
      setTransitionEnabled(true);
      setStripOffset(targetPixel);

      // 5. Cleanup
      setTimeout(() => {
        setIsSpinning(false);
        setWinningIndex(totalIndex);
        if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
        onSpinEnd(items[randomOffset]);
      }, selectedSpeed.duration);
    }, 50);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
    };
  }, []);

  // Reset when category changes or items change
  useEffect(() => {
    setTransitionEnabled(false);
    setStripOffset(0);
    setWinningIndex(null);
  }, [items]);

  const isDisabled = isSpinning || items.length === 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      
      {/* The Drum Machine */}
      <div className="relative w-full bg-neutral-900 rounded-lg border-4 border-amber-600 shadow-[0_0_50px_rgba(217,119,6,0.15)] overflow-hidden">
        
        {/* Decorative Bolts */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-neutral-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] z-20"></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neutral-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] z-20"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-neutral-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] z-20"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-neutral-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] z-20"></div>

        {/* The Viewport */}
        <div 
          className="relative w-full bg-black flex items-center justify-center"
          style={{ height: `${VISIBLE_ITEMS * ITEM_HEIGHT}px` }}
        >
          {items.length === 0 && (
            <div className="text-neutral-600 font-bold uppercase tracking-widest text-sm z-0 text-center px-4">
              Pool Empty<br/><span className="text-[10px] text-neutral-700 normal-case">Select items in configuration</span>
            </div>
          )}

          {/* Central Highlight (Payline) */}
          <div 
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 border-y-2 border-amber-400/50 bg-amber-500/10 pointer-events-none shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-[1px]"
            style={{ height: `${ITEM_HEIGHT}px` }}
          >
             {/* Left/Right Indicators */}
             <div className="absolute left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-amber-500 border-y-[6px] border-y-transparent"></div>
             <div className="absolute right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[8px] border-r-amber-500 border-y-[6px] border-y-transparent"></div>
          </div>

          {/* Gradient Overlays for 3D Drum Effect */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

          {/* The Moving Strip */}
          {items.length > 0 && (
            <div 
                className="w-full will-change-transform absolute top-0 left-0"
                style={{ 
                transform: `translateY(-${stripOffset}px)`,
                transition: transitionEnabled ? `transform ${selectedSpeed.duration}ms cubic-bezier(0.1, 0.7, 0.1, 1)` : 'none'
                }}
            >
                {stripItems.map((item, index) => {
                const isWinner = winningIndex === index;

                return (
                    <div 
                    key={`${item.id}-${index}`}
                    className="w-full flex items-center justify-center px-4 text-center border-b border-neutral-900/50"
                    style={{ height: `${ITEM_HEIGHT}px` }}
                    >
                    <span 
                        className={`
                        text-lg md:text-2xl font-bold uppercase tracking-wider transition-all duration-500
                        ${isWinner ? 'text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'text-neutral-600 blur-[0.5px]'}
                        `}
                    >
                        {item.label}
                    </span>
                    </div>
                );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Speed Controls */}
      <div className="w-full flex flex-col gap-2">
         <div className="flex justify-between items-end px-1">
             <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Draw Duration</span>
             <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">{selectedSpeed.flavor}</span>
         </div>
         <div className="flex bg-neutral-900/80 p-1 rounded-sm border border-neutral-800 backdrop-blur-sm">
            {SPEED_OPTIONS.map((opt) => (
            <button
                key={opt.id}
                onClick={() => {
                  if (!isSpinning) {
                    soundService.playClick();
                    setSelectedSpeed(opt);
                  }
                }}
                disabled={isSpinning}
                className={`
                    flex-1 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-sm
                    ${selectedSpeed.id === opt.id 
                        ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                    }
                    ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                {opt.label}
            </button>
            ))}
         </div>
      </div>

      {/* Main Trigger */}
      <button
        onClick={spin}
        disabled={isDisabled}
        className={`
          relative w-full group overflow-hidden
          px-8 py-5 rounded-sm 
          text-lg font-black uppercase tracking-[0.2em] 
          transition-all duration-200
          ${isDisabled 
            ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800' 
            : 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.4)] border border-amber-300'
          }
        `}
      >
        <span className="relative z-10">
            {isSpinning ? 'Reviewing...' : items.length === 0 ? 'Pool Empty' : 'Initiate Draw'}
        </span>
        
        {/* Button Hover Shine Effect */}
        {!isDisabled && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        )}
      </button>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default DrawSelector;