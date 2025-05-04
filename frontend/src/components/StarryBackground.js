import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stars = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Random size
      const size = Math.random() * 2;
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random opacity
      star.style.opacity = Math.random() * 0.5 + 0.5;
      
      container.appendChild(star);
      stars.push(star);
    }

    // Cleanup
    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div ref={containerRef} className="starry-bg" />;
};

export default StarryBackground; 