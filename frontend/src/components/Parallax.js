import React, { useEffect, useRef } from 'react';

const Parallax = ({ children, speed = 0.5 }) => {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      layer.style.transform = `translateY(${scrolled * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className="parallax-layer" ref={layerRef}>
      {children}
    </div>
  );
};

export default Parallax; 