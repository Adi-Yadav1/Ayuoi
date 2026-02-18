import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  selectButton: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  selectButtonError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#111827',
  },
  selectButtonTextPlaceholder: {
    color: '#9CA3AF',
  },
  optionsContainer: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionSelected: {
    backgroundColor: '#FEF3C7',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextSelected: {
    color: '#EE9B4D',
    fontWeight: '600',
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxBoxSelected: {
    backgroundColor: '#EE9B4D',
    borderColor: '#EE9B4D',
  },
  checkboxText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    borderColor: '#EE9B4D',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EE9B4D',
  },
  radioText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EE9B4D',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sliderTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  sliderFill: {
    height: 8,
    backgroundColor: '#EE9B4D',
    borderRadius: 4,
  },
});

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  multiline?: boolean;
  disabled?: boolean;
  error?: string;
  secureTextEntry?: boolean;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  disabled = false,
  error,
  secureTextEntry = false
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        editable={!disabled}
        numberOfLines={multiline ? 4 : 1}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

interface SelectFieldProps {
  label: string;
  options: { id: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  error
}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const selectedLabel = options.find(o => o.id === selectedValue)?.label || 'Select...';

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.selectButton,
          error && styles.selectButtonError
        ]}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={[
          styles.selectButtonText,
          !selectedValue && styles.selectButtonTextPlaceholder
        ]}>
          {selectedLabel}
        </Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selectedValue === option.id && styles.optionSelected
              ]}
              onPress={() => {
                onSelect(option.id);
                setShowOptions(false);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedValue === option.id && styles.optionTextSelected
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

interface CheckboxGroupProps {
  label: string;
  options: { id: string; label: string }[];
  selectedValues: string[];
  onToggle: (id: string, checked: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues,
  onToggle
}) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.checkboxRow}
          onPress={() => onToggle(option.id, !selectedValues.includes(option.id))}
        >
          <View
            style={[
              styles.checkboxBox,
              selectedValues.includes(option.id) && styles.checkboxBoxSelected
            ]}
          >
            {selectedValues.includes(option.id) && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          <Text style={styles.checkboxText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface RadioGroupProps {
  label: string;
  options: { id: string; label: string }[];
  selectedValue: string;
  onSelect: (id: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  selectedValue,
  onSelect
}) => {
  return (
    <View style={styles.radioContainer}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.radioRow}
          onPress={() => onSelect(option.id)}
        >
          <View
            style={[
              styles.radioCircle,
              selectedValue === option.id && styles.radioCircleSelected
            ]}
          >
            {selectedValue === option.id && (
              <View style={styles.radioDot} />
            )}
          </View>
          <Text style={styles.radioText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  value,
  onValueChange,
  step = 1
}) => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sliderValue}>{value}</Text>
      </View>
      <View style={styles.sliderRow}>
        <TouchableOpacity
          onPress={() => onValueChange(Math.max(min, value - step))}
          style={styles.sliderButton}
        >
          <Text style={styles.sliderButtonText}>−</Text>
        </TouchableOpacity>
        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderFill,
              { width: `${((value - min) / (max - min)) * 100}%` }
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() => onValueChange(Math.min(max, value + step))}
          style={styles.sliderButton}
        >
          <Text style={styles.sliderButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
