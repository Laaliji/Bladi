"use client"

import { cn } from '@/lib/utils'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  isDark?: boolean
}

export function PhoneFrame({ children, className, isDark = false }: PhoneFrameProps) {
  return (
    <div 
      className={cn(
        "relative w-[375px] h-[812px] rounded-[3rem] shadow-2xl overflow-hidden",
        "border-[14px] border-[#1a1a1a]",
        isDark ? "dark" : "",
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1a1a1a] rounded-b-2xl z-50" />
      
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-[44px] z-40 flex items-center justify-between px-6 pt-2">
        <span className={cn("text-xs font-medium", isDark ? "text-white" : "text-black")}>9:41</span>
        <div className="flex items-center gap-1">
          <svg className={cn("w-4 h-4", isDark ? "text-white" : "text-black")} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
          </svg>
          <svg className={cn("w-4 h-4", isDark ? "text-white" : "text-black")} viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <div className="flex items-center">
            <div className="w-6 h-3 border border-current rounded-sm relative">
              <div className="absolute inset-[2px] right-1 bg-current rounded-[1px]" />
            </div>
            <div className="w-[2px] h-1.5 bg-current rounded-r-sm" />
          </div>
        </div>
      </div>
      
      {/* Screen content */}
      <div className={cn(
        "w-full h-full overflow-y-auto overflow-x-hidden",
        isDark ? "bg-[#0F0F0F]" : "bg-[#FAF7F0]"
      )}>
        {children}
      </div>
      
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/30 rounded-full z-50" />
    </div>
  )
}
