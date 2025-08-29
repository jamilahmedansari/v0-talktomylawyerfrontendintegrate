'use client';

import { CSSProperties, ReactNode } from 'react';

interface ElectricBorderProps {
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * ElectricBorder is a simplified approximation of the electric border effect
 * showcased on reactbits.dev.  You can customize the color, animation speed,
 * chaos intensity and border thickness via props.  The wrapper will
 * animate a glowing box shadow around its children.
 */
export default function ElectricBorder({
  color = '#5227FF',
  speed = 1,
  chaos = 1,
  thickness = 2,
  className = '',
  style = {},
  children
}: ElectricBorderProps) {
  const wrapperStyle: CSSProperties = {
    '--electric-color': color,
    '--electric-speed': `${speed}s`,
    '--electric-chaos': chaos.toString(),
    '--electric-thickness': `${thickness}px`,
    ...style
  } as CSSProperties;
  return (
    <div className={`relative electric-border ${className}`} style={wrapperStyle}>
      {children}
      <style jsx>{`
        .electric-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          border-radius: inherit;
          border: var(--electric-thickness) solid var(--electric-color);
          box-shadow: 0 0 calc(4px * var(--electric-chaos)) var(--electric-color);
          animation: electricPulse var(--electric-speed) linear infinite;
        }
        @keyframes electricPulse {
          0% {
            box-shadow: 0 0 calc(4px * var(--electric-chaos)) var(--electric-color);
          }
          50% {
            box-shadow: 0 0 calc(10px * var(--electric-chaos)) var(--electric-color);
          }
          100% {
            box-shadow: 0 0 calc(4px * var(--electric-chaos)) var(--electric-color);
          }
        }
      `}</style>
    </div>
  );
}
