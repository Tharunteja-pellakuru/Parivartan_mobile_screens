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
  const lastTouchY = useRef(0);
  const initialTouchX = useRef(0);
  const initialTouchY = useRef(0);
  const swipeDirection = useRef(null); // 'horizontal', 'vertical', or null

  const handleTouchStart = (e) => {
    isDragging.current = true;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    lastTouchX.current = touchX;
    lastTouchY.current = touchY;
    initialTouchX.current = touchX;
    initialTouchY.current = touchY;
    swipeDirection.current = null; // Reset direction on new touch
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    // Calculate total movement from initial touch
    const totalDeltaX = Math.abs(currentX - initialTouchX.current);
    const totalDeltaY = Math.abs(currentY - initialTouchY.current);
    
    // Determine swipe direction on first significant movement
    if (swipeDirection.current === null && (totalDeltaX > 10 || totalDeltaY > 10)) {
      if (totalDeltaX > totalDeltaY * 1.5) {
        swipeDirection.current = 'horizontal';
      } else if (totalDeltaY > totalDeltaX * 1.5) {
        swipeDirection.current = 'vertical';
      }
    }
    
    // Only handle horizontal swipes
    if (swipeDirection.current === 'horizontal') {
      const deltaX = currentX - lastTouchX.current;
      if (e.cancelable) e.preventDefault();
      setScrollProgress((prev) => prev - deltaX * sensitivity);
      lastTouchX.current = currentX;
      lastTouchY.current = currentY;
    } else if (swipeDirection.current === 'vertical') {
      // Let vertical swipes pass through to parent - don't prevent default
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    swipeDirection.current = null;
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
