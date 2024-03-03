import React from 'react';
import { StyleSheet, Image } from 'react-native';
import main_logo from '../../Assets/images/logo/main_logo.png';

interface MainLogoProps {
  _style?: object;
}

const MainLogo = ({ _style }: MainLogoProps) => {
  return (
    <Image
      source={main_logo}
      style={{ ...styles.img, ..._style }}
      resizeMode="contain"
    />
  );
};

export { MainLogo };

const styles = StyleSheet.create({
  img: {
    marginTop: 5,
    height: 70,
    width: '80%',
  },
});
