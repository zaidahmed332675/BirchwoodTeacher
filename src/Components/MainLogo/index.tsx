import React from 'react';
import { StyleSheet, Image } from 'react-native';
import main_logo from '../../Assets/images/logo/main_logo_transparent.png';

interface MainLogoProps {
  _style?: object;
}

export const MainLogo = ({ _style }: MainLogoProps) => {
  return (
    <Image
      source={main_logo}
      style={{ ...styles.img, ..._style }}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%"
    // marginTop: 5,
    // height: 70,
    // width: '80%',
  },
});
