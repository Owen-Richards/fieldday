import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  length: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export function OtpInput({ length, onComplete, disabled }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const code = values.join('');
    if (code.length === length && !values.includes('')) {
      onComplete(code);
    }
  }, [values, length, onComplete]);

  const handleChange = (index: number, value: string) => {
    // Handle paste or multiple digits
    if (value.length > 1) {
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

    // Auto-advance to next input
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          style={styles.input}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          accessible
          accessibilityLabel={`Digit ${index + 1}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
