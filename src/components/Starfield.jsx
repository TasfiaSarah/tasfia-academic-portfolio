import { useEffect, useRef } from 'react';

// CSS pixels per second, with only a few pixels of desktop parallax.
const layers = [
  { radius: 0.55, opacity: 0.2, speed: 3.6, parallax: 1.5 },
  { radius: 0.85, opacity: 0.3, speed: 8, parallax: 3 },
  { radius: 1.2, opacity: 0.4, speed: 14.4, parallax: 5 },
];
const darkColors = ['#e0e9ed', '#b4dcd5', '#9bb8db'];
const lightColors = ['#647477', '#518c84', '#77878b'];
const wrap = (value, size) => ((value % size) + size) % size;

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let dark = document.documentElement.classList.contains('dark');
    let width = 0;
    let height = 0;
    let stars = [];
    let frame = null;
    let previousTime = null;
    let elapsed = 0;
    let shootingStar = null;
    let nextShootingStar = 15 + Math.random() * 15;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let atmosphere = null;

    function drawLightAtmosphere() {
      // Cache the soft wash at low resolution instead of rebuilding large
      // radial gradients every frame. Canvas scaling keeps the edges diffuse.
      if (!atmosphere) {
        atmosphere = document.createElement('canvas');
        atmosphere.width = atmosphere.height = 256;
        const wash = atmosphere.getContext('2d');
        wash.fillStyle = '#faf8f2';
        wash.fillRect(0, 0, 256, 256);
        for (const [x, y, radius, color] of [
          [205, 45, 185, 'rgba(155, 195, 219, 0.65)'],
          [90, 155, 170, 'rgba(157, 205, 190, 0.5)'],
          [190, 245, 155, 'rgba(235, 210, 164, 0.38)'],
        ]) {
          const gradient = wash.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.3, color);
          gradient.addColorStop(1, 'rgba(250, 248, 242, 0)');
          wash.fillStyle = gradient;
          wash.fillRect(0, 0, 256, 256);
        }
      }
      const time = reducedMotion.matches ? 0 : elapsed;
      const offsetX = Math.sin(time * 0.09) * 38 + pointer.x * 7;
      const offsetY = Math.cos(time * 0.07) * 28 + pointer.y * 7;
      context.globalAlpha = 1;
      context.drawImage(atmosphere, -56 + offsetX, -56 + offsetY, width + 112, height + 112);

      for (const star of stars) {
        if (star.index % 2 !== 0) continue;
        const depth = star.layer + 1;
        const x = wrap(star.x + time * depth * 1.2, width + 24) - 12 + pointer.x * depth * 1.5;
        const y = wrap(star.y - time * depth * 0.65, height + 24) - 12 + pointer.y * depth * 1.5;
        const radius = 2.2 + star.radius;
        const particle = context.createRadialGradient(x, y, 0, x, y, radius);
        particle.addColorStop(0, lightColors[star.color]);
        particle.addColorStop(0.35, lightColors[star.color]);
        particle.addColorStop(1, 'rgba(100, 116, 119, 0)');
        context.globalAlpha = 0.38 + star.layer * 0.045;
        context.fillStyle = particle;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
      context.globalAlpha = 1;
    }

    function draw(delta = 0) {
      elapsed += delta;
      const easing = 1 - Math.exp(-delta * 2);
      pointer.x += (pointer.targetX - pointer.x) * easing;
      pointer.y += (pointer.targetY - pointer.y) * easing;
      context.clearRect(0, 0, width, height);
      if (!dark) {
        drawLightAtmosphere();
        return;
      }
      for (const star of stars) {
        // Light mode uses one third of the stars, at very low opacity.
        if (!dark && star.index % 3 !== 0) continue;
        const layer = layers[star.layer];
        star.x = wrap(star.x + layer.speed * delta, width + 24);
        star.y = wrap(star.y - layer.speed * 0.55 * delta, height + 24);
        const twinkle = reducedMotion.matches ? 1 : 0.85 + 0.15 * Math.sin(elapsed * star.frequency + star.phase);
        context.globalAlpha = layer.opacity * twinkle * (dark ? 1 : 0.18);
        context.fillStyle = (dark ? darkColors : lightColors)[star.color];
        context.beginPath();
        context.arc(star.x - 12 + pointer.x * layer.parallax, star.y - 12 + pointer.y * layer.parallax, star.radius, 0, Math.PI * 2);
        context.fill();
      }
      // One short streak at a time, scheduled using visible animation time.
      if (!reducedMotion.matches && delta > 0 && elapsed >= nextShootingStar) {
        shootingStar = {
          x: width * (0.25 + Math.random() * 0.45),
          y: height * (0.1 + Math.random() * 0.35),
          age: 0,
          duration: 1.2,
        };
        nextShootingStar = elapsed + 15 + Math.random() * 15;
      }
      if (shootingStar && !reducedMotion.matches) {
        shootingStar.age += delta;
        const progress = shootingStar.age / shootingStar.duration;
        if (progress >= 1) {
          shootingStar = null;
        } else {
          const distance = Math.min(width * 0.22, 240) * progress;
          const x = shootingStar.x + distance;
          const y = shootingStar.y + distance * 0.55;
          const tail = Math.min(width * 0.1, 70);
          const gradient = context.createLinearGradient(x - tail, y - tail * 0.55, x, y);
          gradient.addColorStop(0, dark ? 'rgba(180, 220, 213, 0)' : 'rgba(81, 140, 132, 0)');
          gradient.addColorStop(1, dark ? '#d7e8ed' : '#518c84');
          context.globalAlpha = Math.sin(progress * Math.PI) * (dark ? 0.3 : 0.035);
          context.strokeStyle = gradient;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(x - tail, y - tail * 0.55);
          context.lineTo(x, y);
          context.stroke();
        }
      }
      context.globalAlpha = 1;
    }

    function tick(time) {
      frame = null;
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      draw(delta);
      frame = window.requestAnimationFrame(tick);
    }

    function syncAnimation() {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
      if (reducedMotion.matches) {
        shootingStar = null;
        nextShootingStar = elapsed + 15 + Math.random() * 15;
      }
      if (reducedMotion.matches || !desktopPointer.matches) {
        pointer.x = pointer.y = pointer.targetX = pointer.targetY = 0;
      }
      if (document.hidden) return;
      draw();
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(tick);
    }

    function resize() {
      const oldWidth = width;
      const oldHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(180, Math.max(36, Math.round(width * height / 10000)));
      const existing = stars;
      stars = Array.from({ length: count }, (_, index) => {
        const layer = index / count < 0.55 ? 0 : index / count < 0.85 ? 1 : 2;
        const previous = existing[index];
        return {
          index, layer,
          x: previous ? previous.x * (width + 24) / (oldWidth + 24) : Math.random() * (width + 24),
          y: previous ? previous.y * (height + 24) / (oldHeight + 24) : Math.random() * (height + 24),
          radius: layers[layer].radius * (0.8 + Math.random() * 0.4),
          phase: previous?.phase ?? Math.random() * Math.PI * 2,
          frequency: previous?.frequency ?? 0.25 + Math.random() * 0.2,
          color: previous?.color ?? index % darkColors.length,
        };
      });
      syncAnimation();
    }

    function movePointer(event) {
      if (reducedMotion.matches || !desktopPointer.matches || event.pointerType !== 'mouse') return;
      pointer.targetX = event.clientX / width * 2 - 1;
      pointer.targetY = event.clientY / height * 2 - 1;
    }
    function resetPointer() {
      pointer.targetX = pointer.targetY = 0;
    }
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.classList.contains('dark');
      syncAnimation();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('blur', resetPointer);
    document.documentElement.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', syncAnimation);
    reducedMotion.addEventListener('change', syncAnimation);
    desktopPointer.addEventListener('change', syncAnimation);
    resize();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('blur', resetPointer);
      document.documentElement.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', syncAnimation);
      reducedMotion.removeEventListener('change', syncAnimation);
      desktopPointer.removeEventListener('change', syncAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full select-none" />;
}
