import { useState, useRef } from 'react';

/**
 * Custom hook to handle manual carousel scroll/swipe and calculate card styles.
 * @param {number} sensitivity - Factor to control scroll speed.
 * @returns {object} - Scroll state and touch handlers.
 */
export const useCarouselScroll = (sensitivity = 0.15) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const lastTouchX = useRef(0);

  const handleTouchStart = (e) => {
    isDragging.current = true;
    lastTouchX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - lastTouchX.current;
    
    setScrollProgress((prev) => prev - delta * sensitivity);
    lastTouchX.current = currentX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  /**
   * Helper to calculate styles based on progress
   * @param {number} index - Index of the card
   * @param {number} total - Total number of cards
   */
  const getCardStyle = (index, total) => {
    const spacing = 100 / total;
    let rawPos = (spacing * index + scrollProgress) % 100;
    if (rawPos < 0) rawPos += 100;

    let scale = 0.85;
    if (rawPos <= 50) {
      scale = 0.85 + (0.25 * (rawPos / 50));
    } else {
      scale = 1.1 - (0.25 * ((rawPos - 50) / 50));
    }

    let opacity = 0.6;
    if (rawPos < 15) {
      opacity = 0.6 + (rawPos / 15) * 0.2;
    } else if (rawPos < 50) {
      opacity = 0.8 + 0.2 * ((rawPos - 15) / 35);
    } else if (rawPos < 85) {
      opacity = 1 - 0.2 * ((rawPos - 50) / 35);
    } else {
      opacity = 0.8 - 0.2 * ((100 - rawPos) / 15);
    }

    return {
      '--offset-pos': `${rawPos}%`,
      opacity: opacity,
      transform: `scale(${scale})`,
      zIndex: Math.round(opacity * 100),
    };
  };

  return {
    scrollProgress,
    getCardStyle,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
};

export default useCarouselScroll;
