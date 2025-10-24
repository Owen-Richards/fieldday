import React, { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
  length: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export function OtpInput({ length, onComplete, disabled }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const code = values.join('');
    if (code.length === length && !values.includes('')) {
      onComplete(code);
    }
  }, [values, length, onComplete]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, length).split('');
      const newValues = [...values];
      pasted.forEach((v, i) => {
        if (index + i < length) {
          newValues[index + i] = v;
        }
      });
      setValues(newValues);
      const nextIndex = Math.min(index + pasted.length, length - 1);
      inputs.current[nextIndex]?.focus();
      return;
    }

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Auto-advance
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, length);
    const digits = pasted.replace(/\D/g, '').split('');
    const newValues = [...values];
    digits.forEach((digit, i) => {
      if (i < length) {
        newValues[i] = digit;
      }
    });
    setValues(newValues);
    const lastIndex = Math.min(digits.length - 1, length - 1);
    inputs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
