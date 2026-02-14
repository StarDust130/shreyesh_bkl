"use client"
import React from 'react'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function GlowButton({ children, className = "", ...props }: GlowButtonProps) {
  return (
    <button 
      {...props}
      className={`
        relative group overflow-hidden px-8 py-3 rounded-full 
        bg-[#FF0033] text-white font-bold tracking-wider uppercase
        transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,51,0.6)]
        active:scale-95
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
    </button>
  )
}