import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import bg_bottom_logo from '../../Assets/images/bottom-logo.png';
import { vh } from '../../Utils/units';

export const BottomBackground = () => {
  return (
    <View style={styles.bottomView}>
      <ImageBackground
        source={bg_bottom_logo}
        style={styles.bottomImageBackground}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    overflow: 'visible',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: vh * 20,
    zIndex: -1,
  },
  bottomImageBackground: {
    flex: 1,
    resizeMode: 'contain',
  },
});
