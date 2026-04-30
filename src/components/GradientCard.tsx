"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  baseColor: string; // e.g., '255, 58, 33'
  mode?: 'light' | 'dark';
  variants?: any;
  hoverImage?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className,
  baseColor,
  mode = 'light',
  variants,
  hoverImage
}) => {
  const isDark = mode === 'dark';
  
  const gradientColor = `rgba(${baseColor}, 0.15)`;
  const borderColorDefault = isDark ? `rgba(255, 255, 255, 0.2)` : `rgba(${baseColor}, 0.2)`;
  const borderColorHover = isDark ? `rgba(${baseColor}, 1)` : `rgba(${baseColor}, 0.5)`;
  const cardGlow = isDark ? `rgba(0, 0, 0, 0)` : `rgba(0, 0, 0, 0.04)`;

  const baseClasses = isDark 
    ? "bg-white/5 backdrop-blur-md" 
    : "bg-white";

  return (
    <motion.div 
      variants={variants}
      className={cn(
        "group relative rounded p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden border",
        baseClasses,
        className
      )}
      style={{ 
        '--border-default': borderColorDefault,
        '--border-hover': borderColorHover,
        '--card-glow': cardGlow,
        borderColor: 'var(--border-default)'
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
        if (!isDark) {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px var(--card-glow)`;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        if (!isDark) {
          (e.currentTarget as HTMLElement).style.boxShadow = `none`;
        }
      }}
    >
      {/* Background Hover Image */}
      {hoverImage && isDark && (
        <div className="absolute inset-0 z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
          <img 
            src={hoverImage} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#050A15]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-[#050A15]/80 to-transparent" />
        </div>
      )}

      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{ background: `radial-gradient(circle at top right, ${gradientColor} 0%, transparent 60%)` }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
