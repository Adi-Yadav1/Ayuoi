import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

const buttonStyles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: '#EE9B4D',
  },
  buttonSecondary: {
    backgroundColor: '#0EA5E9',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#EE9B4D',
  },
  buttonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonMedium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLarge: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textSmall: {
    fontSize: 14,
    fontWeight: '600',
  },
  textMedium: {
    fontSize: 16,
    fontWeight: '600',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '600',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#EE9B4D',
  },
  disabled: {
    opacity: 0.5,
  },
});

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const variantStyle = {
    primary: buttonStyles.buttonPrimary,
    secondary: buttonStyles.buttonSecondary,
    outline: buttonStyles.buttonOutline,
  }[variant];

  const sizeStyle = {
    small: buttonStyles.buttonSmall,
    medium: buttonStyles.buttonMedium,
    large: buttonStyles.buttonLarge,
  }[size];

  const textSizeStyle = {
    small: buttonStyles.textSmall,
    medium: buttonStyles.textMedium,
    large: buttonStyles.textLarge,
  }[size];

  const textColorStyle =
    variant === 'outline' ? buttonStyles.textOutline : buttonStyles.textWhite;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        buttonStyles.buttonBase,
        variantStyle,
        sizeStyle,
        style,
        disabled && buttonStyles.disabled,
      ]}
    >
      <Text style={[textSizeStyle, textColorStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// ==================== CARD ====================
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
});

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[cardStyles.card, style]}>
      {children}
    </View>
  );
};

interface DoshaCardProps {
  dosha: 'vata' | 'pitta' | 'kapha';
  score: number;
  title: string;
  description: string;
  onPress?: () => void;
}

const doshaStyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  vataContainer: {
    backgroundColor: '#E8D4B8',
    borderColor: '#C8A882',
  },
  pittaContainer: {
    backgroundColor: '#FFE5CC',
    borderColor: '#FF9E64',
  },
  kaphaContainer: {
    backgroundColor: '#C8E6C9',
    borderColor: '#66BB6A',
  },
  vataText: {
    color: '#8B6F47',
  },
  pittaText: {
    color: '#D4663A',
  },
  kaphaText: {
    color: '#2E7D32',
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export const DoshaCard: React.FC<DoshaCardProps> = ({
  dosha,
  score,
  title,
  description,
  onPress,
}) => {
  const containerStyle = {
    vata: doshaStyles.vataContainer,
    pitta: doshaStyles.pittaContainer,
    kapha: doshaStyles.kaphaContainer,
  }[dosha];

  const textStyle = {
    vata: doshaStyles.vataText,
    pitta: doshaStyles.pittaText,
    kapha: doshaStyles.kaphaText,
  }[dosha];

  return (
    <TouchableOpacity style={[doshaStyles.container, containerStyle]} onPress={onPress}>
      <Text style={[doshaStyles.score, textStyle]}>{score}%</Text>
      <Text style={[doshaStyles.title, textStyle]}>{title}</Text>
      <Text style={[doshaStyles.description, textStyle]}>{description}</Text>
    </TouchableOpacity>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const sectionStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
});

export const Section: React.FC<SectionProps> = ({ title, children, style }) => {
  return (
    <View style={[sectionStyles.section, style]}>
      <Text style={sectionStyles.title}>{title}</Text>
      {children}
    </View>
  );
};

interface ProgressBarProps {
  progress: number;
  color?: 'vata' | 'pitta' | 'kapha' | 'primary';
  height?: number;
  style?: ViewStyle;
}

const progressStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 8,
  },
  vata: {
    backgroundColor: '#C8A882',
  },
  pitta: {
    backgroundColor: '#FF9E64',
  },
  kapha: {
    backgroundColor: '#66BB6A',
  },
  primary: {
    backgroundColor: '#EE9B4D',
  },
});

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'primary',
  height = 8,
  style,
}) => {
  const colorStyle = {
    vata: progressStyles.vata,
    pitta: progressStyles.pitta,
    kapha: progressStyles.kapha,
    primary: progressStyles.primary,
  }[color];

  return (
    <View style={[progressStyles.container, { height }, style]}>
      <View
        style={[
          progressStyles.bar,
          colorStyle,
          { width: `${Math.min(Math.max(progress, 0), 100)}%` },
        ]}
      />
    </View>
  );
};

interface StatItemProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

const statStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EE9B4D',
  },
  unit: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export const StatItem: React.FC<StatItemProps> = ({ label, value, unit, color }) => {
  return (
    <View style={statStyles.container}>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={[statStyles.value, color && { color }]}>{value}</Text>
      {unit && <Text style={statStyles.unit}>{unit}</Text>}
    </View>
  );
};

interface TabBarProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#EE9B4D',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeLabel: {
    color: '#EE9B4D',
  },
});

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={tabStyles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[tabStyles.tab, activeTab === tab.id && tabStyles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text
            style={[
              tabStyles.tabLabel,
              activeTab === tab.id && tabStyles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface LoaderProps {
  size?: 'small' | 'large';
}

const loaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export const Loader: React.FC<LoaderProps> = ({ size = 'large' }) => {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size={size} color="#EE9B4D" />
    </View>
  );
};

interface EmptyStateProps {
  title: string;
  description?: string;
  actionButton?: {
    title: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionButton,
  style,
}) => {
  return (
    <View style={[emptyStyles.container, style]}>
      <Text style={emptyStyles.icon}>📭</Text>
      <Text style={emptyStyles.title}>{title}</Text>
      {description && <Text style={emptyStyles.description}>{description}</Text>}
      {actionButton && (
        <Button title={actionButton.title} onPress={actionButton.onPress} />
      )}
    </View>
  );
};
