import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface BackgroundGradientAnimationProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  interactive?: boolean;
  fps?: number;
}

export const BackgroundGradientAnimation = ({
  children,
  className,
  containerClassName,
  gradientBackgroundStart = 'rgb(10, 10, 30)',
  gradientBackgroundEnd = 'rgb(25, 25, 50)',
  firstColor = '16, 185, 129',
  secondColor = '59, 130, 246',
  thirdColor = '139, 92, 246',
  fourthColor = '245, 158, 11',
  fifthColor = '236, 72, 153',
  pointerColor = '255, 255, 255',
  size = '100%',
  blendingValue = 'screen',
  interactive = false,
  fps = 20,
}: BackgroundGradientAnimationProps) => {
  const [offset, setOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!interactive) {
      let animationFrameId: number;
      const frameInterval = 1000 / fps;

      const animate = (time: number) => {
        if (time - lastTimeRef.current >= frameInterval) {
          setOffset(prev => (prev + 1) % 360);
          lastTimeRef.current = time;
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [interactive, fps]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{
        '--gradient-background-start': gradientBackgroundStart,
        '--gradient-background-end': gradientBackgroundEnd,
        '--first-color': firstColor,
        '--second-color': secondColor,
        '--third-color': thirdColor,
        '--fourth-color': fourthColor,
        '--fifth-color': fifthColor,
        '--pointer-color': pointerColor,
        '--size': size,
        '--blending-value': blendingValue,
      } as React.CSSProperties}
    >
      {/* Static gradient background */}
      <div
        className="gradient-background"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        }}
      />

      {/* Animated gradient orbs */}
      <div className="gradient-orbs">
        <div
          className="gradient-orb orb-1"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${firstColor}), transparent 70%)`,
          }}
        />
        <div
          className="gradient-orb orb-2"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${secondColor}), transparent 70%)`,
          }}
        />
        <div
          className="gradient-orb orb-3"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${thirdColor}), transparent 70%)`,
          }}
        />
        <div
          className="gradient-orb orb-4"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${fourthColor}), transparent 70%)`,
          }}
        />
        <div
          className="gradient-orb orb-5"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${fifthColor}), transparent 70%)`,
          }}
        />
      </div>

      {/* Interactive cursor follower */}
      {interactive && (
        <div
          className="cursor-follower"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgb(${pointerColor}), transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
        />
      )}

      {/* Content */}
      <div className={cn('relative z-10', className)}>
        {children}
      </div>
    </div>
  );
};
