import { useEffect, useRef } from 'react';

interface Stream {
  x: number;
  y: number;
  speed: number;
  fontSize: number;
  chars: string[];
  opacity: number;
}

export const BinaryRainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let streams: Stream[] = [];
    const mouse = { x: -1000, y: -1000, radius: 110 };

    const init = () => {
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;

      // Base configuration
      const fontSize = 13;
      const columns = Math.floor(w / fontSize) + 1;
      
      streams = [];
      for (let i = 0; i < columns; i++) {
        // Random size and speed for depth effect
        const speed = Math.random() * 1.5 + 0.6;
        const opacity = Math.random() * 0.05 + 0.03;
        
        streams.push({
          x: i * fontSize,
          y: Math.random() * -h, // Spawn offscreen
          speed,
          fontSize,
          chars: Array.from({ length: Math.floor(h / fontSize) + 5 }, () => 
            Math.random() > 0.5 ? '1' : '0'
          ),
          opacity,
        });
      }
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with Carbon Matte Black backing
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      ctx.textAlign = 'center';
      
      streams.forEach((stream) => {
        // Increment the lead Y coordinate
        stream.y += stream.speed;
        
        // Reset if it flows completely off the screen
        if (stream.y > h) {
          stream.y = -100;
          stream.speed = Math.random() * 1.5 + 0.6;
        }

        const charCount = stream.chars.length;
        
        // Draw the stream characters
        for (let i = 0; i < charCount; i++) {
          const charY = stream.y - i * stream.fontSize;
          
          // Skip drawing if outside vertical screen boundaries
          if (charY < 0 || charY > h) continue;

          const charX = stream.x;
          
          // Calculate distance from cursor for glowing interactivity
          const dx = charX - mouse.x;
          const dy = charY - mouse.y;
          const dist = Math.hypot(dx, dy);

          let drawColor = '';
          ctx.font = `${stream.fontSize}px monospace`;

          if (dist < mouse.radius) {
            // Glow active primary cyan when cursor is near
            const glowRatio = (mouse.radius - dist) / mouse.radius;
            const glowOpacity = 0.05 + glowRatio * 0.35; // Bright but not overwhelming
            
            // Randomly alternate between primary white and secondary grey for glows
            if ((stream.x + i) % 7 === 0) {
              drawColor = `rgba(181, 181, 181, ${glowOpacity})`; // Secondary Light Grey
            } else {
              drawColor = `rgba(255, 255, 255, ${glowOpacity})`; // Primary White
            }
            
            // Add font weight & size boost for glowing focus
            ctx.font = `bold ${stream.fontSize + 0.5}px monospace`;
          } else {
            // Muted, very dimmed background slate/indigo
            drawColor = `rgba(122, 122, 122, ${stream.opacity})`;
          }

          // Randomly flip a binary digit occasionally
          if (Math.random() < 0.002) {
            stream.chars[i] = stream.chars[i] === '1' ? '0' : '1';
          }

          ctx.fillStyle = drawColor;
          ctx.fillText(stream.chars[i], charX, charY);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const handleResize = () => {
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};
