
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from './Icons';

type ThemeVariant = 'dark' | 'light';

/**
 * GlassPanel
 */
export const GlassPanel = ({ 
  children, 
  className = "", 
  variant = 'dark' 
}: { 
  children?: React.ReactNode, 
  className?: string, 
  variant?: ThemeVariant 
}) => {
  const baseStyles = variant === 'dark'
    ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl" 
    : "bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50"; 

  return (
    <div className={`relative rounded-3xl overflow-hidden ${baseStyles} ${className}`}>
      <div className={`absolute inset-0 pointer-events-none ${variant === 'dark' ? 'bg-gradient-to-br from-white/10 to-transparent' : 'bg-gradient-to-br from-white/40 to-transparent'}`} />
      {children}
    </div>
  );
};

/**
 * GlassModal
 */
export const GlassModal = ({ isOpen, onClose, children, className = "" }: { isOpen: boolean, onClose: () => void, children?: React.ReactNode, className?: string }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in-up" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-xl animate-fade-in-up">
        <div className={`bg-white dark:bg-[#1a1b26] p-6 md:p-8 rounded-[22px] relative overflow-hidden shadow-2xl border border-white/10 ${className}`}>
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 transition-colors z-20"
             >
               <Icons.Close className="w-5 h-5" />
             </button>
             {/* Content Container */}
             <div>
                {children}
             </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * AuthInput
 */
export type AuthInputProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  variant?: ThemeVariant;
}

export const AuthInput = ({ 
  label, 
  icon, 
  rightElement, 
  error, 
  variant = 'dark', 
  className = "", 
  ...props 
}: AuthInputProps) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!(props.value || props.defaultValue));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (props.value === undefined) {
      setHasValue(!!e.target.value);
    }
    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const isControlled = props.value !== undefined;
  const shouldFloat = focused || (isControlled ? !!props.value : hasValue);

  const containerStyles = variant === 'dark'
    ? `bg-white/5 border-white/10 ${focused ? 'border-violet-500/50 bg-white/10' : 'hover:bg-white/10'}`
    : `bg-white border-slate-200 ${focused ? 'border-violet-500 shadow-sm' : 'hover:border-slate-300'}`;

  const textStyles = variant === 'dark' ? "text-white" : "text-slate-900";
  const labelStyles = variant === 'dark' ? "text-slate-400" : "text-slate-500";
  const iconStyles = variant === 'dark' ? "text-slate-400" : "text-slate-400";

  return (
    <div className={`group relative mb-5 ${className}`}>
      <div className={`
        flex items-center border rounded-xl transition-all duration-300
        ${containerStyles}
        ${error ? 'border-red-500' : ''}
      `}>
        {icon && (
          <div className={`pl-4 pr-3 transition-colors duration-300 ${focused ? 'text-violet-500' : iconStyles}`}>
            {icon}
          </div>
        )}

        <input
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full bg-transparent py-4 pr-4 ${textStyles} placeholder-transparent outline-none z-10 font-medium`}
          placeholder={label}
        />

        <label className={`
          absolute left-0 pointer-events-none transition-all duration-300 ease-out px-4
          ${icon ? 'ml-8' : ''}
          ${shouldFloat 
            ? `-translate-y-3.5 scale-75 ${variant === 'dark' ? 'text-violet-300 bg-[#1a1b26]' : 'text-violet-600 bg-white'} mx-2 px-1 rounded-sm z-20 font-bold` 
            : `${labelStyles} translate-y-0`
          }
        `}>
          {label}
        </label>

        {rightElement && (
          <div className="pr-4 pl-2 text-slate-400 hover:text-slate-600 cursor-pointer z-20">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <span className="absolute -bottom-5 left-1 text-xs text-red-500 font-medium animate-fade-in-up">
          {error}
        </span>
      )}
    </div>
  );
};

/**
 * NeonButton
 */
export const NeonButton = ({ children, isLoading, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) => (
  <button 
    className={`
      relative w-full py-4 rounded-xl font-bold text-white tracking-wide
      bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600
      bg-[length:200%_auto] animate-shimmer transition-all duration-300
      hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98]
      disabled:opacity-70 disabled:cursor-not-allowed
      overflow-hidden group
      ${className}
    `}
    disabled={isLoading}
    {...props}
  >
    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
    <span className="relative flex items-center justify-center gap-2">
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </span>
  </button>
);

/**
 * SocialButton
 */
export const SocialButton = ({ icon, label, onClick }: { icon: React.ReactNode, label?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="
      flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl
      bg-white border border-slate-200 text-slate-700 font-medium
      hover:bg-slate-50 hover:border-slate-300 hover:scale-105
      transition-all duration-300 shadow-sm
    "
  >
    {icon}
    {label && <span>{label}</span>}
  </button>
);
