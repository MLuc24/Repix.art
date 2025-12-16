"use client";
import React, { useEffect, ReactNode } from "react";

let stylesInjected = false;

const injectGlobalStyles = () => {
  if (stylesInjected) return;
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes move-gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .animate-move-gradient {
      background-size: 200% 200%;
      animation: move-gradient 4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
};

interface GradientProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const Gradient = ({ children, className = "", glow = true }: GradientProps) => {
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {glow && (
        <div
          className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 rounded-[32px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-move-gradient"
        ></div>
      )}

      <div
        className="relative rounded-[32px] bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 p-0.5 transition-all duration-500 animate-move-gradient"
      >
        <div className="rounded-[30px] bg-white dark:bg-black h-full w-full">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Gradient;
