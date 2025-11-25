"use client"
import { useState, useRef, useEffect } from "react"

interface CustomSelectProps {
  placeholder: string
  options: string[]
  value?: string
  onChange?: (value: string) => void
}

export default function CustomSelect({ placeholder, options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div className="custom-select" ref={dropdownRef}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || placeholder}</span>
        <svg
          className={`custom-select-arrow ${isOpen ? "open" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1.41 0L6 4.59 10.59 0 12 1.41 6 7.41 0 1.41z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`custom-select-option ${selectedValue === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
