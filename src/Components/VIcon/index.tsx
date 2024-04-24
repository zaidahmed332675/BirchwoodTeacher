import React from 'react';
import { vectorIcons } from '../../Utils/vectorIcons';

interface VIconProps {
  type: string;
  name: string;
  size: number;
  color?: string;
  style?: object;
  onPress?: () => void;
}

export const VIcon = ({
  type = '',
  name,
  color,
  size,
  style,
  onPress,
}: VIconProps) => {
  const Icon = vectorIcons?.[type] ?? 'Feather';
  return (
    <Icon
      name={name}
      color={color}
      style={style}
      size={size}
      onPress={onPress}
    />
  );
};
