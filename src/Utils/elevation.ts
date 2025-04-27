import { Platform } from 'react-native';
import { colors } from '../Theme/colors';

type StyleObject = {
  [key: string]: any;
};

export function elevation(elv: number, backgroundColor: string = 'white'): StyleObject {
  if (Platform.OS === 'android') {
    return {
      elevation: elv,
      backgroundColor,
    };
  }

  // iOS shadow style
  return {
    shadowColor: colors.theme.black,
    shadowOpacity: 0.0015 * elv + 0.18,
    shadowRadius: 0.5 * elv,
    shadowOffset: {
      width: 0,
      height: 0.6 * elv,
    },
    backgroundColor: 'white', // necessary for shadows to be visible
  };
}

