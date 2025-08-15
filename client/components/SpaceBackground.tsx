import { useEffect, useRef } from 'react';

export function SpaceBackground() {
  const spaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spaceBg = spaceRef.current;
    if (!spaceBg) return;

    // Clear any existing content
    spaceBg.innerHTML = '';

    // Create stars with twinkling animation
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.backgroundColor = '#fff';
      star.style.borderRadius = '50%';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.setProperty('--duration', `${Math.random() * 5 + 3}s`);
      star.style.animation = 'twinkle var(--duration) infinite ease-in-out';
      spaceBg.appendChild(star);
    }

    // Create shooting stars function
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.position = 'absolute';
      shootingStar.style.height = '2px';
      shootingStar.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)';
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.setProperty('--angle', `${Math.random() * 30 - 15}deg`);
      const duration = Math.random() * 3 + 2; // 2-5 seconds
      shootingStar.style.setProperty('--duration', `${duration}s`);
      shootingStar.style.width = `${Math.random() * 100 + 100}px`;
      shootingStar.style.transformOrigin = 'left';
      shootingStar.style.animation = 'shoot var(--duration) linear forwards';
      shootingStar.style.transform = 'rotate(var(--angle))';
      spaceBg.appendChild(shootingStar);

      // Remove shooting star after animation completes
      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, duration * 1000);
    };

    // Create initial shooting stars
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createShootingStar();
      }, i * 2000);
    }

    // Create shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, 5000);

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div 
      ref={spaceRef}
      className="space-bg fixed top-0 left-0 w-full h-full -z-10 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d0f2b, #1a1c3d, #0d0f2b)'
      }}
    />
  );
}
