import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  color: string;
  h: number;
  s: number;
  l: number;
  angle: number;
  speed: number;
}

export const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let blobs: Blob[] = [];

    // Lightness stops for grayscale blobs
    const baseHues = [40, 50, 60, 70];

    const createBlob = (w: number, h: number, hue: number): Blob => {
      // Scale radius relative to the smaller canvas size
      const radius = Math.random() * (w * 0.45) + w * 0.3;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius,
        baseRadius: radius,
        // Slow speed for ambient movement
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: `hsla(0, 0%, ${hue}%, 0.015)`,
        h: 0,
        s: 0,
        l: hue,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0015) + 0.0005,
      };
    };

    const init = () => {
      // Downscale canvas resolution by 4x for massive fill-rate performance gains
      // The heavy CSS blur filters will smooth out the low resolution perfectly
      const w = canvas.width = Math.floor(window.innerWidth / 4);
      const h = canvas.height = Math.floor(window.innerHeight / 4);

      blobs = baseHues.map((hue) => createBlob(w, h, hue));
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark space backing
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Layered radial glows with screen blending
      ctx.globalCompositeOperation = 'screen';

      blobs.forEach((blob) => {
        // Orbit motion
        blob.angle += blob.speed;
        const orbitRadius = w * 0.04;
        const targetX = blob.x + Math.cos(blob.angle) * orbitRadius;
        const targetY = blob.y + Math.sin(blob.angle) * orbitRadius;

        // Update positions
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce bounds
        if (blob.x < -blob.radius || blob.x > w + blob.radius) blob.vx = -blob.vx;
        if (blob.y < -blob.radius || blob.y > h + blob.radius) blob.vy = -blob.vy;

        // Interpolated color string
        blob.color = `hsla(0, 0%, ${blob.l}%, 0.015)`;

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(
          targetX,
          targetY,
          0,
          targetX,
          targetY,
          blob.radius
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, `hsla(0, 0%, ${blob.l}%, 0.005)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(targetX, targetY, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

      blobs.forEach((blob) => {
        // Shift lightness on click
        blob.l = ((blob.l + 10) % 40) + 40;

        // Push away from click coordinate
        const dx = blob.x - clickX;
        const dy = blob.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < canvas.width * 0.5) {
          const force = (canvas.width * 0.5 - dist) / (canvas.width * 0.5);
          blob.vx += (dx / dist) * force * 1.0;
          blob.vy += (dy / dist) * force * 1.0;

          // Expand blob slightly
          blob.radius = blob.baseRadius * 1.2;
          setTimeout(() => {
            blob.radius = blob.baseRadius;
          }, 600);
        }
      });
    };

    init();
    draw();

    window.addEventListener('click', handleClick);
    
    let resizeTimeout: number;
    const handleResize = () => {
      // Debounce resize to prevent layout thrashing
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        init();
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-45 blur-[50px] md:blur-[80px]"
      style={{ 
        mixBlendMode: 'plus-lighter',
        transform: 'translate3d(0,0,0)', // Force GPU hardware acceleration
        willChange: 'transform'           // Hint browser to optimize layout paint
      }}
    />
  );
};
