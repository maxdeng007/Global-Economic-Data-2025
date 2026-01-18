import React, { useState, useRef, useEffect } from 'react';

interface SortOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  label: string;
}

export function CustomDropdown({ value, onChange, options, label }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isZh = label.includes('排序') || label.includes('按');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className={`custom-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="dropdown-label">{label}</span>
        <span className="dropdown-current">{currentOption?.label}</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map(option => (
            <button
              key={option.value}
              className={`custom-dropdown-item ${option.value === value ? 'active' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              type="button"
            >
              {option.label}
              {option.value === value && <i className="fas fa-check"></i>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
