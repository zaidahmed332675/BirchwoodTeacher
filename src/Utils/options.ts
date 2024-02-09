import { create } from 'react-native-pixel-perfect';

export const NavigationOptions = () => {
  return { headerShown: false };
};

const designResolution = {
  width: 390,
  height: 844,
};

export const pS = create(designResolution);
