"use client"

import * as React from "react"
import { cn } from "@/backend/lib/utils/utils"

interface SliderProps {
  value: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  onValueChange?: (value: number[]) => void
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    value, 
    defaultValue, 
    min = 0, 
    max = 100, 
    step = 1, 
    disabled = false, 
    className,
    onValueChange,
    ...props 
  }, ref) => {
    const [localValue, setLocalValue] = React.useState<number[]>(value || defaultValue || [0])
    const trackRef = React.useRef<HTMLDivElement>(null)

    // When external value changes, update local value
    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value)
      }
    }, [value])

    // Handle click on track
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      
      const track = trackRef.current
      if (!track) return

      const trackRect = track.getBoundingClientRect()
      const percentage = (e.clientX - trackRect.left) / trackRect.width
      const newValue = Math.round((percentage * (max - min) + min) / step) * step
      
      // Ensure value is within bounds
      const clampedValue = Math.max(min, Math.min(max, newValue))
      const newValues = [...localValue]
      newValues[0] = clampedValue
      
      setLocalValue(newValues)
      onValueChange?.(newValues)
    }

    // Calculate percentage for thumb position
    const getThumbPosition = () => {
      return ((localValue[0] - min) / (max - min)) * 100
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div 
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#2E3446] cursor-pointer"
          onClick={handleTrackClick}
        >
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-600 to-blue-400" 
            style={{ width: `${getThumbPosition()}%` }}
          />
        </div>
        <div 
          className="block h-5 w-5 rounded-full border border-[#3D4E66] bg-white drop-shadow-md transition-colors absolute cursor-pointer"
          style={{ left: `calc(${getThumbPosition()}% - 10px)` }}
          onMouseDown={(e) => {
            if (disabled) return
            
            const startX = e.clientX
            const startValue = localValue[0]
            
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const track = trackRef.current
              if (!track) return
              
              const trackRect = track.getBoundingClientRect()
              const deltaPx = moveEvent.clientX - startX
              const deltaPercentage = deltaPx / trackRect.width
              const deltaValue = deltaPercentage * (max - min)
              let newValue = startValue + deltaValue
              
              // Quantize to step
              newValue = Math.round(newValue / step) * step
              
              // Ensure value is within bounds
              const clampedValue = Math.max(min, Math.min(max, newValue))
              const newValues = [...localValue]
              newValues[0] = clampedValue
              
              setLocalValue(newValues)
              onValueChange?.(newValues)
            }
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }
            
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
        />
      </div>
    )
  }
)

Slider.displayName = "Slider" 