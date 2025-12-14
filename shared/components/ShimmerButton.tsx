import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  wrapperClassName?: string;
  onClick?: () => void;
  className?: string; // Wrapper button class
  backgroundClassName?: string; // Inner span background class
  shimmerColor?: string; // Hex or color code for shimmer
}

export const ShimmerButton = ({ 
  children, 
  className = "", 
  wrapperClassName = "",
  backgroundClassName = "bg-[#0f172a] group-hover:bg-[#1e293b]",
  shimmerColor = "#8b5cf6",
  onClick,
  ...props 
}: ShimmerButtonProps) => {
  // Use a unique ID for the style tag if used multiple times, or just rely on global scope. 
  // Since we are using standard CSS syntax in a <style> tag, it applies globally.
  // To avoid duplication, we could put this in global CSS, but for a component copy-paste request, 
  // keeping it here is fine as long as the animation name is unique or consistent.
  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <div className={`flex items-center justify-center font-sans ${wrapperClassName}`}>
      <style>{customCss}</style>
      <button 
        onClick={onClick}
        className={`relative inline-flex items-center justify-center p-[1.5px] overflow-hidden group ${className}`}
        {...props}
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `conic-gradient(from var(--angle), transparent 25%, ${shimmerColor}, transparent 50%)`,
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className={`relative z-10 flex items-center justify-center w-full h-full text-white rounded-[10px] transition-all duration-300 ${backgroundClassName}`}>
           {children}
        </span>
      </button>
    </div>
  );
}
