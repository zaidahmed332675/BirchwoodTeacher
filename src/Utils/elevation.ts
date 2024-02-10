import { Platform } from 'react-native';
import { colors } from '../theme/colors';

type StyleObject = {
  [key: string]: string | number | Record<string, string | number>;
};

export function elevation(elv: number) {
  const iosShadowElevation: StyleObject = {
    shadowColor: colors.theme.black,
    shadowOpacity: 0.0015 * elv + 0.18,
    shadowRadius: 0.5 * elv,
    shadowOffset: {
      height: 0.6 * elv,
    },
  };

  const androidShadowElevation = {
    elevation: elv,
  };

  return Platform.OS === 'ios' ? iosShadowElevation : androidShadowElevation;
}
